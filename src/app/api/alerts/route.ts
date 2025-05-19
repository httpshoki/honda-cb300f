// src/app/api/alerts/route.ts
// API para gerenciamento de alertas de manutenção

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MotorcycleModel } from '@/lib/models/motorcycle';
import { AlertModel } from '@/lib/models/alert';

// GET - Obter alertas de manutenção
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
    
    // Obter os alertas de manutenção
    const alerts = await AlertModel.getAllForMotorcycle(motorcycle.id!);
    
    // Filtrar apenas alertas não concluídos
    const pendingAlerts = alerts.filter(alert => !alert.is_completed);
    
    return NextResponse.json(pendingAlerts);
  } catch (error) {
    console.error('Erro ao obter alertas de manutenção:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Marcar alerta como concluído
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
    const { alertId } = body;
    
    if (!alertId) {
      return NextResponse.json(
        { error: 'ID do alerta não fornecido' },
        { status: 400 }
      );
    }
    
    // Obter o alerta
    const alert = await AlertModel.getById(alertId);
    
    if (!alert) {
      return NextResponse.json(
        { error: 'Alerta não encontrado' },
        { status: 404 }
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
    
    // Verificar se o alerta pertence à motocicleta do usuário
    if (alert.motorcycle_id !== motorcycle.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Marcar o alerta como concluído
    const updated = await AlertModel.markAsCompleted(alertId);
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Falha ao marcar alerta como concluído' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao marcar alerta como concluído:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Gerar alertas para a motocicleta
export async function PUT(request: NextRequest) {
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
      return NextResponse.json(
        { error: 'Motocicleta não encontrada' },
        { status: 404 }
      );
    }
    
    const motorcycle = motorcycles[0];
    
    // Gerar alertas para a motocicleta
    const alertsCreated = await AlertModel.generateAlertsForMotorcycle(motorcycle.id!);
    
    return NextResponse.json({ 
      success: true, 
      alertsCreated 
    });
  } catch (error) {
    console.error('Erro ao gerar alertas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
