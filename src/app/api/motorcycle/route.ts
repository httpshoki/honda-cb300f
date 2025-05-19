// src/app/api/motorcycle/route.ts
// API para gerenciamento de motocicletas

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MotorcycleModel, Motorcycle } from '@/lib/models/motorcycle';

// GET - Obter dados da motocicleta
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Obter todas as motocicletas do usuário (normalmente será apenas uma)
    const motorcycles = await MotorcycleModel.getAll(user.userId);
    
    // Se não houver motocicleta, retornar um array vazio
    if (!motorcycles || motorcycles.length === 0) {
      return NextResponse.json([]);
    }
    
    // Retornar a primeira motocicleta (assumindo que o usuário terá apenas uma)
    return NextResponse.json(motorcycles[0]);
  } catch (error) {
    console.error('Erro ao obter dados da motocicleta:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar ou atualizar dados da motocicleta
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Verificar se já existe uma motocicleta para o usuário
    const motorcycles = await MotorcycleModel.getAll(user.userId);
    
    if (motorcycles && motorcycles.length > 0) {
      // Atualizar a motocicleta existente
      const motorcycle = motorcycles[0];
      const updated = await MotorcycleModel.update(motorcycle.id!, body);
      
      if (!updated) {
        return NextResponse.json(
          { error: 'Falha ao atualizar dados da motocicleta' },
          { status: 400 }
        );
      }
      
      return NextResponse.json({ success: true, id: motorcycle.id });
    } else {
      // Criar uma nova motocicleta
      const newMotorcycle: Motorcycle = {
        user_id: user.userId,
        model: body.model || 'Honda CB300F Twister',
        year: body.year || '2025',
        license_plate: body.license_plate,
        chassis: body.chassis,
        purchase_date: body.purchase_date,
        current_mileage: body.current_mileage || 0
      };
      
      const id = await MotorcycleModel.create(newMotorcycle);
      
      if (!id) {
        return NextResponse.json(
          { error: 'Falha ao criar dados da motocicleta' },
          { status: 400 }
        );
      }
      
      return NextResponse.json({ success: true, id });
    }
  } catch (error) {
    console.error('Erro ao processar dados da motocicleta:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
