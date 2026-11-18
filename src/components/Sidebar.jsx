import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  X 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, totalStudents, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'add-student',
      label: 'Add Student',
      icon: UserPlus,
      badge: null
    },
    {
      id: 'records',
      label: 'Student Records',
      icon: Users,
      badge: totalStudents
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`sidebar-overlay ${isMobileOpen ? 'mobile-open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="brand-title">EduPortal</div>
            <div className="brand-subtitle">Student Management</div>
          </div>
          {isMobileOpen && (
            <button 
              className="modal-close-btn" 
              style={{ marginLeft: 'auto', color: '#94a3b8' }}
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div className="nav-section-title">Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.badge !== null && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info */}
        <div className="sidebar-footer">
          <div className="user-avatar">
            AD
          </div>
          <div className="user-info">
            <span className="user-name">Admin Portal</span>
            <span className="user-role" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ShieldCheck size={13} color="#10b981" /> System Administrator
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
