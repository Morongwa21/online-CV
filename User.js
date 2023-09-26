const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: "localhost", // Replace with the actual host if hosted remotely
  user: "root",
  password: "",
  database: "cvdb"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, email, phone_number, name } = req.body;

  try {
    db.query(
      'INSERT INTO User (username, password, email, phone_number, name) VALUES (?, ?, ?, ?, ?)',
      [username, password, email, phone_number, name],
      (error, results) => {
        if (error) {
          console.error('Error during registration:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.json({ message: 'User registered successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required', success: false });
    }
  
    try {
      const sql = 'SELECT * FROM User WHERE username = ?';
      db.query(sql, [username], (error, results) => {
        if (error) {
          console.error('Error during login:', error);
          return res.status(500).json({ message: 'Internal server error', success: false });
        }
  
        if (results.length === 0) {
          console.log('No user found with username:', username);
          return res.status(401).json({ message: 'Invalid credentials', success: false });
        }
  
        const user = results[0];
  
        // Compare the provided password with the stored password
        if (password !== user.password) {
          console.log('Password mismatch for user:', user.username);
          return res.status(401).json({ message: 'Invalid password', success: false });
        }
  
        res.status(200).json({ message: 'Login successful', success: true });
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error', success: false });
    }
  });
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
