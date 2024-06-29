'use client';

import React from 'react';
import useAccelerometer from './use-accelerometer';

const AccelerometerDemo: React.FC = () => {
  const { acceleration, error, isSupported } = useAccelerometer();

  if (!isSupported) {
    return <div>Accelerometer is not supported on this device.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { x, y, z } = acceleration || { x: 0, y: 0, z: 0 };

  const boxStyle: React.CSSProperties = {
    width: '200px',
    height: '200px',
    backgroundColor: 'lightblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: `rotateX(${y * 20}deg) rotateY(${x * 20}deg)`,
    transition: 'transform 0.2s',
    perspective: '1000px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={boxStyle}>
        <div style={textStyle}>
          <div>X: {x.toFixed(2)}</div>
          <div>Y: {y.toFixed(2)}</div>
          <div>Z: {z.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default AccelerometerDemo;
