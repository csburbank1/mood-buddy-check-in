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
    } else {
      setCheckInData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Check-in submitted:', checkInData);
    // Here you would typically send the data to your backend
    alert('Check-in recorded for ' + checkInData.studentName);
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const fieldStyle = {
    marginBottom: '20px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  };

  const checkboxGroupStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '10px'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%'
  };

  return (
    <div style={formStyle}>
      <h2>Student Check-In Form</h2>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
      
      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label>
            Student Name:
            <input
              type="text"
              name="studentName"
              value={checkInData.studentName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>
        </div>

        <div style={fieldStyle}>
          <label>
            How are you feeling today?
            <select
              name="mood"
              value={checkInData.mood}
              onChange={handleChange}
              style={inputStyle}
            >
              {moodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={fieldStyle}>
          <label>Activities Completed:</label>
          <div style={checkboxGroupStyle}>
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
        </div>

        <div style={fieldStyle}>
          <label>Accommodations Used:</label>
          <div style={checkboxGroupStyle}>
            {accommodationOptions.map(accommodation => (
              <label key={accommodation} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  name="accommodationsUsed"
                  value={accommodation}
                  checked={checkInData.accommodationsUsed.includes(accommodation)}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                {accommodation}
              </label>
            ))}
          </div>
        </div>

        <div style={fieldStyle}>
          <label>
            Additional Notes:
            <textarea
              name="notes"
              value={checkInData.notes}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: '100px' }}
            />
          </label>
        </div>

        <button type="submit" style={buttonStyle}>
          Submit Check-In
        </button>
      </form>
    </div>
  );
}

export default CheckInForm;
