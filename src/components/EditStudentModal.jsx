import React from 'react';
import { X, Edit3 } from 'lucide-react';
import StudentForm from './StudentForm';

const EditStudentModal = ({ student, onUpdate, onClose, existingStudents }) => {
  if (!student) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '850px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">
            <Edit3 size={20} color="#2563eb" />
            <span>Edit Student Information ({student.id})</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1rem 1.5rem' }}>
          <StudentForm
            isEditMode={true}
            initialData={student}
            existingStudents={existingStudents}
            onSubmit={(updatedStudent) => {
              onUpdate(updatedStudent);
              onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;
