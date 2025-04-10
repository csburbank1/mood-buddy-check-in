const express = require('express');
const app = express();

app.get('/api/timestamp', (req, res) => {
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);
  res.json({
    timestamp,
    user: process.env.GITHUB_USER || 'csburbank1'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
