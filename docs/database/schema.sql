-- SMARTVIAL SQL schema (PostgreSQL)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE role_permissions (
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY(role_id, permission_id)
);

CREATE TABLE incidents (
  id SERIAL PRIMARY KEY,
  incident_code VARCHAR(50) UNIQUE NOT NULL,
  reported_by INT REFERENCES users(id),
  type VARCHAR(100),
  severity INT,
  occurred_at TIMESTAMP,
  description TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  address TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

CREATE TABLE evidences (
  id SERIAL PRIMARY KEY,
  incident_id INT REFERENCES incidents(id) ON DELETE CASCADE,
  type VARCHAR(50),
  file_path TEXT,
  uploaded_by INT REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT now()
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  evidence_id INT REFERENCES evidences(id) ON DELETE CASCADE,
  file_path TEXT,
  caption TEXT
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  params JSONB,
  generated_by INT REFERENCES users(id),
  generated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  message TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INT,
  action VARCHAR(255),
  detail JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE citizens (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  id_number VARCHAR(100),
  contact JSONB
);

CREATE TABLE ia_predictions (
  id SERIAL PRIMARY KEY,
  incident_id INT REFERENCES incidents(id),
  risk_score NUMERIC,
  meta JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- Indexes
CREATE INDEX idx_incidents_location ON incidents USING GIST (ST_Point(longitude, latitude));

-- Seed minimal roles
INSERT INTO roles (name, description) VALUES ('admin','Administrador del sistema'), ('supervisor','Supervisor institucional'), ('agent','Agente de tránsito'), ('citizen','Ciudadano');


-- NOTE: For spatial features, install PostGIS and adjust location types.
