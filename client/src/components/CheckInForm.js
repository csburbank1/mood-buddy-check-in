import React, { useState } from 'react';

function CheckInForm() {
  const [checkInData, setCheckInData] = useState({
    studentName: '',
    date: new Date().toISOString().split('T')[0],
    mood: '3',
    activities: [],
    notes: '',
    accommodationsUsed: []
  });

  // Add validation state
  const [errors, setErrors] = useState({
    studentName: '',
    activities: '',
    accommodationsUsed: '',
    notes: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });

  const moodOptions = [
    { value: '1', label: '😢 Very Unhappy' },
    { value: '2', label: '😕 Unhappy' },
    { value: '3', label: '😐 Neutral' },
    { value: '4', label: '🙂 Happy' },
    { value: '5', label: '😊 Very Happy' }
  ];

  const activityOptions = [
    'Completed Assignments',
    'Participated in Class',
    'Used Accommodations',
    'Asked for Help',
    'Worked with Peers'
  ];

  const accommodationOptions = [
    'Extended Time',
    'Quiet Space',
    'Reading Support',
    'Break Time',
    'Visual Aids'
  ];

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      studentName: '',
      activities: '',
      accommodationsUsed: '',
      notes: ''
    };

    // Student Name validation
    if (!checkInData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
      isValid = false;
    } else if (checkInData.studentName.length < 2) {
      newErrors.studentName = 'Name must be at least 2 characters long';
      isValid = false;
    } else if (!/^[a-zA-Z\s-']+$/.test(checkInData.studentName)) {
      newErrors.studentName = 'Name can only contain letters, spaces, hyphens, and apostrophes';
      isValid = false;
    }

    // Activities validation
    if (checkInData.activities.length === 0) {
      newErrors.activities = 'Please select at least one activity';
      isValid = false;
    }

    // Notes validation (optional but with length limit)
    if (checkInData.notes.length > 500) {
      newErrors.notes = 'Notes cannot exceed 500 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const arrayField = name === 'activities' ? 'activities' : 'accommodationsUsed';
      setCheckInData(prev => ({
        ...prev,
        [arrayField]: checked
          ? [...prev[arrayField], value]
          : prev[arrayField].filter(item => item !== value)
      }));
      // Clear error when user starts selecting
      setErrors(prev => ({
        ...prev,
        [arrayField]: ''
      }));
    } else {
      setCheckInData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user starts typing
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ message: '', type: '' });

    if (validateForm()) {
      // Format the current time
      const now = new Date();
      const formattedDate = now.getUTCFullYear() + '-' + 
        String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
        String(now.getUTCDate()).padStart(2, '0') + ' ' +
        String(now.getUTCHours()).padStart(2, '0') + ':' +
        String(now.getUTCMinutes()).padStart(2, '0') + ':' +
        String(now.getUTCSeconds()).padStart(2, '0');

      const submitData = {
        ...checkInData,
        submittedAt: formattedDate,
        submittedBy: 'csburbank1'
      };

      console.log('Check-in submitted:', submitData);
      setSubmitStatus({
        message: 'Check-in successfully recorded!',
        type: 'success'
      });

      // Reset form after successful submission
      setCheckInData({
        studentName: '',
        date: new Date().toISOString().split('T')[0],
        mood: '3',
        activities: [],
        notes: '',
        accommodationsUsed: []
      });
    } else {
      setSubmitStatus({
        message: 'Please correct the errors in the form.',
        type: 'error'
      });
    }
  };

  // Styles
  const styles = {
    formStyle: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    fieldStyle: {
      marginBottom: '20px'
    },
    inputStyle: {
      width: '100%',
      padding: '8px',
      marginTop: '5px',
      borderRadius: '4px',
      border: '1px solid #ddd'
    },
    errorText: {
      color: '#dc3545',
      fontSize: '14px',
      marginTop: '5px'
    },
    successText: {
      color: '#28a745',
      fontSize: '14px',
      marginTop: '5px'
    },
    submitButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%'
    },
    checkboxGroupStyle: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '10px',
      marginTop: '10px'
    },
    statusMessage: {
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '4px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.formStyle}>
      <h2>Student Check-In Form</h2>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>

      {submitStatus.message && (
        <div style={{
          ...styles.statusMessage,
          backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
          color: submitStatus.type === 'success' ? '#155724' : '#721c24'
        }}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.fieldStyle}>
          <label>
            Student Name:
            <input
              type="text"
              name="studentName"
              value={checkInData.studentName}
              onChange={handleChange}
              style={{
                ...styles.inputStyle,
                borderColor: errors.studentName ? '#dc3545' : '#ddd'
              }}
              required
            />
          </label>
          {errors.studentName && (
            <div style={styles.errorText}>{errors.studentName}</div>
          )}
        </div>

        <div style={styles.fieldStyle}>
          <label>
            How are you feeling today?
            <select
              name="mood"
              value={checkInData.mood}
              onChange={handleChange}
              style={styles.inputStyle}
            >
              {moodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={styles.fieldStyle}>
          <label>Activities Completed:</label>
          <div style={styles.checkboxGroupStyle}>
            {activityOptions.map(activity => (
              <label key={activity} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  name="activities"
                  value={activity}
                  checked={checkInData.activities.includes(activity)}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                {activity}
              </label>
            ))}
          </div>
          {errors.activities && (
            <div style={styles.errorText}>{errors.activities}</div>
          )}
        </div>

        <div style={styles.fieldStyle}>
          <label>
            Additional Notes:
            <textarea
              name="notes"
              value={checkInData.notes}
              onChange={handleChange}
              style={{
                ...styles.inputStyle,
                minHeight: '100px',
                borderColor: errors.notes ? '#dc3545' : '#ddd'
              }}
            />
          </label>
          {errors.notes && (
            <div style={styles.errorText}>{errors.notes}</div>
          )}
          <div style={{ fontSize: '12px', color: '#666' }}>
            {500 - checkInData.notes.length} characters remaining
          </div>
        </div>

        <button type="submit" style={styles.submitButton}>
          Submit Check-In
        </button>
      </form>
    </div>
  );
}

export default CheckInForm;
