const pool = require('../db');

// Obtener todas las unidades de negocio
exports.getAllBusinessUnits = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM business_unit ORDER BY name');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las unidades de negocio:', error);
    res.status(500).json({ error: 'Error al obtener las unidades de negocio' });
  }
};

// Obtener una unidad de negocio por ID
exports.getBusinessUnitById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM business_unit WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Unidad de negocio no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener la unidad de negocio:', error);
    res.status(500).json({ error: 'Error al obtener la unidad de negocio' });
  }
};

// Crear una nueva unidad de negocio
exports.createBusinessUnit = async (req, res) => {
  const { name, code, region } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'El nombre de la unidad de negocio es obligatorio' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO business_unit (name, code, region) VALUES (?, ?, ?)',
      [name, code, region]
    );
    res.status(201).json({ id: result.insertId, name, code, region });
  } catch (error) {
    console.error('Error al crear la unidad de negocio:', error);
    res.status(500).json({ error: 'Error al crear la unidad de negocio' });
  }
};

// Actualizar una unidad de negocio existente
exports.updateBusinessUnit = async (req, res) => {
  const { name, code, region } = req.body;
  const businessUnitId = req.params.id;

  if (!name) {
    return res.status(400).json({ error: 'El nombre de la unidad de negocio es obligatorio' });
  }

  try {
    const [existingUnit] = await pool.query('SELECT * FROM business_unit WHERE id = ?', [businessUnitId]);
    if (existingUnit.length === 0) {
      return res.status(404).json({ error: 'Unidad de negocio no encontrada' });
    }

    await pool.query(
      'UPDATE business_unit SET name = ?, code = ?, region = ? WHERE id = ?',
      [name, code, region, businessUnitId]
    );
    res.json({ id: parseInt(businessUnitId), name, code, region });
  } catch (error) {
    console.error('Error al actualizar la unidad de negocio:', error);
    res.status(500).json({ error: 'Error al actualizar la unidad de negocio' });
  }
};

// Eliminar una unidad de negocio
exports.deleteBusinessUnit = async (req, res) => {
  const businessUnitId = req.params.id;

  try {
    const [existingUnit] = await pool.query('SELECT * FROM business_unit WHERE id = ?', [businessUnitId]);
    if (existingUnit.length === 0) {
      return res.status(404).json({ error: 'Unidad de negocio no encontrada' });
    }

    await pool.query('DELETE FROM business_unit WHERE id = ?', [businessUnitId]);
    res.json({ message: 'Unidad de negocio eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la unidad de negocio:', error);
    res.status(500).json({ error: 'Error al eliminar la unidad de negocio' });
  }
};
