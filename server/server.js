const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DB_FILE_PATH = path.join(__dirname, 'public', 'db.json');

function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return { decorations: [], letters: [] };
  }
}

function writeDB(jsonData) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

app.get('/api/decorations', (req, res) => {
  const db = readDB();
  const sorted = [...db.decorations].sort((a, b) => a.id - b.id);
  res.json(sorted);
});

app.get('/api/letters', (req, res) => {
  const db = readDB();
  res.json(db.letters);
});

app.post('/api/decorations', (req, res) => {
  const { nickname, letter, ornamentSrc } = req.body;
  const db = readDB();

  const newId = Date.now();

  db.decorations.push({
    id: newId,
    nickname,
    ornamentSrc,
  });

  db.letters.push({
    id: newId,
    nickname,
    letter,
  });

  writeDB(db);

  return res.status(201).json({
    message: '장식 및 편지가 성공적으로 추가되었습니다.',
  });
});

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const OWNER_PASSWORD = '1224';

  if (password === OWNER_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: '비밀번호가 틀렸습니다.' });
  }
});

app.get('/api/owner-letters', (req, res) => {
  const db = readDB();
  res.json(db.letters);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
