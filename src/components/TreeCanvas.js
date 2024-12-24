import React, { useState, useRef, useEffect } from 'react';
import './TreeCanvas.css';
import treeImage from '../assets/tree.png';

const MAX_ITEMS_PER_PAGE = 10;

function TreeCanvas({ decorations }) {
  const [currentPage, setCurrentPage] = useState(1);

  const treeCanvasRef = useRef(null);

  const [positions, setPositions] = useState([]);

  const totalPages = Math.ceil(decorations.length / MAX_ITEMS_PER_PAGE);

  useEffect(() => {
    function updatePositions() {
      const treeImg = treeCanvasRef.current;
      if (!treeImg) return;

      const { width, height } = treeImg.getBoundingClientRect();

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

    updatePositions();

    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

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
          const pos = positions[index];
          if (!pos) return null; 

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
