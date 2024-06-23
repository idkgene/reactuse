'use client';

import React, { useRef } from 'react';
import { usePaint } from './usePaint';

const PaintDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    startDrawing,
    draw,
    stopDrawing,
    clear,
    undo,
    changeBrushSize,
    changeBrushColor,
    changeOpacity,
    changeSmoothing,
    pencil,
    canUndo,
  } = usePaint(canvasRef);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>Paint Demo</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            style={{ border: '1px solid black' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
        <div>
          <h2>Controls</h2>
          <div>
            <label>
              Brush Size:
              <input
                type="range"
                min="1"
                max="50"
                value={pencil.width}
                onChange={(e) => changeBrushSize(Number(e.target.value))}
              />
              {pencil.width}px
            </label>
          </div>
          <div>
            <label>
              Brush Color:
              <input
                type="color"
                value={pencil.color}
                onChange={(e) => changeBrushColor(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Opacity:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={pencil.opacity}
                onChange={(e) => changeOpacity(Number(e.target.value))}
              />
              {pencil.opacity.toFixed(1)}
            </label>
          </div>
          <div>
            <label>
              Smoothing:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={pencil.smoothing}
                onChange={(e) => changeSmoothing(Number(e.target.value))}
              />
              {pencil.smoothing.toFixed(1)}
            </label>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button onClick={clear}>Clear</button>
            <button onClick={undo} disabled={!canUndo}>
              Undo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintDemo;
