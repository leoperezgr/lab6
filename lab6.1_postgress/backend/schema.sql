-- Lab 6.1 — PostgreSQL
-- Ejecutar desde psql:  CREATE DATABASE femsa_audit;  luego  \c femsa_audit
CREATE DATABASE femsa_audit;
\c femsa_audit

CREATE TABLE business_unit (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50),
  region VARCHAR(50)
);

INSERT INTO business_unit (name, code, region) VALUES
('Proximidad Américas', 'OXXO', 'América Latina'),
('Valora', 'VLR', 'Europa'),
('Coca-Cola FEMSA', 'KOF', 'América Latina'),
('FEMSA Salud', 'SAL', 'América Latina'),
('Spin', 'SPN', 'México');

SELECT * FROM business_unit;
