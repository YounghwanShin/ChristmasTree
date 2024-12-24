/**
 * src/components/TreeCanvas.jsx
 * - decorations 객체를 받아옴 (이미 서버 쿼에서 id 오름차순 정렬)
 * - index 길포 positions로 위치 매핑
 * - 새로고침후도 decorations 순서가 동일해서, 위치가 유지됨
 */
import React, { useState, useRef, useEffect } from 'react';
import './TreeCanvas.css';
import treeImage from '../assets/tree.png';

const MAX_ITEMS_PER_PAGE = 10;

function TreeCanvas({ decorations }) {
  const [currentPage, setCurrentPage] = useState(1);

  // (옥션) 새로고침 후에도 사용자가 보던 페이지 번호 유지하고 싶다면:
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);
  // ↑ 이러해 하면, 새로고침 시에도 페이지가 유지됩니다.

  const treeCanvasRef = useRef(null);
  const [positions, setPositions] = useState([]);

  const totalPages = Math.ceil(decorations.length / MAX_ITEMS_PER_PAGE);

  // 트리 이미지 크기에 따라 positions를 계산
  useEffect(() => {
    function updatePositions() {
      const treeImg = treeCanvasRef.current;
      if (!treeImg) return;

      treeImg.onload = () => {
        const { width, height } = treeImg.getBoundingClientRect();

        // 페이지단 최대 10개 위치
        const newPositions = [
          { x: width * 0.5,  y: height * 0.15 },
          { x: width * 0.4,  y: height * 0.35 },
          { x: width * 0.6,  y: height * 0.35 },
          { x: width * 0.3,  y: height * 0.55 },
          { x: width * 0.5,  y: height * 0.55 },
          { x: width * 0.7,  y: height * 0.55 },
          { x: width * 0.20, y: height * 0.75 },
          { x: width * 0.40, y: height * 0.75 },
          { x: width * 0.60, y: height * 0.75 },
          { x: width * 0.80, y: height * 0.75 },
        ];

        setPositions(newPositions);
      };
    }

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // 현재 페이지의 decoration들만 (최대 10개)
  const currentDecorations = decorations.slice(
    (currentPage - 1) * MAX_ITEMS_PER_PAGE,
    currentPage * MAX_ITEMS_PER_PAGE
  );

  return (
    <div className="tree-canvas-wrapper">
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

        {currentDecorations.map((dec, index) => {
          // index 0~9
          const pos = positions[index];
          if (!pos) return null;

          return (
            <div
              key={dec.id}  // 고유 id를 key로
              className="decoration-wrapper"
              style={{
                top: pos.y,
                left: pos.x,
                // 필요하면 transform: translate(-50%, -50%);
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

      <button
        className={`nav-button right ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        ›
      </button>
    </div>
  );
}

export default TreeCanvas;
