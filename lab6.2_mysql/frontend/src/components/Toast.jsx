import React, { useEffect, useState } from 'react';

const DURATION = 3200;
const EXIT = 200;

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="m2.8 7.3 2.7 2.7 5.7-5.7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 3.4v3.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="7" cy="10.2" r="1" fill="currentColor" />
  </svg>
);

const Toast = ({ toast, onDismiss }) => {
  const [state, setState] = useState('enter');

  useEffect(() => {
    // Dos frames: el navegador debe pintar el estado inicial antes de
    // transicionar, si no la entrada se salta.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setState('visible'))
    );

    const leave = setTimeout(() => setState('leaving'), DURATION);
    const remove = setTimeout(() => onDismiss(toast.id), DURATION + EXIT);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(leave);
      clearTimeout(remove);
    };
  }, [toast.id, onDismiss]);

  return (
    <div
      className="toast"
      data-state={state}
      data-type={toast.type}
      role="status"
      aria-live="polite"
    >
      <span className="toast-icon">
        {toast.type === 'error' ? <AlertIcon /> : <CheckIcon />}
      </span>
      {toast.message}
    </div>
  );
};

export const Toaster = ({ toasts, onDismiss }) => (
  <div className="toaster">
    {toasts.map((toast) => (
      <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
    ))}
  </div>
);

export default Toaster;
