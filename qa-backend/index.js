const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let users = [
  { id: 4, name: 'Mehmet Furkan Ersamut', email: 'furkan.ersamut37@gmail.com' }
];

// GET - Tüm kullanıcıları getir
app.get('/users', (req, res) => {
  res.json(users);
});

// POST - Yeni kullanıcı ekle (Validation eklendi)
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Duplicate email kontrolü ekle
  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Kullanıcıyı güncelle (Validation eklendi)
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
  
    const index = users.findIndex(u => u.id === userId);
  
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    users[index] = { ...users[index], ...updatedUser };
    res.json({ message: 'User updated' });
  });

// DELETE - Kullanıcıyı sil (Validation eklendi)
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    const index = users.findIndex(u => u.id === userId);
  
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    users.splice(index, 1);
    res.json({ message: 'User deleted' });
  });
  
  app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Örnek olarak sadece bu sabit bilgilerle login'e izin veriyoruz
  if (email === 'admin@sunion.com' && password === 'password123') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});
app.get('/', (req, res) => {
  res.send('Sunion QA Backend API is running.');
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
