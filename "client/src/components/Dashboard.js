import React from 'react';

function Dashboard() {
  const currentDate = new Date().toLocaleString();
  
  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1>Special Education Check-In Dashboard</h1>
        <p>Current time: {currentDate}</p>
        <p>User: csburbank1</p>
      </header>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <h2>Today's Check-ins</h2>
          <p>No check-ins recorded yet</p>
        </div>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <h2>Quick Actions</h2>
          <button style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>
            New Check-in
          </button>
          <button style={{
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
