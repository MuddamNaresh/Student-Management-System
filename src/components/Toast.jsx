import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toasts = [], onRemove }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const type = toast.type || 'info';
        return (
          <div key={toast.id} className={`toast-item ${type}`}>
            {type === 'success' && <CheckCircle2 size={18} color="#10b981" />}
            {type === 'error' && <AlertCircle size={18} color="#ef4444" />}
            {type === 'info' && <Info size={18} color="#0284c7" />}

            <span className="toast-text">{toast.message}</span>

            <button
              onClick={() => onRemove(toast.id)}
              className="modal-close-btn"
              style={{ width: '22px', height: '22px' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
