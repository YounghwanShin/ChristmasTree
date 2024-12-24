import React, { useState } from 'react';
import './TreeCanvas.css';
import treeImage from '../assets/tree.png';

const MAX_ITEMS_PER_PAGE = 10;

function TreeCanvas({ decorations }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(decorations.length / MAX_ITEMS_PER_PAGE);

  const currentDecorations = decorations.slice(
    (currentPage - 1) * MAX_ITEMS_PER_PAGE,
    currentPage * MAX_ITEMS_PER_PAGE
  );

  const predefinedPositions = [
    { x: 250, y: 120 },   
    { x: 200, y: 200 },  
    { x: 300, y: 200 },  
    { x: 150, y: 270 },  
    { x: 250, y: 270 },  
    { x: 350, y: 270 },  
    { x: 150, y: 370 },  
    { x: 250, y: 370 },  
    { x: 350, y: 370 },  
    { x: 250, y: 470 },  
  ];

  return (
    <div className="tree-canvas-wrapper">
      <button
        className={`nav-button left ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        ‹
      </button>
      <div className="tree-canvas">
        <img src={treeImage} alt="크리스마스 트리" className="tree-image" />
        {currentDecorations.map((dec, index) => {
          const position = predefinedPositions[index];
          return (
            <div
              key={index}
              className="decoration-wrapper"
              style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
              }}
            >
              <img src={dec.ornamentSrc} alt="ornament" className="ornament-img" />
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