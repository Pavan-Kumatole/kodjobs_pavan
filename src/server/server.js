const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = path.join(__dirname, '../users.json');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-app-password' // Replace with your app password
  }
});

// Helper function to read users file
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write users file
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Mock jobs data
const mockJobs = [
  {
    id: 1,
    companyName: "SpecBee",
    companyLogo: "https://example.com/specbee-logo.png",
    location: "Bangalore",
    role: "Frontend Developer",
    salary: 3.70,
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "React"],
    postedDate: "2 days ago"
  }
];

// API Endpoints
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password, email, age } = req.body;
    const users = await readUsers();

    if (users.some(user => user.username === username || user.email === email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'You already have an account. Please log-in.' 
      });
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
      email,
      age
    };

    users.push(newUser);
    await writeUsers(users);

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Welcome to KodJob - Account Details',
      html: `
        <h2>Welcome to KodJob!</h2>
        <p>Here are your account details:</p>
        <ul>
          <li>User ID: ${newUser.id}</li>
          <li>Username: ${username}</li>
          <li>Password: ${password}</li>
        </ul>
        <p>Please keep this information safe.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, userId: newUser.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await readUsers();

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      res.json({ success: true, userId: user.id });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/jobs', (req, res) => {
  res.json(mockJobs);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});