'use client';
import React from 'react';
import { useDevicePixelRatio } from './useDevicePixelRatio';

const UseDevicePixelRatioDemo = () => {
  const { pixelRatio } = useDevicePixelRatio();

  return (
    <div>
      <h1>Device Pixel Ratio</h1>
      <p>Device Pixel Ratio: {pixelRatio}</p>
    </div>
  );
};

export default UseDevicePixelRatioDemo;
