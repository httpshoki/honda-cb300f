// src/lib/models/maintenance-type.ts
// Modelo para tipos de manutenção

import { getDatabase } from '../db';

export interface MaintenanceType {
  id?: number;
  name: string;
  description?: string;
  interval_km: number;
  interval_months?: number;
  is_critical: boolean;
  created_at?: string;
  updated_at?: string;
}

export class MaintenanceTypeModel {
  // Obter todos os tipos de manutenção
  static async getAll(): Promise<MaintenanceType[]> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      return [
        {
          id: 1,
          name: "Troca de Óleo",
          description: "Trocar óleo do motor 10W30 Pro Honda",
          interval_km: 3000,
          interval_months: 3,
          is_critical: true
        },
        {
          id: 2,
          name: "Primeira Revisão",
          description: "Revisão completa conforme manual do fabricante",
          interval_km: 1000,
          interval_months: null,
          is_critical: true
        },
        {
          id: 3,
          name: "Filtro de Óleo",
          description: "Trocar filtro de óleo",
          interval_km: 6000,
          interval_months: 6,
          is_critical: true
        },
        {
          id: 4,
          name: "Vela de Ignição (verificar)",
          description: "Verificar vela de ignição",
          interval_km: 6000,
          interval_months: 6,
          is_critical: false
        },
        {
          id: 5,
          name: "Vela de Ignição (trocar)",
          description: "Trocar vela de ignição",
          interval_km: 24000,
          interval_months: 24,
          is_critical: true
        }
      ];
    }
    
    return db.query<MaintenanceType>(
      'SELECT * FROM maintenance_types ORDER BY interval_km ASC'
    );
  }
  
  // Obter um tipo de manutenção pelo ID
  static async getById(id: number): Promise<MaintenanceType | null> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      const allTypes = await this.getAll();
      return allTypes.find(type => type.id === id) || null;
    }
    
    return db.queryOne<MaintenanceType>(
      'SELECT * FROM maintenance_types WHERE id = ?',
      [id]
    );
  }
  
  // Criar um novo tipo de manutenção
  static async create(maintenanceType: MaintenanceType): Promise<number> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando criação de tipo de manutenção:', maintenanceType);
      return 6; // Simulando ID retornado
    }
    
    return db.insert(
      `INSERT INTO maintenance_types (
        name, description, interval_km, interval_months, is_critical
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        maintenanceType.name,
        maintenanceType.description || null,
        maintenanceType.interval_km,
        maintenanceType.interval_months || null,
        maintenanceType.is_critical ? 1 : 0
      ]
    );
  }
  
  // Atualizar um tipo de manutenção existente
  static async update(id: number, maintenanceType: Partial<MaintenanceType>): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando atualização de tipo de manutenção:', id, maintenanceType);
      return true;
    }
    
    const fields: string[] = [];
    const values: any[] = [];
    
    // Construir dinamicamente os campos a serem atualizados
    if (maintenanceType.name !== undefined) {
      fields.push('name = ?');
      values.push(maintenanceType.name);
    }
    
    if (maintenanceType.description !== undefined) {
      fields.push('description = ?');
      values.push(maintenanceType.description);
    }
    
    if (maintenanceType.interval_km !== undefined) {
      fields.push('interval_km = ?');
      values.push(maintenanceType.interval_km);
    }
    
    if (maintenanceType.interval_months !== undefined) {
      fields.push('interval_months = ?');
      values.push(maintenanceType.interval_months);
    }
    
    if (maintenanceType.is_critical !== undefined) {
      fields.push('is_critical = ?');
      values.push(maintenanceType.is_critical ? 1 : 0);
    }
    
    // Sempre atualizar o timestamp
    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    
    // Adicionar o ID no final dos valores
    values.push(id);
    
    const result = await db.update(
      `UPDATE maintenance_types SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result > 0;
  }
  
  // Excluir um tipo de manutenção
  static async delete(id: number): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando exclusão de tipo de manutenção:', id);
      return true;
    }
    
    const result = await db.delete(
      'DELETE FROM maintenance_types WHERE id = ?',
      [id]
    );
    
    return result > 0;
  }
}
