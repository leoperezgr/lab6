import React, { useState, useEffect } from 'react';
import { createBusinessUnit, updateBusinessUnit } from '../services/api.js';

const BusinessUnitForm = ({ unit, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    region: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (unit) {
      setFormData({
        name: unit.name || '',
        code: unit.code || '',
        region: unit.region || ''
      });
    }
  }, [unit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('El nombre de la unidad de negocio es obligatorio');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (unit) {
        await updateBusinessUnit(unit.id, formData);
      } else {
        await createBusinessUnit(formData);
      }

      const savedName = formData.name.trim();
      setFormData({ name: '', code: '', region: '' });
      if (onSubmitSuccess) onSubmitSuccess(unit ? 'update' : 'create', savedName);
    } catch (err) {
      setError('Error al guardar la unidad de negocio');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="unit-form card">
      {error && (
        <div className="error" role="alert">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11" r=".85" fill="currentColor" />
          </svg>
          {error}
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nombre de la unidad</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="p. ej. Proximidad Américas"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
            disabled={submitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="code">
            Código <span className="optional">opcional</span>
          </label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="p. ej. OXXO"
            autoComplete="off"
            value={formData.code}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="region">
            Región <span className="optional">opcional</span>
          </label>
          <input
            type="text"
            id="region"
            name="region"
            placeholder="p. ej. América Latina"
            autoComplete="off"
            value={formData.region}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting && <span className="spinner" aria-hidden="true" />}
          {submitting ? 'Guardando' : unit ? 'Guardar cambios' : 'Agregar unidad'}
        </button>

        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancelar
          </button>
        )}

        {!unit && <span className="form-hint">El nombre es obligatorio</span>}
      </div>
    </form>
  );
};

export default BusinessUnitForm;
