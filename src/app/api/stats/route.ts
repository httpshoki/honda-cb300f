// src/app/api/stats/route.ts
// API para obtenção de estatísticas de manutenção

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MotorcycleModel } from '@/lib/models/motorcycle';
import { MaintenanceRecordModel } from '@/lib/models/maintenance-record';

// GET - Obter estatísticas de manutenção
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
      return NextResponse.json({
        totalCount: 0,
        totalCost: 0,
        averageCost: 0,
        lastMaintenanceDate: null
      });
    }
    
    const motorcycle = motorcycles[0];
    
    // Obter estatísticas de manutenção
    const stats = await MaintenanceRecordModel.getStats(motorcycle.id!);
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erro ao obter estatísticas de manutenção:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
