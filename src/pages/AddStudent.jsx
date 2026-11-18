import React from 'react';
import StudentForm from '../components/StudentForm';
import { Sparkles, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';

const AddStudent = ({ onAddStudent, existingStudents, onNavigate }) => {
  return (
    <div className="page-container">
      {/* Help Banner */}
      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#dbeafe',
          color: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Info size={19} />
        </div>
        <div style={{ fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.5 }}>
          <strong style={{ display: 'block', marginBottom: '0.2rem', color: '#1e40af' }}>
            Student Enrollment Guidelines
          </strong>
          Please ensure all required information is provided accurately. Student IDs must be strictly unique. All changes are automatically persisted to the browser's <code>localStorage</code> database.
        </div>
      </div>

      {/* Main Student Form */}
      <StudentForm
        onSubmit={(newStudent) => {
          onAddStudent(newStudent);
          onNavigate('records');
        }}
        existingStudents={existingStudents}
        isEditMode={false}
      />
    </div>
  );
};

export default AddStudent;
