import React from 'react';

function App() {
  const [currentDateTime, setCurrentDateTime] = React.useState('');
  
  React.useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.getUTCFullYear() + '-' + 
        String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
        String(now.getUTCDate()).padStart(2, '0') + ' ' +
        String(now.getUTCHours()).padStart(2, '0') + ':' +
        String(now.getUTCMinutes()).padStart(2, '0') + ':' +
        String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentDateTime(formatted);
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Special Education Check-In System</h1>
      <p>Current Date and Time (UTC): {currentDateTime}</p>
      <p>Current User: {process.env.REACT_APP_GITHUB_USERNAME || 'csburbank1'}</p>
    </div>
  );
}

export default App;
