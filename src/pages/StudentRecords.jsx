import React, { useState, useMemo } from 'react';
import SearchFilter from '../components/SearchFilter';
import StudentTable from '../components/StudentTable';
import StudentDetailModal from '../components/StudentDetailModal';
import EditStudentModal from '../components/EditStudentModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { UserPlus, Download, FileSpreadsheet } from 'lucide-react';

const StudentRecords = ({
  students,
  onAddNavigate,
  onUpdateStudent,
  onDeleteStudent,
  selectedStudentForView,
  setSelectedStudentForView
}) => {
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals State
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Filtered Students (useMemo for high performance)
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // 1. Search Query (Matches ID, Name, or Email)
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const matchesId = student.id.toLowerCase().includes(query);
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesEmail = student.email.toLowerCase().includes(query);
        if (!matchesId && !matchesName && !matchesEmail) {
          return false;
        }
      }

      // 2. Department Filter
      if (departmentFilter && student.department !== departmentFilter) {
        return false;
      }

      // 3. Gender Filter
      if (genderFilter && student.gender !== genderFilter) {
        return false;
      }

      // 4. Year Filter
      if (yearFilter && student.year !== yearFilter) {
        return false;
      }

      // 5. Status Filter
      if (statusFilter && student.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [students, searchTerm, departmentFilter, genderFilter, yearFilter, statusFilter]);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setGenderFilter('');
    setYearFilter('');
    setStatusFilter('');
  };

  // Export to CSV Functionality
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;

    const headers = [
      "Student ID", "Full Name", "Email Address", "Phone", "Gender",
      "Date of Birth", "Department", "Course", "Year", "Status", "Address"
    ];

    const rows = filteredStudents.map(s => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.phone}"`,
      `"${s.gender}"`,
      `"${s.dob}"`,
      `"${s.department}"`,
      `"${s.course}"`,
      `"${s.year}"`,
      `"${s.status}"`,
      `"${s.address.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      {/* Top Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Registered Student Directory
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Search, filter, view profiles, update information, and manage records
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn-secondary"
            onClick={handleExportCSV}
            title="Download filtered records as CSV file"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button
            className="btn-primary"
            onClick={onAddNavigate}
          >
            <UserPlus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onResetFilters={handleResetFilters}
        totalResults={filteredStudents.length}
        totalRecords={students.length}
      />

      {/* Student Records Table */}
      <StudentTable
        students={filteredStudents}
        onView={(student) => setSelectedStudentForView(student)}
        onEdit={(student) => setEditingStudent(student)}
        onDelete={(student) => setDeletingStudent(student)}
        onClearFilters={handleResetFilters}
      />

      {/* Modal 1: View Student Details */}
      <StudentDetailModal
        student={selectedStudentForView}
        onClose={() => setSelectedStudentForView(null)}
        onEdit={(student) => {
          setSelectedStudentForView(null);
          setEditingStudent(student);
        }}
      />

      {/* Modal 2: Edit Student Record */}
      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onUpdate={onUpdateStudent}
        existingStudents={students}
      />

      {/* Modal 3: Delete Confirmation */}
      <DeleteConfirmModal
        student={deletingStudent}
        onCancel={() => setDeletingStudent(null)}
        onConfirm={(studentId) => {
          onDeleteStudent(studentId);
          setDeletingStudent(null);
        }}
      />
    </div>
  );
};

export default StudentRecords;
