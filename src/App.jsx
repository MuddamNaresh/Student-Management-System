import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import StudentRecords from './pages/StudentRecords';
import Toast from './components/Toast';
import { initialStudents } from './data/sampleStudents';
import './App.css';

const STORAGE_KEY = 'sms_students_data_v1';

function App() {
  // 1. Initialize State with localStorage or default sample students
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to read from localStorage:', err);
    }
    return initialStudents;
  });

  // 2. Active Tab State ('dashboard' | 'add-student' | 'records')
  const [activeTab, setActiveTab] = useState('dashboard');

  // 3. Mobile Sidebar Drawer State
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 4. Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // 5. Selected Student For Viewing
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);

  // 6. Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (err) {
      console.error('Failed to write to localStorage:', err);
    }
  }, [students]);

  // Helper: Trigger Toast Notification
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // CRUD: Add Student
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    addToast(`Student ${newStudent.name} (${newStudent.id}) enrolled successfully!`, 'success');
  };

  // CRUD: Update Student
  const handleUpdateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    addToast(`Record for ${updatedStudent.name} (${updatedStudent.id}) updated!`, 'success');
  };

  // CRUD: Delete Student
  const handleDeleteStudent = (studentId) => {
    const toDelete = students.find((s) => s.id === studentId);
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    addToast(
      `Student ${toDelete ? toDelete.name : studentId} removed from records.`,
      'error'
    );
  };

  // Reset to Sample Data
  const handleResetDemoData = () => {
    setStudents(initialStudents);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
    addToast('Demo data restored with 12 sample students.', 'info');
  };

  // Navigate to View Student
  const handleViewStudentDirectly = (student) => {
    setSelectedStudentForView(student);
    setActiveTab('records');
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalStudents={students.length}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Navbar
          activeTab={activeTab}
          setIsMobileOpen={setIsMobileOpen}
          studentCount={students.length}
        />

        <main>
          {activeTab === 'dashboard' && (
            <Dashboard
              students={students}
              onNavigate={(tab) => setActiveTab(tab)}
              onResetDemoData={handleResetDemoData}
              onViewStudent={handleViewStudentDirectly}
            />
          )}

          {activeTab === 'add-student' && (
            <AddStudent
              onAddStudent={handleAddStudent}
              existingStudents={students}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'records' && (
            <StudentRecords
              students={students}
              onAddNavigate={() => setActiveTab('add-student')}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              selectedStudentForView={selectedStudentForView}
              setSelectedStudentForView={setSelectedStudentForView}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Alerts */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
