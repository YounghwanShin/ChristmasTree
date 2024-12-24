/**
 * server/server.js
 * Node + Express 로컬 서버
 * - DB는 public/db.json 파일 사용
 * - 장식/편지 등록 시 id(Date.now) 부여
 * - [중요] decorations GET 시 id 오름차순 정렬 후 응답
 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// db.json 경로
const DB_FILE_PATH = path.join(__dirname, 'public', 'db.json');

// JSON 파일 읽기
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return { decorations: [], letters: [] };
  }
}

// JSON 파일 쓰기
function writeDB(jsonData) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

/**
 * [GET] /api/decorations
 * - DB에 저장된 decorations 배열 반환
 * - 여기서 id 기준으로 정렬하여 반환해주면, 
 *   클라이언트가 매번 동일한 순서로 받는다.
 */
app.get('/api/decorations', (req, res) => {
  const db = readDB();
  // id 오름차순 정렬
  const sorted = [...db.decorations].sort((a, b) => a.id - b.id);
  res.json(sorted);
});

/**
 * [GET] /api/letters
 * - 편지 목록
 */
app.get('/api/letters', (req, res) => {
  const db = readDB();
  res.json(db.letters);
});

/**
 * [POST] /api/decorations
 * - 장식, 편지 등록
 * - x,y는 안 쓰고, id만 발급
 */
app.post('/api/decorations', (req, res) => {
  const { nickname, letter, ornamentSrc } = req.body;
  const db = readDB();

  // 고유 id
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

// (옵션) 트리 주인 인증용
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const OWNER_PASSWORD = '1224';

  if (password === OWNER_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: '비밀번호가 틀렸습니다.' });
  }
});

// (옵션) 트리 주인 전용 편지 조회
app.get('/api/owner-letters', (req, res) => {
  const db = readDB();
  res.json(db.letters);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
