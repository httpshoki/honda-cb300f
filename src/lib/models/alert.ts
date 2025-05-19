// src/lib/models/alert.ts
// Modelo para alertas de manutenção

import { getDatabase } from '../db';

export interface Alert {
  id?: number;
  motorcycle_id: number;
  maintenance_type_id: number;
  due_date?: string;
  due_mileage: number;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AlertWithType extends Alert {
  type_name: string;
  type_description?: string;
  is_critical: boolean;
  current_mileage: number;
}

export class AlertModel {
  // Obter todos os alertas para uma motocicleta
  static async getAllForMotorcycle(motorcycleId: number): Promise<AlertWithType[]> {
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
          due_date: "2025-06-15",
          due_mileage: 3000,
          is_completed: false,
          current_mileage: 0,
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
          due_date: null,
          due_mileage: 1000,
          is_completed: false,
          current_mileage: 0,
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
          due_date: null,
          due_mileage: 500,
          is_completed: false,
          current_mileage: 0,
          created_at: "2024-12-05T16:45:00Z",
          updated_at: "2024-12-05T16:45:00Z"
        }
      ];
    }
    
    return db.query<AlertWithType>(
      `SELECT 
        a.*, 
        mt.name as type_name, 
        mt.description as type_description,
        mt.is_critical,
        m.current_mileage
      FROM 
        alerts a
      JOIN 
        maintenance_types mt ON a.maintenance_type_id = mt.id
      JOIN
        motorcycles m ON a.motorcycle_id = m.id
      WHERE 
        a.motorcycle_id = ?
      ORDER BY 
        a.due_mileage ASC`,
      [motorcycleId]
    );
  }
  
  // Obter um alerta pelo ID
  static async getById(id: number): Promise<AlertWithType | null> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      const allAlerts = await this.getAllForMotorcycle(1);
      return allAlerts.find(alert => alert.id === id) || null;
    }
    
    return db.queryOne<AlertWithType>(
      `SELECT 
        a.*, 
        mt.name as type_name, 
        mt.description as type_description,
        mt.is_critical,
        m.current_mileage
      FROM 
        alerts a
      JOIN 
        maintenance_types mt ON a.maintenance_type_id = mt.id
      JOIN
        motorcycles m ON a.motorcycle_id = m.id
      WHERE 
        a.id = ?`,
      [id]
    );
  }
  
  // Criar um novo alerta
  static async create(alert: Alert): Promise<number> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando criação de alerta:', alert);
      return 4; // Simulando ID retornado
    }
    
    return db.insert(
      `INSERT INTO alerts (
        motorcycle_id, maintenance_type_id, due_date, due_mileage, is_completed
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        alert.motorcycle_id,
        alert.maintenance_type_id,
        alert.due_date || null,
        alert.due_mileage,
        alert.is_completed ? 1 : 0
      ]
    );
  }
  
  // Atualizar um alerta existente
  static async update(id: number, alert: Partial<Alert>): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando atualização de alerta:', id, alert);
      return true;
    }
    
    const fields: string[] = [];
    const values: any[] = [];
    
    // Construir dinamicamente os campos a serem atualizados
    if (alert.maintenance_type_id !== undefined) {
      fields.push('maintenance_type_id = ?');
      values.push(alert.maintenance_type_id);
    }
    
    if (alert.due_date !== undefined) {
      fields.push('due_date = ?');
      values.push(alert.due_date);
    }
    
    if (alert.due_mileage !== undefined) {
      fields.push('due_mileage = ?');
      values.push(alert.due_mileage);
    }
    
    if (alert.is_completed !== undefined) {
      fields.push('is_completed = ?');
      values.push(alert.is_completed ? 1 : 0);
    }
    
    // Sempre atualizar o timestamp
    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    
    // Adicionar o ID no final dos valores
    values.push(id);
    
    const result = await db.update(
      `UPDATE alerts SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result > 0;
  }
  
  // Marcar um alerta como concluído
  static async markAsCompleted(id: number): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando marcação de alerta como concluído:', id);
      return true;
    }
    
    const result = await db.update(
      'UPDATE alerts SET is_completed = 1, updated_at = ? WHERE id = ?',
      [new Date().toISOString(), id]
    );
    
    return result > 0;
  }
  
  // Excluir um alerta
  static async delete(id: number): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando exclusão de alerta:', id);
      return true;
    }
    
    const result = await db.delete(
      'DELETE FROM alerts WHERE id = ?',
      [id]
    );
    
    return result > 0;
  }
  
  // Gerar alertas para uma motocicleta com base nos tipos de manutenção
  static async generateAlertsForMotorcycle(motorcycleId: number): Promise<number> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando geração de alertas para motocicleta:', motorcycleId);
      return 3; // Simulando número de alertas gerados
    }
    
    // Obter a motocicleta
    const motorcycle = await db.queryOne(
      'SELECT * FROM motorcycles WHERE id = ?',
      [motorcycleId]
    );
    
    if (!motorcycle) {
      return 0;
    }
    
    // Obter todos os tipos de manutenção
    const maintenanceTypes = await db.query(
      'SELECT * FROM maintenance_types'
    );
    
    // Obter os registros de manutenção existentes
    const maintenanceRecords = await db.query(
      'SELECT * FROM maintenance_records WHERE motorcycle_id = ? ORDER BY date DESC',
      [motorcycleId]
    );
    
    // Obter alertas existentes
    const existingAlerts = await db.query(
      'SELECT * FROM alerts WHERE motorcycle_id = ? AND is_completed = 0',
      [motorcycleId]
    );
    
    let alertsCreated = 0;
    
    // Para cada tipo de manutenção, verificar se é necessário criar um alerta
    for (const type of maintenanceTypes) {
      // Verificar se já existe um alerta não concluído para este tipo
      const hasExistingAlert = existingAlerts.some(
        alert => alert.maintenance_type_id === type.id
      );
      
      if (hasExistingAlert) {
        continue;
      }
      
      // Encontrar o último registro de manutenção deste tipo
      const lastRecord = maintenanceRecords.find(
        record => record.maintenance_type_id === type.id
      );
      
      // Calcular a próxima quilometragem para manutenção
      let nextMileage = type.interval_km;
      if (lastRecord) {
        nextMileage = lastRecord.mileage + type.interval_km;
      }
      
      // Calcular a próxima data para manutenção (se aplicável)
      let nextDate = null;
      if (type.interval_months && lastRecord) {
        const lastDate = new Date(lastRecord.date);
        nextDate = new Date(lastDate);
        nextDate.setMonth(nextDate.getMonth() + type.interval_months);
        nextDate = nextDate.toISOString().split('T')[0];
      }
      
      // Criar o alerta
      await db.insert(
        `INSERT INTO alerts (
          motorcycle_id, maintenance_type_id, due_date, due_mileage, is_completed
        ) VALUES (?, ?, ?, ?, 0)`,
        [
          motorcycleId,
          type.id,
          nextDate,
          nextMileage
        ]
      );
      
      alertsCreated++;
    }
    
    return alertsCreated;
  }
}
