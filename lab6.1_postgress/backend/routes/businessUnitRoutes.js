const express = require('express');
const businessUnitController = require('../controllers/businessUnitController');

const router = express.Router();

// Rutas para las unidades de negocio
router.get('/', businessUnitController.getAllBusinessUnits);
router.get('/:id', businessUnitController.getBusinessUnitById);
router.post('/', businessUnitController.createBusinessUnit);
router.put('/:id', businessUnitController.updateBusinessUnit);
router.delete('/:id', businessUnitController.deleteBusinessUnit);

module.exports = router;
