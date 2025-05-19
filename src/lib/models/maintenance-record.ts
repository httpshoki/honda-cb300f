// src/lib/models/maintenance-record.ts
// Modelo para registros de manutenção

import { getDatabase } from '../db';

export interface MaintenanceRecord {
  id?: number;
  motorcycle_id: number;
  maintenance_type_id: number;
  date: string;
  mileage: number;
  cost?: number;
  notes?: string;
  parts_replaced?: string;
  service_provider?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MaintenanceRecordWithType extends MaintenanceRecord {
  type_name: string;
  type_description?: string;
  is_critical: boolean;
}

export class MaintenanceRecordModel {
  // Obter todos os registros de manutenção para uma motocicleta
  static async getAllForMotorcycle(motorcycleId: number): Promise<MaintenanceRecordWithType[]> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      return [
        {
          id: 1,
          motorcycle_id: motorcycleId,
          maintenance_type_id: 1,
          type_name: "Troca de Óleo",
          type_description: "Trocar óleo do motor 10W30 Pro Honda",
          is_critical: true,
          date: "2025-03-15",
          mileage: 3000,
          cost: 120,
          notes: "Óleo 10W30 Pro Honda",
          parts_replaced: "Óleo 10W30",
          service_provider: "Concessionária Honda",
          created_at: "2025-03-15T10:00:00Z",
          updated_at: "2025-03-15T10:00:00Z"
        },
        {
          id: 2,
          motorcycle_id: motorcycleId,
          maintenance_type_id: 2,
          type_name: "Primeira Revisão",
          type_description: "Revisão completa conforme manual do fabricante",
          is_critical: true,
          date: "2025-01-10",
          mileage: 1000,
          cost: 350,
          notes: "Primeira revisão obrigatória",
          parts_replaced: "Óleo, filtro de óleo",
          service_provider: "Concessionária Honda",
          created_at: "2025-01-10T14:30:00Z",
          updated_at: "2025-01-10T14:30:00Z"
        },
        {
          id: 3,
          motorcycle_id: motorcycleId,
          maintenance_type_id: 6,
          type_name: "Corrente de Transmissão",
          type_description: "Verificar tensão e lubrificar corrente",
          is_critical: true,
          date: "2024-12-05",
          mileage: 500,
          cost: 50,
          notes: "Ajuste e lubrificação",
          parts_replaced: null,
          service_provider: "Oficina particular",
          created_at: "2024-12-05T16:45:00Z",
          updated_at: "2024-12-05T16:45:00Z"
        }
      ];
    }
    
    return db.query<MaintenanceRecordWithType>(
      `SELECT 
        mr.*, 
        mt.name as type_name, 
        mt.description as type_description,
        mt.is_critical
      FROM 
        maintenance_records mr
      JOIN 
        maintenance_types mt ON mr.maintenance_type_id = mt.id
      WHERE 
        mr.motorcycle_id = ?
      ORDER BY 
        mr.date DESC`,
      [motorcycleId]
    );
  }
  
  // Obter um registro de manutenção pelo ID
  static async getById(id: number): Promise<MaintenanceRecordWithType | null> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      const allRecords = await this.getAllForMotorcycle(1);
      return allRecords.find(record => record.id === id) || null;
    }
    
    return db.queryOne<MaintenanceRecordWithType>(
      `SELECT 
        mr.*, 
        mt.name as type_name, 
        mt.description as type_description,
        mt.is_critical
      FROM 
        maintenance_records mr
      JOIN 
        maintenance_types mt ON mr.maintenance_type_id = mt.id
      WHERE 
        mr.id = ?`,
      [id]
    );
  }
  
  // Criar um novo registro de manutenção
  static async create(record: MaintenanceRecord): Promise<number> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando criação de registro de manutenção:', record);
      return 4; // Simulando ID retornado
    }
    
    return db.insert(
      `INSERT INTO maintenance_records (
        motorcycle_id, maintenance_type_id, date, mileage, 
        cost, notes, parts_replaced, service_provider
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.motorcycle_id,
        record.maintenance_type_id,
        record.date,
        record.mileage,
        record.cost || null,
        record.notes || null,
        record.parts_replaced || null,
        record.service_provider || null
      ]
    );
  }
  
  // Atualizar um registro de manutenção existente
  static async update(id: number, record: Partial<MaintenanceRecord>): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando atualização de registro de manutenção:', id, record);
      return true;
    }
    
    const fields: string[] = [];
    const values: any[] = [];
    
    // Construir dinamicamente os campos a serem atualizados
    if (record.maintenance_type_id !== undefined) {
      fields.push('maintenance_type_id = ?');
      values.push(record.maintenance_type_id);
    }
    
    if (record.date !== undefined) {
      fields.push('date = ?');
      values.push(record.date);
    }
    
    if (record.mileage !== undefined) {
      fields.push('mileage = ?');
      values.push(record.mileage);
    }
    
    if (record.cost !== undefined) {
      fields.push('cost = ?');
      values.push(record.cost);
    }
    
    if (record.notes !== undefined) {
      fields.push('notes = ?');
      values.push(record.notes);
    }
    
    if (record.parts_replaced !== undefined) {
      fields.push('parts_replaced = ?');
      values.push(record.parts_replaced);
    }
    
    if (record.service_provider !== undefined) {
      fields.push('service_provider = ?');
      values.push(record.service_provider);
    }
    
    // Sempre atualizar o timestamp
    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    
    // Adicionar o ID no final dos valores
    values.push(id);
    
    const result = await db.update(
      `UPDATE maintenance_records SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result > 0;
  }
  
  // Excluir um registro de manutenção
  static async delete(id: number): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando exclusão de registro de manutenção:', id);
      return true;
    }
    
    const result = await db.delete(
      'DELETE FROM maintenance_records WHERE id = ?',
      [id]
    );
    
    return result > 0;
  }
  
  // Obter estatísticas de manutenção para uma motocicleta
  static async getStats(motorcycleId: number): Promise<{
    totalCount: number;
    totalCost: number;
    averageCost: number;
    lastMaintenanceDate: string | null;
  }> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      return {
        totalCount: 3,
        totalCost: 520,
        averageCost: 173.33,
        lastMaintenanceDate: "2025-03-15"
      };
    }
    
    const stats = await db.queryOne<{
      totalCount: number;
      totalCost: number;
      averageCost: number;
      lastMaintenanceDate: string | null;
    }>(
      `SELECT 
        COUNT(*) as totalCount,
        SUM(cost) as totalCost,
        AVG(cost) as averageCost,
        MAX(date) as lastMaintenanceDate
      FROM 
        maintenance_records
      WHERE 
        motorcycle_id = ?`,
      [motorcycleId]
    );
    
    return stats || {
      totalCount: 0,
      totalCost: 0,
      averageCost: 0,
      lastMaintenanceDate: null
    };
  }
}
