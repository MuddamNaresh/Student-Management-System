import React from 'react';
import { Eye, Edit3, Trash2, SearchX, Phone, Mail } from 'lucide-react';

const StudentTable = ({ students, onView, onEdit, onDelete, onClearFilters }) => {
  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (!students || students.length === 0) {
    return (
      <div className="table-card">
        <div className="table-empty-state">
          <div className="empty-icon-circle">
            <SearchX size={32} />
          </div>
          <h3 className="empty-title">No Students Found</h3>
          <p className="empty-desc">
            No student records match your current search query or applied filters.
          </p>
          {onClearFilters && (
            <button className="btn-secondary" onClick={onClearFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="student-data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Contact Details</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Course</th>
              <th>Year</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const initials = getInitials(student.name);
              const isActive = student.status === 'Active';

              return (
                <tr key={student.id}>
                  {/* Student ID */}
                  <td>
                    <span className="badge-id">{student.id}</span>
                  </td>

                  {/* Student Name + Avatar */}
                  <td>
                    <div className="student-profile-cell">
                      <div className="table-avatar">{initials}</div>
                      <div className="student-cell-info">
                        <span className="student-name-bold">{student.name}</span>
                        <span className="student-email-sub">{student.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.8rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#334155' }}>
                        <Phone size={12} color="#64748b" /> {student.phone}
                      </span>
                    </div>
                  </td>

                  {/* Gender */}
                  <td>
                    <span style={{ fontSize: '0.84rem', color: '#475569' }}>
                      {student.gender}
                    </span>
                  </td>

                  {/* Department */}
                  <td>
                    <span className="badge-dept">{student.department}</span>
                  </td>

                  {/* Course */}
                  <td>
                    <span style={{ fontSize: '0.83rem', fontWeight: 500, color: '#1e293b' }}>
                      {student.course}
                    </span>
                  </td>

                  {/* Year */}
                  <td>
                    <span className="badge-year">{student.year}</span>
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`status-pill ${isActive ? 'active' : 'inactive'}`}>
                      <span className="status-dot-sm" />
                      <span>{student.status}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="action-buttons-group" style={{ justifyContent: 'center' }}>
                      <button
                        className="btn-icon-action view"
                        title="View Student Details"
                        onClick={() => onView(student)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-icon-action edit"
                        title="Edit Student Information"
                        onClick={() => onEdit(student)}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="btn-icon-action delete"
                        title="Delete Student Record"
                        onClick={() => onDelete(student)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
