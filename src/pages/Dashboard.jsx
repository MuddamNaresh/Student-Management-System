import React from 'react';
import DashboardCards from '../components/DashboardCards';
import { 
  UserPlus, 
  Users, 
  Building2, 
  PieChart, 
  ArrowRight, 
  GraduationCap, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS } from '../data/sampleStudents';

const Dashboard = ({ students, onNavigate, onResetDemoData, onViewStudent }) => {
  // Department Distribution calculation
  const deptCounts = DEPARTMENTS.map(dept => {
    const count = students.filter(s => s.department === dept).length;
    const percentage = students.length > 0 ? Math.round((count / students.length) * 100) : 0;
    return { dept, count, percentage };
  });

  // Recent 5 Students
  const recentStudents = [...students].slice(0, 5);

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
        color: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.18)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Sparkles size={13} />
            <span>Academic Session 2026-2027</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
            Welcome to Student Management Portal
          </h2>
          <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '600px' }}>
            Centralized administrative system for tracking academic enrollments, student profiles, department statistics, and academic standing.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-primary" 
            style={{ background: '#ffffff', color: '#1e40af', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            onClick={() => onNavigate('add-student')}
          >
            <UserPlus size={16} />
            <span>Enroll New Student</span>
          </button>

          <button 
            className="btn-secondary"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={() => onNavigate('records')}
          >
            <Users size={16} />
            <span>View All Records</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <DashboardCards students={students} departments={DEPARTMENTS} />

      {/* Two-Column Analytics Section */}
      <div className="dashboard-grid-two-col">
        {/* Left Column: Department Breakdown */}
        <div className="card-box">
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Department Enrollment Breakdown</h3>
              <p className="card-heading-desc">Student distribution across institutional faculties</p>
            </div>
            <div style={{ background: '#eff6ff', padding: '0.4rem', borderRadius: '8px', color: '#2563eb' }}>
              <Building2 size={20} />
            </div>
          </div>

          <div className="dept-bars-list">
            {deptCounts.map(({ dept, count, percentage }) => (
              <div key={dept} className="dept-bar-item">
                <div className="dept-bar-meta">
                  <span style={{ color: '#1e293b' }}>{dept}</span>
                  <span style={{ color: '#64748b' }}>
                    {count} {count === 1 ? 'student' : 'students'} ({percentage}%)
                  </span>
                </div>
                <div className="dept-progress-bg">
                  <div 
                    className="dept-progress-fill" 
                    style={{ width: `${Math.max(percentage, count > 0 ? 8 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Admin Controls */}
        <div className="card-box">
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Administrative Actions</h3>
              <p className="card-heading-desc">Quick shortcuts for daily student operations</p>
            </div>
            <div style={{ background: '#f5f3ff', padding: '0.4rem', borderRadius: '8px', color: '#8b5cf6' }}>
              <PieChart size={20} />
            </div>
          </div>

          <div className="quick-actions-list">
            <button 
              className="quick-action-btn"
              onClick={() => onNavigate('add-student')}
            >
              <div className="quick-action-info">
                <div className="quick-action-icon">
                  <UserPlus size={18} />
                </div>
                <div>
                  <div className="quick-action-title">Register Student</div>
                  <div className="quick-action-sub">Open student admission form</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </button>

            <button 
              className="quick-action-btn"
              onClick={() => onNavigate('records')}
            >
              <div className="quick-action-info">
                <div className="quick-action-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                  <Users size={18} />
                </div>
                <div>
                  <div className="quick-action-title">Browse Directory</div>
                  <div className="quick-action-sub">Search, filter & edit records</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </button>

            <button 
              className="quick-action-btn"
              onClick={onResetDemoData}
              title="Reload initial 12 sample students"
            >
              <div className="quick-action-info">
                <div className="quick-action-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
                  <RotateCcw size={18} />
                </div>
                <div>
                  <div className="quick-action-title">Reset Demo Records</div>
                  <div className="quick-action-sub">Restore sample dataset (12 students)</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Enrollments Table Snippet */}
      <div className="card-box">
        <div className="card-header-row">
          <div>
            <h3 className="card-heading">Recent Student Registrations</h3>
            <p className="card-heading-desc">Latest student records saved in the system</p>
          </div>
          <button 
            className="btn-secondary" 
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
            onClick={() => onNavigate('records')}
          >
            <span>View Full Directory</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="student-data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Course</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((s) => (
                <tr key={s.id}>
                  <td><span className="badge-id">{s.id}</span></td>
                  <td>
                    <strong>{s.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.email}</div>
                  </td>
                  <td><span className="badge-dept">{s.department}</span></td>
                  <td>{s.course}</td>
                  <td><span className="badge-year">{s.year}</span></td>
                  <td>
                    <span className={`status-pill ${s.status === 'Active' ? 'active' : 'inactive'}`}>
                      <span className="status-dot-sm" />
                      <span>{s.status}</span>
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-secondary"
                      style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}
                      onClick={() => onViewStudent(s)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
