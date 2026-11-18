import React from 'react';
import { X, GraduationCap, Mail, Phone, Calendar, MapPin, Building2, BookOpen, Clock, ShieldCheck } from 'lucide-react';

const StudentDetailModal = ({ student, onClose, onEdit }) => {
  if (!student) return null;

  const isActive = student.status === 'Active';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <GraduationCap size={22} color="#2563eb" />
            <span>Student Profile Details</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Header Profile Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            paddingBottom: '1.25rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              boxShadow: '0 4px 10px rgba(37,99,235,0.25)'
            }}>
              {student.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                {student.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.25rem' }}>
                <span className="badge-id">{student.id}</span>
                <span className={`status-pill ${isActive ? 'active' : 'inactive'}`}>
                  <span className="status-dot-sm" />
                  <span>{student.status}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Department</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={15} color="#2563eb" />
                <span className="detail-value">{student.department}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Enrolled Course</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={15} color="#2563eb" />
                <span className="detail-value">{student.course}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Year of Study</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} color="#64748b" />
                <span className="detail-value">{student.year}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Gender</span>
              <span className="detail-value">{student.gender}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} color="#64748b" />
                <span className="detail-value">{student.email}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Phone Number</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} color="#64748b" />
                <span className="detail-value">{student.phone}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Date of Birth</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} color="#64748b" />
                <span className="detail-value">{student.dob}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">System Storage</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={15} color="#10b981" />
                <span className="detail-value" style={{ fontSize: '0.85rem', color: '#10b981' }}>Verified In localStorage</span>
              </div>
            </div>

            <div className="detail-item full-width">
              <span className="detail-label">Residential Address</span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '3px' }}>
                <MapPin size={16} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span className="detail-value" style={{ fontWeight: 500, fontSize: '0.9rem' }}>{student.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn-primary" 
            onClick={() => {
              onClose();
              if (onEdit) onEdit(student);
            }}
          >
            Edit Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
