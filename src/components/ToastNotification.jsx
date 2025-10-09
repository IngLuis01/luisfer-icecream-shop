// src/components/Toasts.jsx
import React from 'react';

export default function Toasts({ message, onClose }) {
  if (!message) return null;
  return (
    <div aria-live="polite" aria-atomic="true" className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast show ${message.type==='success' ? 'bg-success text-white' : 'bg-danger text-white'}`} role="alert">
        <div className="d-flex">
          <div className="toast-body">{message.text}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
}

