import React from 'react';
import { Users, UserCheck, UserX, Building2, TrendingUp } from 'lucide-react';

const DashboardCards = ({ students, departments }) => {
  const total = students.length;
  const activeCount = students.filter(s => s.status === 'Active').length;
  const inactiveCount = students.filter(s => s.status === 'Inactive').length;
  const totalDepts = departments ? departments.length : 6;

  const activePercent = total > 0 ? Math.round((activeCount / total) * 100) : 0;
  const inactivePercent = total > 0 ? Math.round((inactiveCount / total) * 100) : 0;

  const cardsData = [
    {
      id: 'total-students',
      label: 'Total Students',
      value: total,
      trend: 'Registered In System',
      colorClass: 'blue',
      icon: Users
    },
    {
      id: 'active-students',
      label: 'Active Students',
      value: activeCount,
      trend: `${activePercent}% currently enrolled`,
      colorClass: 'green',
      icon: UserCheck
    },
    {
      id: 'inactive-students',
      label: 'Inactive Students',
      value: inactiveCount,
      trend: `${inactivePercent}% on leave or inactive`,
      colorClass: 'amber',
      icon: UserX
    },
    {
      id: 'total-departments',
      label: 'Total Departments',
      value: totalDepts,
      trend: 'Academic Faculties',
      colorClass: 'purple',
      icon: Building2
    }
  ];

  return (
    <div className="stats-grid">
      {cardsData.map((card) => {
        const IconComponent = card.icon;
        return (
          <div key={card.id} className={`stat-card ${card.colorClass}`}>
            <div className="stat-content">
              <span className="stat-label">{card.label}</span>
              <div className="stat-value">{card.value}</div>
              <div className="stat-trend">
                <TrendingUp size={13} color={card.colorClass === 'green' ? '#10b981' : '#64748b'} />
                <span>{card.trend}</span>
              </div>
            </div>
            <div className={`stat-icon-wrapper ${card.colorClass}`}>
              <IconComponent size={26} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
