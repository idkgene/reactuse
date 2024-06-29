'use client';

import React, { useEffect, useState } from 'react';
import usePaint from './use-paint';

function PaintDemo(): JSX.Element {
  const [
    canvasRef,
    {
      startDrawing,
      draw,
      stopDrawing,
      clear,
      undo,
      download,
      setLineWidth,
      setStrokeStyle,
      setSmoothingFactor,
      setOpacity,
    },
  ] = usePaint();

  const [lineWidth, setLineWidthState] = useState(2);
  const [strokeStyle, setStrokeStyleState] = useState('#000000');
  const [smoothing, setSmoothingState] = useState(0.5);
  const [opacity, setOpacityState] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 800;
      canvas.height = 600;
    }
  }, [canvasRef]);

  const handleLineWidthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = Number(e.target.value);
    setLineWidthState(value);
    setLineWidth(value);
  };

  const handleStrokeStyleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setStrokeStyleState(e.target.value);
    setStrokeStyle(e.target.value);
  };

  const handleSmoothingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = Number(e.target.value);
    setSmoothingState(value);
    setSmoothingFactor(value);
  };

  const handleOpacityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = Number(e.target.value);
    setOpacityState(value);
    setOpacity(value);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: '1px solid black' }}
      />
      <div>
        <button type="button" onClick={clear}>
          Clear
        </button>
        <button type="button" onClick={undo}>
          Undo
        </button>
        <button type="button" onClick={download}>
          Download
        </button>
      </div>
      <div>
        <label>
          Line Width:
          <input
            type="range"
            min="1"
            max="50"
            value={lineWidth}
            onChange={handleLineWidthChange}
          />
          {lineWidth}
        </label>
      </div>
      <div>
        <label>
          Color:
          <input
            type="color"
            value={strokeStyle}
            onChange={handleStrokeStyleChange}
          />
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
            value={smoothing}
            onChange={handleSmoothingChange}
          />
          {smoothing}
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
            value={opacity}
            onChange={handleOpacityChange}
          />
          {opacity}
        </label>
      </div>
    </div>
  );
}

export default PaintDemo;
