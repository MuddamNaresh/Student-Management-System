import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const DeleteConfirmModal = ({ student, onConfirm, onCancel }) => {
  if (!student) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" style={{ color: '#ef4444' }}>
            <AlertTriangle size={20} />
            <span>Confirm Deletion</span>
          </div>
          <button className="modal-close-btn" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="delete-dialog-content">
            <div className="delete-warn-icon">
              <Trash2 size={28} />
            </div>
            <h4 className="delete-warn-title">Delete Student Record?</h4>
            <p className="delete-warn-text">
              Are you sure you want to delete student <strong>{student.name}</strong> (ID: <code>{student.id}</code>)?
            </p>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              This record will be permanently removed from browser localStorage. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button 
            className="btn-danger" 
            onClick={() => onConfirm(student.id)}
          >
            <Trash2 size={15} />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
