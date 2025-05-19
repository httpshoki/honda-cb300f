// src/lib/db.ts
// Utilitário para interação com o banco de dados D1

import { D1Database } from '@cloudflare/workers-types';

// Interface para o contexto do Cloudflare
export interface CloudflareContext {
  DB: D1Database;
}

// Função para obter o contexto do Cloudflare
export function getCloudflareContext(): CloudflareContext | null {
  // Esta função será implementada quando o banco de dados for habilitado
  // Por enquanto, retorna null para indicar que o banco de dados não está disponível
  return null;
}

// Classe para gerenciar operações do banco de dados
export class DatabaseManager {
  private db: D1Database | null = null;

  constructor(context?: CloudflareContext | null) {
    if (context) {
      this.db = context.DB;
    }
  }

  // Verifica se o banco de dados está disponível
  isAvailable(): boolean {
    return this.db !== null;
  }

  // Executa uma consulta SQL com parâmetros
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.db) {
      console.warn('Banco de dados não disponível. Usando dados simulados.');
      return [];
    }

    try {
      const result = await this.db.prepare(sql).bind(...params).all();
      return result.results as T[];
    } catch (error) {
      console.error('Erro ao executar consulta SQL:', error);
      throw error;
    }
  }

  // Executa uma consulta SQL e retorna um único resultado
  async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    if (!this.db) {
      console.warn('Banco de dados não disponível. Usando dados simulados.');
      return null;
    }

    try {
      const result = await this.db.prepare(sql).bind(...params).first();
      return result as T | null;
    } catch (error) {
      console.error('Erro ao executar consulta SQL:', error);
      throw error;
    }
  }

  // Executa uma consulta SQL para inserção e retorna o ID inserido
  async insert(sql: string, params: any[] = []): Promise<number> {
    if (!this.db) {
      console.warn('Banco de dados não disponível. Usando dados simulados.');
      return -1;
    }

    try {
      const result = await this.db.prepare(sql).bind(...params).run();
      return result.meta.last_row_id as number;
    } catch (error) {
      console.error('Erro ao executar inserção SQL:', error);
      throw error;
    }
  }

  // Executa uma consulta SQL para atualização e retorna o número de linhas afetadas
  async update(sql: string, params: any[] = []): Promise<number> {
    if (!this.db) {
      console.warn('Banco de dados não disponível. Usando dados simulados.');
      return 0;
    }

    try {
      const result = await this.db.prepare(sql).bind(...params).run();
      return result.meta.changes as number;
    } catch (error) {
      console.error('Erro ao executar atualização SQL:', error);
      throw error;
    }
  }

  // Executa uma consulta SQL para exclusão e retorna o número de linhas afetadas
  async delete(sql: string, params: any[] = []): Promise<number> {
    if (!this.db) {
      console.warn('Banco de dados não disponível. Usando dados simulados.');
      return 0;
    }

    try {
      const result = await this.db.prepare(sql).bind(...params).run();
      return result.meta.changes as number;
    } catch (error) {
      console.error('Erro ao executar exclusão SQL:', error);
      throw error;
    }
  }
}

// Instância global do gerenciador de banco de dados
let dbManager: DatabaseManager | null = null;

// Função para obter a instância do gerenciador de banco de dados
export function getDatabase(): DatabaseManager {
  if (!dbManager) {
    const context = getCloudflareContext();
    dbManager = new DatabaseManager(context);
  }
  return dbManager;
}
