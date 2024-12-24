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

  useEffect(() => {
    const storedDecorations = JSON.parse(localStorage.getItem('decorations')) || [];
    const storedLetters = JSON.parse(localStorage.getItem('letters')) || [];
    setDecorations(storedDecorations);
    setLetters(storedLetters);
  }, []);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleAddDecoration = (decoration) => {
    const predefinedPositions = [
      { x: 250, y: 80 },
      { x: 200, y: 150 },
      { x: 300, y: 150 },
      { x: 150, y: 250 },
      { x: 250, y: 250 },
      { x: 350, y: 250 },
      { x: 150, y: 350 },
      { x: 250, y: 350 },
      { x: 350, y: 350 },
      { x: 250, y: 450 },
    ];
  
    const position = predefinedPositions[decorations.length % 10];
    const newDecoration = {
      ornamentSrc: decoration.ornamentSrc,
      nickname: decoration.nickname,
      x: position.x,
      y: position.y,
    };
    
    const updatedDecorations = [...decorations, newDecoration];
    setDecorations(updatedDecorations);
    
    const newLetter = {
      nickname: decoration.nickname,
      letter: decoration.letter,
    };
    
    const updatedLetters = [...letters, newLetter];
    setLetters(updatedLetters);
    
    localStorage.setItem('decorations', JSON.stringify(updatedDecorations));
    localStorage.setItem('letters', JSON.stringify(updatedLetters));
  
    closeForm();
  };

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

      <TreeCanvas decorations={decorations} />

      <div className="button-container">
        <button className="decorate-button" onClick={openForm}>
          트리 꾸며주기
        </button>
      </div>

      {showForm && (
        <OrnamentForm
          onClose={closeForm}
          onSubmit={handleAddDecoration}
        />
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