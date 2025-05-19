// src/app/api/motorcycle/mileage/route.ts
// API para atualização de quilometragem da motocicleta

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MotorcycleModel } from '@/lib/models/motorcycle';

// POST - Atualizar quilometragem da motocicleta
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
    const { mileage } = body;
    
    if (mileage === undefined || isNaN(mileage) || mileage < 0) {
      return NextResponse.json(
        { error: 'Quilometragem inválida' },
        { status: 400 }
      );
    }
    
    // Obter a motocicleta do usuário
    const motorcycles = await MotorcycleModel.getAll(user.userId);
    
    if (!motorcycles || motorcycles.length === 0) {
      return NextResponse.json(
        { error: 'Motocicleta não encontrada' },
        { status: 404 }
      );
    }
    
    const motorcycle = motorcycles[0];
    
    // Verificar se a nova quilometragem é menor que a atual
    if (mileage < motorcycle.current_mileage) {
      return NextResponse.json(
        { error: 'A nova quilometragem não pode ser menor que a atual' },
        { status: 400 }
      );
    }
    
    // Atualizar a quilometragem
    const updated = await MotorcycleModel.updateMileage(motorcycle.id!, mileage);
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Falha ao atualizar quilometragem' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      previous_mileage: motorcycle.current_mileage,
      current_mileage: mileage
    });
  } catch (error) {
    console.error('Erro ao atualizar quilometragem:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
