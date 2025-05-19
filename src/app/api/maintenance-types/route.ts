// src/app/api/maintenance-types/route.ts
// API para obtenção dos tipos de manutenção

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MaintenanceTypeModel } from '@/lib/models/maintenance-type';

// GET - Obter todos os tipos de manutenção
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Obter todos os tipos de manutenção
    const maintenanceTypes = await MaintenanceTypeModel.getAll();
    
    return NextResponse.json(maintenanceTypes);
  } catch (error) {
    console.error('Erro ao obter tipos de manutenção:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
