// src/app/api/maintenance/route.ts
// API para gerenciamento de registros de manutenção

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MotorcycleModel } from '@/lib/models/motorcycle';
import { MaintenanceRecordModel, MaintenanceRecord } from '@/lib/models/maintenance-record';
import { AlertModel } from '@/lib/models/alert';

// GET - Obter registros de manutenção
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Obter a motocicleta do usuário
    const motorcycles = await MotorcycleModel.getAll(user.userId);
    
    if (!motorcycles || motorcycles.length === 0) {
      return NextResponse.json([]);
    }
    
    const motorcycle = motorcycles[0];
    
    // Obter os registros de manutenção
    const records = await MaintenanceRecordModel.getAllForMotorcycle(motorcycle.id!);
    
    return NextResponse.json(records);
  } catch (error) {
    console.error('Erro ao obter registros de manutenção:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar um novo registro de manutenção
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
    
    // Validar campos obrigatórios
    if (!body.maintenance_type_id || !body.date || !body.mileage) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
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
    
    // Criar o registro de manutenção
    const maintenanceRecord: MaintenanceRecord = {
      motorcycle_id: motorcycle.id!,
      maintenance_type_id: body.maintenance_type_id,
      date: body.date,
      mileage: body.mileage,
      cost: body.cost,
      notes: body.notes,
      parts_replaced: body.parts_replaced,
      service_provider: body.service_provider
    };
    
    const id = await MaintenanceRecordModel.create(maintenanceRecord);
    
    if (!id) {
      return NextResponse.json(
        { error: 'Falha ao criar registro de manutenção' },
        { status: 400 }
      );
    }
    
    // Atualizar a quilometragem da moto se a manutenção for mais recente
    if (body.mileage > motorcycle.current_mileage) {
      await MotorcycleModel.updateMileage(motorcycle.id!, body.mileage);
    }
    
    // Marcar alertas relacionados como concluídos
    const alerts = await AlertModel.getAllForMotorcycle(motorcycle.id!);
    for (const alert of alerts) {
      if (alert.maintenance_type_id === body.maintenance_type_id && !alert.is_completed) {
        await AlertModel.markAsCompleted(alert.id!);
      }
    }
    
    // Gerar novos alertas para futuras manutenções
    await AlertModel.generateAlertsForMotorcycle(motorcycle.id!);
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Erro ao criar registro de manutenção:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
