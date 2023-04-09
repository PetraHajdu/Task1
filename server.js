const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');


const app = express();
const saltRounds = 10;



app.use(bodyParser.json());
app.use(cors());

app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  res.status(200).json(users);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (authenticated) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
});

app.post('/registration', (req, res) => {
  const newUser = req.body;
  const users = [];

  const existingUser = users.find(user => user.username === newUser.username);
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
    return;
  }

  const existingEmail = users.find(user => user.email === newUser.email);
  if (existingEmail) {
    res.status(400).json({ message: 'Email already exists' });
    return;
  }

  users.push(newUser);
  fs.writeFileSync('./users.json', JSON.stringify(users));

  res.status(201).json({ message: 'Registration successful' });
});

app.listen(3000, () => console.log('Server started on port 3000'));
