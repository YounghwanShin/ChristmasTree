/**
 * src/pages/Home.jsx
 * - 서버에서 decorations, letters 불러오기
 * - 새 장식 등록 시 (ornamentSrc, nickname, letter)만 POST
 * - x, y 없이 저장
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrnamentForm from '../components/OrnamentForm';
import TreeCanvas from '../components/TreeCanvas';
import './Home.css';

function Home() {
  const [decorations, setDecorations] = useState([]);
  const [letters, setLetters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // 페이지 로드 시 DB에서 decorations, letters 불러오기
  useEffect(() => {
    // decorations
    fetch('https://chrismastree.onrender.com/api/decorations')
      .then((res) => res.json())
      .then((data) => {
        // 여기서는 서버에서 이미 정렬된 데이터를 주므로, 
        // 추가 정렬 없이 그대로 setDecorations
        setDecorations(data);
      })
      .catch((err) => console.error(err));

    // letters
    fetch('https://chrismastree.onrender.com/api/letters')
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error(err));
  }, []);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  // OrnamentForm에서 받은 { ornamentSrc, nickname, letter }
  const handleAddDecoration = async (decoration) => {
    try {
      // 서버에 POST
      const response = await fetch('https://chrismastree.onrender.com/api/decorations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decoration),
      });

      if (!response.ok) {
        throw new Error('서버에 장식 추가 실패');
      }

      // 등록 성공 후 다시 fetch
      const [updatedDecorations, updatedLetters] = await Promise.all([
        fetch('https://chrismastree.onrender.com/api/decorations').then((res) => res.json()),
        fetch('https://chrismastree.onrender.com/api/letters').then((res) => res.json()),
      ]);

      // 서버에서 /api/decorations 시 id 오름차순 정렬된 데이터가 온다
      setDecorations(updatedDecorations);
      setLetters(updatedLetters);
    } catch (error) {
      console.error(error);
      alert('장식 달기에 실패했습니다.');
    } finally {
      closeForm();
    }
  };

  // “영환 인증” 버튼
  const handleOwnerAuth = () => {
    navigate('/owner');
  };

  return (
    <div className="home-container">
      <div className="header-container">
        <h1 className="title">신영환님의 크리스마스 트리</h1>
        <button className="auth-button" onClick={handleOwnerAuth}>
          영환 인증
        </button>
      </div>

      <p>🌟 현재 트리에 남겨진 편지 개수: {letters.length}</p>

      {/* decorations를 TreeCanvas에 넘기면, index 기반으로 positions 배치 */}
      <TreeCanvas decorations={decorations} />

      <div className="button-container">
        <button className="decorate-button" onClick={openForm}>
          트리 꾸며주기
        </button>
      </div>

      {showForm && (
        <OrnamentForm onClose={closeForm} onSubmit={handleAddDecoration} />
      )}

      <div className="letters-info">
        <h2>🎁 편지를 남긴 사람들:</h2>
        {letters.length === 0 ? (
          <p>아직 아무도 편지를 남기지 않았어요!</p>
        ) : (
          <ul>
            {letters.map((item, index) => (
              <li key={index}>{item.nickname}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
