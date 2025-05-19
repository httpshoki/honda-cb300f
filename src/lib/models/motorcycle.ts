// src/lib/models/motorcycle.ts
// Modelo para a motocicleta

import { getDatabase } from '../db';

export interface Motorcycle {
  id?: number;
  user_id: number;
  model: string;
  year: string;
  license_plate?: string;
  chassis?: string;
  purchase_date?: string;
  current_mileage: number;
  last_update?: string;
  created_at?: string;
  updated_at?: string;
}

export class MotorcycleModel {
  // Obter todas as motocicletas do usuário
  static async getAll(userId: number): Promise<Motorcycle[]> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      return [
        {
          id: 1,
          user_id: userId,
          model: "Honda CB300F Twister",
          year: "2025",
          license_plate: "ABC-1234",
          chassis: "9C2NC4310FR123456",
          purchase_date: "2025-01-01",
          current_mileage: 0,
          last_update: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    
    return db.query<Motorcycle>(
      'SELECT * FROM motorcycles WHERE user_id = ? ORDER BY id DESC',
      [userId]
    );
  }
  
  // Obter uma motocicleta pelo ID
  static async getById(id: number): Promise<Motorcycle | null> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento
      return {
        id: 1,
        user_id: 1,
        model: "Honda CB300F Twister",
        year: "2025",
        license_plate: "ABC-1234",
        chassis: "9C2NC4310FR123456",
        purchase_date: "2025-01-01",
        current_mileage: 0,
        last_update: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    return db.queryOne<Motorcycle>(
      'SELECT * FROM motorcycles WHERE id = ?',
      [id]
    );
  }
  
  // Criar uma nova motocicleta
  static async create(motorcycle: Motorcycle): Promise<number> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando criação de motocicleta:', motorcycle);
      return 1;
    }
    
    return db.insert(
      `INSERT INTO motorcycles (
        user_id, model, year, license_plate, chassis, 
        purchase_date, current_mileage, last_update
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        motorcycle.user_id,
        motorcycle.model,
        motorcycle.year,
        motorcycle.license_plate || null,
        motorcycle.chassis || null,
        motorcycle.purchase_date || null,
        motorcycle.current_mileage,
        new Date().toISOString()
      ]
    );
  }
  
  // Atualizar uma motocicleta existente
  static async update(id: number, motorcycle: Partial<Motorcycle>): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando atualização de motocicleta:', id, motorcycle);
      return true;
    }
    
    const fields: string[] = [];
    const values: any[] = [];
    
    // Construir dinamicamente os campos a serem atualizados
    if (motorcycle.model !== undefined) {
      fields.push('model = ?');
      values.push(motorcycle.model);
    }
    
    if (motorcycle.year !== undefined) {
      fields.push('year = ?');
      values.push(motorcycle.year);
    }
    
    if (motorcycle.license_plate !== undefined) {
      fields.push('license_plate = ?');
      values.push(motorcycle.license_plate);
    }
    
    if (motorcycle.chassis !== undefined) {
      fields.push('chassis = ?');
      values.push(motorcycle.chassis);
    }
    
    if (motorcycle.purchase_date !== undefined) {
      fields.push('purchase_date = ?');
      values.push(motorcycle.purchase_date);
    }
    
    if (motorcycle.current_mileage !== undefined) {
      fields.push('current_mileage = ?');
      values.push(motorcycle.current_mileage);
    }
    
    // Sempre atualizar o timestamp
    fields.push('updated_at = ?');
    values.push(new Date().toISOString());
    fields.push('last_update = ?');
    values.push(new Date().toISOString());
    
    // Adicionar o ID no final dos valores
    values.push(id);
    
    const result = await db.update(
      `UPDATE motorcycles SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return result > 0;
  }
  
  // Atualizar a quilometragem da motocicleta
  static async updateMileage(id: number, mileage: number): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando atualização de quilometragem:', id, mileage);
      return true;
    }
    
    const result = await db.update(
      'UPDATE motorcycles SET current_mileage = ?, last_update = ?, updated_at = ? WHERE id = ?',
      [mileage, new Date().toISOString(), new Date().toISOString(), id]
    );
    
    return result > 0;
  }
  
  // Excluir uma motocicleta
  static async delete(id: number): Promise<boolean> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      console.log('Simulando exclusão de motocicleta:', id);
      return true;
    }
    
    const result = await db.delete(
      'DELETE FROM motorcycles WHERE id = ?',
      [id]
    );
    
    return result > 0;
  }
}
