import React, { useEffect, useState } from 'react';
import './OwnerView.css';

function OwnerView() {
  const [letters, setLetters] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 오너 비밀번호 체크 -> sessionStorage 사용(임시)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('treeOwnerAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadLetters();
    }
  }, []);

  const loadLetters = () => {
    fetch('https://chrismastree.onrender.com/api/owner-letters')
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch((err) => console.error(err));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://chrismastree.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      if (result.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('treeOwnerAuth', 'true');
        setError('');
        loadLetters();
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('서버 통신 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('treeOwnerAuth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="owner-container">
        <h1>트리 주인 전용 페이지</h1>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="password-input"
            />
            <button type="submit" className="login-button">확인</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="owner-container">
      <h1>트리 주인 전용 페이지</h1>
      <button onClick={handleLogout} className="logout-button">로그아웃</button>
      <h2>아래는 트리에 남긴 편지 목록입니다.</h2>
      <div className="letters-list">
        {letters.length === 0 ? (
          <p>아직 아무도 편지를 남기지 않았습니다.</p>
        ) : (
          letters.map((item, idx) => (
            <div key={idx} className="letter-item">
              <h3>보낸 사람: {item.nickname}</h3>
              <p>{item.letter}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OwnerView;
