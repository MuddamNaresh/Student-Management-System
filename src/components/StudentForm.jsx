import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw, 
  Save, 
  Building2, 
  BookOpen, 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  Hash 
} from 'lucide-react';
import { DEPARTMENTS, YEARS, GENDERS, COURSES_BY_DEPARTMENT } from '../data/sampleStudents';

const StudentForm = ({ 
  onSubmit, 
  existingStudents = [], 
  initialData = null, 
  isEditMode = false, 
  onCancel = null 
}) => {
  const emptyForm = {
    id: '',
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '',
    department: '',
    course: '',
    year: '1st Year',
    address: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
      setTouched({});
    } else {
      setFormData(emptyForm);
      setErrors({});
      setTouched({});
    }
  }, [initialData]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // If department changed, update course automatically if not matching
      if (name === 'department') {
        const availableCourses = COURSES_BY_DEPARTMENT[value] || [];
        if (availableCourses.length > 0 && !availableCourses.includes(prev.course)) {
          updated.course = availableCourses[0];
        }
      }
      return updated;
    });

    // Clear error for field on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Field Level Validation
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'id':
        if (!value || !value.trim()) {
          error = 'Student ID is required.';
        } else {
          const trimmed = value.trim();
          const isDuplicate = existingStudents.some(
            student => student.id.toLowerCase() === trimmed.toLowerCase() && 
            (!isEditMode || student.id !== initialData?.id)
          );
          if (isDuplicate) {
            error = 'Student ID is already registered. Must be unique.';
          } else if (trimmed.length < 3) {
            error = 'Student ID must be at least 3 characters.';
          }
        }
        break;

      case 'name':
        if (!value || !value.trim()) {
          error = 'Full name is required.';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long.';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
          error = 'Name contains invalid characters.';
        }
        break;

      case 'email':
        if (!value || !value.trim()) {
          error = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email format (e.g., student@example.edu).';
        }
        break;

      case 'phone':
        if (!value || !value.trim()) {
          error = 'Phone number is required.';
        } else {
          const cleaned = value.replace(/[\s-]/g, '');
          if (!/^\d{10,14}$/.test(cleaned)) {
            error = 'Phone number must contain 10 to 14 digits.';
          }
        }
        break;

      case 'dob':
        if (!value) {
          error = 'Date of birth is required.';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          if (selectedDate >= today) {
            error = 'Date of birth must be in the past.';
          }
        }
        break;

      case 'department':
        if (!value || !value.trim()) {
          error = 'Please select a department.';
        }
        break;

      case 'course':
        if (!value || !value.trim()) {
          error = 'Please select or specify the course.';
        }
        break;

      case 'year':
        if (!value) {
          error = 'Please select year of study.';
        }
        break;

      case 'address':
        if (!value || !value.trim()) {
          error = 'Residential address is required.';
        } else if (value.trim().length < 5) {
          error = 'Please provide a more detailed address (min 5 characters).';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  // Full Form Validation on Submit
  const validateForm = () => {
    const fields = ['id', 'name', 'email', 'phone', 'dob', 'department', 'course', 'year', 'address'];
    const newErrors = {};
    let isValid = true;

    fields.forEach(f => {
      const err = validateField(f, formData[f]);
      if (err) {
        newErrors[f] = err;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: formData.id.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim()
      });
      if (!isEditMode) {
        setFormData(emptyForm);
        setTouched({});
        setErrors({});
      }
    }
  };

  const handleReset = () => {
    if (isEditMode && initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    setTouched({});
  };

  const availableCourses = formData.department 
    ? COURSES_BY_DEPARTMENT[formData.department] || [] 
    : [];

  return (
    <div className="form-card">
      <div className="form-header-badge">
        <UserPlus size={14} />
        <span>{isEditMode ? 'Modify Record' : 'Enrollment Desk'}</span>
      </div>
      <h2 className="form-title">
        {isEditMode ? `Edit Student: ${formData.id}` : 'Student Registration Form'}
      </h2>
      <p className="form-description">
        {isEditMode 
          ? 'Update the student profile details below and save changes.' 
          : 'Fill in the required information to register a new student in the institutional system.'}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid-layout">
          {/* Student ID */}
          <div className="form-group">
            <label className="form-label">
              <Hash size={14} />
              <span>Student ID</span>
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="id"
              className={`form-input-text ${errors.id ? 'has-error' : ''}`}
              placeholder="e.g. STU-1025"
              value={formData.id}
              onChange={handleChange}
              onBlur={() => handleBlur('id')}
              disabled={isEditMode} // Usually ID is immutable when editing
            />
            {errors.id && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.id}
              </span>
            )}
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">
              <User size={14} />
              <span>Full Name</span>
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              name="name"
              className={`form-input-text ${errors.name ? 'has-error' : ''}`}
              placeholder="e.g. Priya Sundaram"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
            />
            {errors.name && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.name}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label">
              <Mail size={14} />
              <span>Email Address</span>
              <span className="required-star">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`form-input-text ${errors.email ? 'has-error' : ''}`}
              placeholder="e.g. priya.s@example.edu"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
            />
            {errors.email && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.email}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label">
              <Phone size={14} />
              <span>Phone Number</span>
              <span className="required-star">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              className={`form-input-text ${errors.phone ? 'has-error' : ''}`}
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
            />
            {errors.phone && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.phone}
              </span>
            )}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label className="form-label">
              <span>Gender</span>
              <span className="required-star">*</span>
            </label>
            <select
              name="gender"
              className="form-select-box"
              value={formData.gender}
              onChange={handleChange}
            >
              {GENDERS.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label className="form-label">
              <Calendar size={14} />
              <span>Date of Birth</span>
              <span className="required-star">*</span>
            </label>
            <input
              type="date"
              name="dob"
              className={`form-input-text ${errors.dob ? 'has-error' : ''}`}
              value={formData.dob}
              onChange={handleChange}
              onBlur={() => handleBlur('dob')}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dob && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.dob}
              </span>
            )}
          </div>

          {/* Department */}
          <div className="form-group">
            <label className="form-label">
              <Building2 size={14} />
              <span>Department</span>
              <span className="required-star">*</span>
            </label>
            <select
              name="department"
              className={`form-select-box ${errors.department ? 'has-error' : ''}`}
              value={formData.department}
              onChange={handleChange}
              onBlur={() => handleBlur('department')}
            >
              <option value="">-- Choose Department --</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.department}
              </span>
            )}
          </div>

          {/* Course */}
          <div className="form-group">
            <label className="form-label">
              <BookOpen size={14} />
              <span>Course / Degree</span>
              <span className="required-star">*</span>
            </label>
            {availableCourses.length > 0 ? (
              <select
                name="course"
                className={`form-select-box ${errors.course ? 'has-error' : ''}`}
                value={formData.course}
                onChange={handleChange}
                onBlur={() => handleBlur('course')}
              >
                <option value="">-- Select Degree Course --</option>
                {availableCourses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="course"
                className={`form-input-text ${errors.course ? 'has-error' : ''}`}
                placeholder="e.g. B.Tech Computer Science"
                value={formData.course}
                onChange={handleChange}
                onBlur={() => handleBlur('course')}
              />
            )}
            {errors.course && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.course}
              </span>
            )}
          </div>

          {/* Year of Study */}
          <div className="form-group">
            <label className="form-label">
              <span>Year of Study</span>
              <span className="required-star">*</span>
            </label>
            <select
              name="year"
              className="form-select-box"
              value={formData.year}
              onChange={handleChange}
            >
              {YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Student Status (Active / Inactive) */}
          <div className="form-group">
            <label className="form-label">
              <span>Enrollment Status</span>
              <span className="required-star">*</span>
            </label>
            <div className="form-radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                />
                <span style={{ color: '#065f46', fontWeight: 600 }}>Active</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                />
                <span style={{ color: '#64748b', fontWeight: 600 }}>Inactive</span>
              </label>
            </div>
          </div>

          {/* Residential Address */}
          <div className="form-group col-span-2">
            <label className="form-label">
              <MapPin size={14} />
              <span>Residential Address</span>
              <span className="required-star">*</span>
            </label>
            <textarea
              name="address"
              rows={3}
              className={`form-textarea-box ${errors.address ? 'has-error' : ''}`}
              placeholder="e.g. Flat 301, Silver Crest Residency, High Street Road..."
              value={formData.address}
              onChange={handleChange}
              onBlur={() => handleBlur('address')}
            />
            {errors.address && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.address}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="form-actions-footer">
          {onCancel && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            className="btn-secondary"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>{isEditMode ? 'Revert' : 'Reset Form'}</span>
          </button>

          <button
            type="submit"
            className="btn-primary"
          >
            {isEditMode ? <Save size={16} /> : <CheckCircle size={16} />}
            <span>{isEditMode ? 'Update Student Record' : 'Add Student'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
