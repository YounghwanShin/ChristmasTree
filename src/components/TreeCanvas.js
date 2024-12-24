import React, { useState, useRef, useEffect } from 'react';
import './TreeCanvas.css';
import treeImage from '../assets/tree.png';

const MAX_ITEMS_PER_PAGE = 10;

function TreeCanvas({ decorations }) {
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 트리 이미지를 참조할 ref (실제 폭/높이 파악용)
  const treeCanvasRef = useRef(null);

  // 장식품을 배치할 좌표 목록
  const [positions, setPositions] = useState([]);

  // 총 페이지 수
  const totalPages = Math.ceil(decorations.length / MAX_ITEMS_PER_PAGE);

  // 윈도우 리사이즈 시에도 이미지 실제 크기에 맞춰 좌표 다시 계산
  useEffect(() => {
    function updatePositions() {
      const treeImg = treeCanvasRef.current;
      if (!treeImg) return;

      const { width, height } = treeImg.getBoundingClientRect();

      // 트리 이미지 비율에 맞춰 좌표를 계산
      const newPositions = [
        { x: width * 0.5, y: height * 0.2 },
        { x: width * 0.4, y: height * 0.35 },
        { x: width * 0.6, y: height * 0.35 },
        { x: width * 0.3, y: height * 0.5 },
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.7, y: height * 0.5 },
        { x: width * 0.3, y: height * 0.65 },
        { x: width * 0.5, y: height * 0.65 },
        { x: width * 0.7, y: height * 0.65 },
        { x: width * 0.5, y: height * 0.8 },
      ];

      setPositions(newPositions);
    }

    // 초기 렌더 시 좌표 계산
    updatePositions();

    // 창 크기 바뀔 때마다 좌표 재계산
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // 현재 페이지에 해당하는 장식품들만 잘라서 사용
  const currentDecorations = decorations.slice(
    (currentPage - 1) * MAX_ITEMS_PER_PAGE,
    currentPage * MAX_ITEMS_PER_PAGE
  );

  return (
    <div className="tree-canvas-wrapper">
      {/* 왼쪽 페이지 넘김 버튼 */}
      <button
        className={`nav-button left ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        ‹
      </button>

      <div className="tree-canvas">
        <img
          ref={treeCanvasRef}
          src={treeImage}
          alt="크리스마스 트리"
          className="tree-image"
        />

        {/* 계산된 positions에 맞춰 장식품 배치 */}
        {currentDecorations.map((dec, index) => {
          const pos = positions[index];
          if (!pos) return null; // 혹시 positions가 부족하면 skip

          return (
            <div
              key={index}
              className="decoration-wrapper"
              style={{
                top: pos.y,
                left: pos.x,
              }}
            >
              <img
                src={dec.ornamentSrc}
                alt="ornament"
                className="ornament-img"
              />
              <div className="nickname">{dec.nickname}</div>
            </div>
          );
        })}
      </div>

      {/* 오른쪽 페이지 넘김 버튼 */}
      <button
        className={`nav-button right ${
          currentPage === totalPages ? 'disabled' : ''
        }`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        ›
      </button>
    </div>
  );
}

export default TreeCanvas;
