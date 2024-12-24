import React, { useState } from 'react';
import './OrnamentForm.css';

const context = require.context('../assets', false, /\.png$/);
const ornamentList = context
  .keys()
  .filter((key) => !key.includes('tree.png'))
  .map((key, index) => ({
    id: index + 1,
    src: context(key),
  }));

function OrnamentForm({ onClose, onSubmit }) {
  const [nickname, setNickname] = useState('');
  const [letter, setLetter] = useState('');
  const [selectedOrnament, setSelectedOrnament] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !letter || !selectedOrnament) {
      alert('닉네임, 편지, 오브제를 모두 입력/선택해 주세요!');
      return;
    }

    onSubmit({
      nickname,
      letter,
      ornamentSrc: selectedOrnament,
    });
    onClose();
  };

  return (
    <div className="ornament-form-backdrop">
      <div className="ornament-form-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>크리스마스 트리를 꾸며보세요!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예) 메리, 해피, 산타..."
            />
          </div>
          <div className="form-row">
            <label>편지 내용</label>
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              placeholder="트리 주인에게 전하고 싶은 말을 적어주세요!"
            />
          </div>
          <div className="form-row">
            <label>오브제 선택</label>
            <div className="ornament-list">
              {ornamentList.map((ornament) => (
                <div key={ornament.id} className="ornament-item">
                  <input
                    type="radio"
                    name="ornament"
                    id={`ornament-${ornament.id}`}
                    value={ornament.src}
                    onChange={() => setSelectedOrnament(ornament.src)}
                  />
                  <label htmlFor={`ornament-${ornament.id}`}>
                    <img
                      src={ornament.src}
                      alt="ornament"
                      className="ornament-preview"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-button">
            장식 달기
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrnamentForm;
