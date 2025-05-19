// src/lib/models/user.ts
// Modelo para usuários (autenticação)

import { getDatabase } from '../db';
import * as bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  username: string;
  password_hash: string;
  created_at?: string;
  updated_at?: string;
}

export class UserModel {
  // Obter um usuário pelo nome de usuário
  static async getByUsername(username: string): Promise<User | null> {
    const db = getDatabase();
    
    if (!db.isAvailable()) {
      // Dados simulados para desenvolvimento - apenas para o usuário admin
      if (username === 'admin') {
        return {
          id: 1,
          username: 'admin',
          password_hash: '$2a$10$eCQYeWhmlmYMpQhJf9bajuN.jNAOEOLytYBQo7LGhR.SErPKWvnSe', // hash para 'admin123'
          created_at: '2025-04-23T00:00:00Z',
          updated_at: '2025-04-23T00:00:00Z'
        };
      }
      return null;
    }
    
    return db.queryOne<User>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
  }
  
  // Verificar credenciais de usuário
  static async verifyCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.getByUsername(username);
    
    if (!user) {
      return null;
    }
    
    // Em ambiente de desenvolvimento, aceitar senha direta para facilitar testes
    if (!db.isAvailable() && password === 'admin123') {
      return user;
    }
    
    // Verificar hash da senha
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    return isValid ? user : null;
  }
  
  // Atualizar senha de usuário
  static async updatePassword(userId: number, newPassword: string): Promise<boolean> {
    const db = getDatabase();
    
    // Gerar hash da nova senha
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    if (!db.isAvailable()) {
      console.log('Simulando atualização de senha para usuário:', userId);
      return true;
    }
    
    const result = await db.update(
      'UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?',
      [passwordHash, new Date().toISOString(), userId]
    );
    
    return result > 0;
  }
}
