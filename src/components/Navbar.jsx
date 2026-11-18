import React from 'react';
import { Menu, Calendar, Database, Shield } from 'lucide-react';

const Navbar = ({ activeTab, setIsMobileOpen, studentCount }) => {
  const getPageMeta = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'System Dashboard',
          subtitle: 'Real-time overview of student enrollments and administrative statistics'
        };
      case 'add-student':
        return {
          title: 'Register New Student',
          subtitle: 'Enroll a new student and record essential academic details'
        };
      case 'records':
        return {
          title: 'Student Directory',
          subtitle: `Managing all ${studentCount} registered students across departments`
        };
      default:
        return {
          title: 'Student Management System',
          subtitle: 'Administrative Portal'
        };
    }
  };

  const meta = getPageMeta();
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="top-navbar">
      <div className="nav-left">
        <button 
          className="menu-toggle-btn"
          onClick={() => setIsMobileOpen(prev => !prev)}
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="page-breadcrumb">
          <h1 className="page-title">{meta.title}</h1>
          <span className="page-subtitle">{meta.subtitle}</span>
        </div>
      </div>

      <div className="nav-right">
        <div className="system-status-pill">
          <Database size={14} color="#3b82f6" />
          <span>Storage: <strong>localStorage</strong></span>
          <span className="status-dot-active" title="localStorage Active"></span>
        </div>

        <div className="date-badge">
          <Calendar size={15} />
          <span>{todayFormatted}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
