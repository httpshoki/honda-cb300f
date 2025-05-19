-- Inicialização do banco de dados para o sistema de gerenciamento de manutenção da Honda CB300F Twister
-- Criação das tabelas principais conforme definido na arquitetura

-- Tabela de usuários (apenas administrador)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de motocicletas
CREATE TABLE IF NOT EXISTS motorcycles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  license_plate TEXT,
  chassis TEXT,
  purchase_date DATE,
  current_mileage INTEGER DEFAULT 0,
  last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de tipos de manutenção
CREATE TABLE IF NOT EXISTS maintenance_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  interval_km INTEGER,
  interval_months INTEGER,
  is_critical BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de registros de manutenção
CREATE TABLE IF NOT EXISTS maintenance_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  motorcycle_id INTEGER NOT NULL,
  maintenance_type_id INTEGER NOT NULL,
  date DATE NOT NULL,
  mileage INTEGER NOT NULL,
  cost DECIMAL(10,2),
  notes TEXT,
  parts_replaced TEXT,
  service_provider TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (motorcycle_id) REFERENCES motorcycles(id),
  FOREIGN KEY (maintenance_type_id) REFERENCES maintenance_types(id)
);

-- Tabela de alertas de manutenção
CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  motorcycle_id INTEGER NOT NULL,
  maintenance_type_id INTEGER NOT NULL,
  due_date DATE,
  due_mileage INTEGER,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (motorcycle_id) REFERENCES motorcycles(id),
  FOREIGN KEY (maintenance_type_id) REFERENCES maintenance_types(id)
);

-- Tabela de documentos e lembretes
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  motorcycle_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  due_date DATE,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (motorcycle_id) REFERENCES motorcycles(id)
);

-- Inserir tipos de manutenção padrão baseados no manual da Honda CB300F Twister
INSERT INTO maintenance_types (name, description, interval_km, interval_months, is_critical) VALUES
('Troca de Óleo', 'Trocar óleo do motor 10W30 Pro Honda', 3000, 3, TRUE),
('Primeira Revisão', 'Revisão completa conforme manual do fabricante', 1000, NULL, TRUE),
('Filtro de Óleo', 'Trocar filtro de óleo', 6000, 6, TRUE),
('Vela de Ignição (verificar)', 'Verificar vela de ignição', 6000, 6, FALSE),
('Vela de Ignição (trocar)', 'Trocar vela de ignição', 24000, 24, TRUE),
('Corrente de Transmissão', 'Verificar tensão e lubrificar corrente', 1000, 1, TRUE),
('Filtro de Ar', 'Trocar filtro de ar', 12000, 12, TRUE),
('Filtro de Combustível', 'Trocar filtro de combustível', 12000, 12, TRUE),
('Linha de Combustível', 'Verificar linha de combustível', 12000, 12, FALSE),
('Acelerador', 'Verificar funcionamento do acelerador', 12000, 12, FALSE),
('Respiro do Motor', 'Limpar respiro do motor', 6000, 6, TRUE);

-- Inserir usuário administrador padrão (senha temporária que deve ser alterada no primeiro acesso)
-- Senha: admin123 (será substituída por hash seguro na implementação real)
INSERT INTO users (username, password_hash) VALUES
('admin', 'temporaryPasswordHash');
