'use client';

import React from 'react';
import { useEyeDropper } from './use-eye-dropper';

function UseEyeDropperDemo() {
  const { isSupported, sRGBHex, open } = useEyeDropper();

  const handleClick = async () => {
    const result = await open();
    console.log(result);
  };

  return (
    <div>
      <p>EyeDropper is {isSupported ? 'supported' : 'not supported'}</p>
      <p>
        Current color: <span style={{ color: sRGBHex }}>{sRGBHex}</span>
      </p>
      <button onClick={handleClick}>Open EyeDropper</button>
    </div>
  );
}

export default UseEyeDropperDemo;
