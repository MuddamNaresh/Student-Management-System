import React from 'react';
import { Search, RotateCcw, Filter, X } from 'lucide-react';
import { DEPARTMENTS, YEARS, GENDERS } from '../data/sampleStudents';

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  genderFilter,
  setGenderFilter,
  yearFilter,
  setYearFilter,
  statusFilter,
  setStatusFilter,
  onResetFilters,
  totalResults,
  totalRecords
}) => {
  const isFiltered =
    searchTerm.trim() !== '' ||
    departmentFilter !== '' ||
    genderFilter !== '' ||
    yearFilter !== '' ||
    statusFilter !== '';

  return (
    <div className="search-filter-card">
      {/* Search Input Row */}
      <div className="search-bar-row">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-pos" />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search students by ID, Full Name, or Email Address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="modal-close-btn"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '26px',
                height: '26px'
              }}
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="active-results-badge">
          Showing <strong>{totalResults}</strong> of {totalRecords} records
        </div>
      </div>

      {/* Filter Select Controls Row */}
      <div className="filter-controls-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
          <Filter size={15} />
          <span>Filters:</span>
        </div>

        {/* Department Filter */}
        <select
          className="filter-select"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Gender Filter */}
        <select
          className="filter-select"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All Genders</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Year of Study Filter */}
        <select
          className="filter-select"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">All Years</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active Only</option>
          <option value="Inactive">Inactive Only</option>
        </select>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            className="reset-filters-btn"
            onClick={onResetFilters}
            title="Reset all search queries and active filters"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
