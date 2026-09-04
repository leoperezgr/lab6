-- Lab 6.2 — MySQL
CREATE DATABASE IF NOT EXISTS femsa_audit;
USE femsa_audit;

CREATE TABLE business_unit (
  id INT AUTO_INCREMENT PRIMARY KEY,
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
