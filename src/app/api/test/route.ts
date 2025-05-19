// src/app/api/test/route.ts
// API para testes de integração e validação do sistema

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { MotorcycleModel } from '@/lib/models/motorcycle';
import { MaintenanceRecordModel } from '@/lib/models/maintenance-record';
import { AlertModel } from '@/lib/models/alert';
import { MaintenanceTypeModel } from '@/lib/models/maintenance-type';

// GET - Executar testes de integração
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    const testResults = {
      auth: { status: 'success', message: 'Autenticação funcionando corretamente' },
      motorcycle: { status: 'pending', message: '' },
      maintenanceTypes: { status: 'pending', message: '' },
      maintenanceRecords: { status: 'pending', message: '' },
      alerts: { status: 'pending', message: '' },
      stats: { status: 'pending', message: '' }
    };
    
    // Testar acesso à motocicleta
    try {
      const motorcycles = await MotorcycleModel.getAll(user.userId);
      if (motorcycles && motorcycles.length > 0) {
        testResults.motorcycle = { 
          status: 'success', 
          message: 'Acesso aos dados da motocicleta funcionando corretamente' 
        };
      } else {
        testResults.motorcycle = { 
          status: 'warning', 
          message: 'Nenhuma motocicleta encontrada para o usuário' 
        };
      }
    } catch (error) {
      testResults.motorcycle = { 
        status: 'error', 
        message: 'Erro ao acessar dados da motocicleta' 
      };
    }
    
    // Testar acesso aos tipos de manutenção
    try {
      const types = await MaintenanceTypeModel.getAll();
      if (types && types.length > 0) {
        testResults.maintenanceTypes = { 
          status: 'success', 
          message: `${types.length} tipos de manutenção carregados com sucesso` 
        };
      } else {
        testResults.maintenanceTypes = { 
          status: 'warning', 
          message: 'Nenhum tipo de manutenção encontrado' 
        };
      }
    } catch (error) {
      testResults.maintenanceTypes = { 
        status: 'error', 
        message: 'Erro ao acessar tipos de manutenção' 
      };
    }
    
    // Testar acesso aos registros de manutenção
    try {
      const motorcycles = await MotorcycleModel.getAll(user.userId);
      if (motorcycles && motorcycles.length > 0) {
        const records = await MaintenanceRecordModel.getAllForMotorcycle(motorcycles[0].id!);
        testResults.maintenanceRecords = { 
          status: 'success', 
          message: `${records.length} registros de manutenção carregados com sucesso` 
        };
      } else {
        testResults.maintenanceRecords = { 
          status: 'warning', 
          message: 'Não foi possível testar registros de manutenção (motocicleta não encontrada)' 
        };
      }
    } catch (error) {
      testResults.maintenanceRecords = { 
        status: 'error', 
        message: 'Erro ao acessar registros de manutenção' 
      };
    }
    
    // Testar acesso aos alertas
    try {
      const motorcycles = await MotorcycleModel.getAll(user.userId);
      if (motorcycles && motorcycles.length > 0) {
        const alerts = await AlertModel.getAllForMotorcycle(motorcycles[0].id!);
        testResults.alerts = { 
          status: 'success', 
          message: `${alerts.length} alertas carregados com sucesso` 
        };
      } else {
        testResults.alerts = { 
          status: 'warning', 
          message: 'Não foi possível testar alertas (motocicleta não encontrada)' 
        };
      }
    } catch (error) {
      testResults.alerts = { 
        status: 'error', 
        message: 'Erro ao acessar alertas' 
      };
    }
    
    // Testar acesso às estatísticas
    try {
      const motorcycles = await MotorcycleModel.getAll(user.userId);
      if (motorcycles && motorcycles.length > 0) {
        const stats = await MaintenanceRecordModel.getStats(motorcycles[0].id!);
        testResults.stats = { 
          status: 'success', 
          message: 'Estatísticas carregadas com sucesso' 
        };
      } else {
        testResults.stats = { 
          status: 'warning', 
          message: 'Não foi possível testar estatísticas (motocicleta não encontrada)' 
        };
      }
    } catch (error) {
      testResults.stats = { 
        status: 'error', 
        message: 'Erro ao acessar estatísticas' 
      };
    }
    
    return NextResponse.json({
      success: true,
      message: 'Testes de integração executados com sucesso',
      results: testResults
    });
  } catch (error) {
    console.error('Erro ao executar testes de integração:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
