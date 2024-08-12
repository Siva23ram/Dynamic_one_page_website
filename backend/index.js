// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shiva@1201',
  database: 'bannerDB',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Get banner data
app.get('/banner', (req, res) => {
  db.query('SELECT * FROM banners ', (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Update banner data
app.post('/banner', (req, res) => {
  const { description, link, timer, isVisible } = req.body;
  db.query(
    'UPDATE banners SET description = ?, link = ?, timer = ?, isVisible = ? ',
    [description, link, timer, isVisible],
    (err, result) => {
      if (err) throw err;
      res.send('Banner updated successfully');
    }
  );
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
