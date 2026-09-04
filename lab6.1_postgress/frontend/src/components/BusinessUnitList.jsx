import React, { useCallback, useState, useEffect } from 'react';
import { getBusinessUnits, deleteBusinessUnit } from '../services/api';
import BusinessUnitItem from './BusinessUnitItem';
import BusinessUnitForm from './BusinessUnitForm';
import Toaster from './Toast';

const EXIT_MS = 200;

const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11" r=".85" fill="currentColor" />
  </svg>
);

const Skeleton = ({ delay }) => (
  <div className="skeleton card" style={{ animationDelay: `${delay}ms` }} aria-hidden="true">
    <div className="skeleton-block skeleton-avatar" />
    <div className="skeleton-lines">
      <div className="skeleton-block" style={{ height: 11, width: '38%' }} />
      <div className="skeleton-block" style={{ height: 9, width: '58%' }} />
    </div>
  </div>
);

const BusinessUnitList = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [leavingId, setLeavingId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = 'success') => {
    setToasts((current) => [...current, { id: Date.now() + Math.random(), message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const fetchUnits = async () => {
    setLoading(true);
    try {
      const data = await getBusinessUnits();
      setUnits(data);
      setError(null);
    } catch {
      setError('No pudimos cargar las unidades de negocio. Revisa que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleDelete = async (unit) => {
    // Anima la salida antes de quitar la fila del DOM.
    setLeavingId(unit.id);
    try {
      await deleteBusinessUnit(unit.id);
      setTimeout(() => {
        setUnits((current) => current.filter((item) => item.id !== unit.id));
        setLeavingId(null);
        pushToast(`“${unit.name}” se eliminó`);
      }, EXIT_MS);
    } catch {
      setLeavingId(null);
      pushToast('No se pudo eliminar la unidad de negocio', 'error');
    }
  };

  const handleEdit = (id) => setEditingId(id);
  const handleCancelEdit = () => setEditingId(null);

  const handleFormSubmit = (mode, name) => {
    fetchUnits();
    setEditingId(null);
    pushToast(mode === 'update' ? `“${name}” se actualizó` : `“${name}” se agregó`);
  };

  return (
    <div className="unit-list">
      {!editingId && (
        <section className="panel">
          <div className="section-head">
            <h2>Agregar nueva unidad de negocio</h2>
            <span className="rule" aria-hidden="true" />
          </div>
          <BusinessUnitForm onSubmitSuccess={handleFormSubmit} />
        </section>
      )}

      <section>
        <div className="section-head">
          <h2>Unidades de negocio registradas</h2>
          {!loading && <span className="count">{units.length}</span>}
          <span className="rule" aria-hidden="true" />
        </div>

        {error && (
          <div className="error" role="alert">
            <AlertIcon />
            {error}
          </div>
        )}

        <div className="units">
          {loading ? (
            [0, 1, 2].map((index) => <Skeleton key={index} delay={index * 60} />)
          ) : units.length === 0 && !error ? (
            <div className="empty card">
              <div className="empty-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect
                    x="2.5"
                    y="6.5"
                    width="15"
                    height="11"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M7 6.5V4.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v1.7M2.5 11h15"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Aún no hay unidades de negocio</h3>
              <p>Agrega la primera con el formulario de arriba.</p>
            </div>
          ) : (
            units.map((unit, index) => (
              <div
                key={unit.id}
                className={`unit-row${leavingId === unit.id ? ' is-leaving' : ''}`}
                style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
              >
                {editingId === unit.id ? (
                  <div className="edit-panel">
                    <div className="edit-panel-head">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M11.2 2.8a1.7 1.7 0 0 1 2.4 2.4L5.9 12.9l-3.2.8.8-3.2 7.7-7.7Z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Editando “{unit.name}”
                    </div>
                    <BusinessUnitForm
                      unit={unit}
                      onSubmitSuccess={handleFormSubmit}
                      onCancel={handleCancelEdit}
                    />
                  </div>
                ) : (
                  <BusinessUnitItem
                    unit={unit}
                    onDelete={() => handleDelete(unit)}
                    onEdit={() => handleEdit(unit.id)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <Toaster toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default BusinessUnitList;
