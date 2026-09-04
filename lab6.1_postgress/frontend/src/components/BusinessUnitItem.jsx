import React, { useEffect, useState } from 'react';

const BusinessUnitItem = ({ unit, onDelete, onEdit }) => {
  const [confirming, setConfirming] = useState(false);

  // Escape cancela la confirmación: acción de teclado, sin animación.
  useEffect(() => {
    if (!confirming) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setConfirming(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [confirming]);

  return (
    <div className="unit-item card">
      <div className="avatar" aria-hidden="true">
        {unit.name?.trim().charAt(0).toUpperCase() || '?'}
      </div>

      <div className="unit-info">
        <h3>{unit.name}</h3>
        <div className="meta">
          {unit.code ? (
            <span>{unit.code}</span>
          ) : (
            <span className="empty-value">Sin código</span>
          )}
          <span className="sep" aria-hidden="true" />
          {unit.region ? (
            <span>{unit.region}</span>
          ) : (
            <span className="empty-value">Sin región</span>
          )}
        </div>
      </div>

      <div className="unit-actions">
        {confirming ? (
          <div className="confirm">
            <span>¿Eliminar?</span>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setConfirming(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger-solid"
              autoFocus
              onClick={() => {
                setConfirming(false);
                onDelete();
              }}
            >
              Sí, eliminar
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onEdit}
              aria-label={`Editar ${unit.name}`}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setConfirming(true)}
              aria-label={`Eliminar ${unit.name}`}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessUnitItem;
