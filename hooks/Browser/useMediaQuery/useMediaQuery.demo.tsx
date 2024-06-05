import React from 'react';
import { useMediaQuery } from './useMediaQuery';

const UseMediaQueryDemo: React.FC = () => {
  const isWideScreen = useMediaQuery('(min-width: 768px)');

  return (
    <div
      style={{
        backgroundColor: isWideScreen ? 'lightblue' : 'lightgreen',
        padding: '1rem',
        color: 'white',
      }}
    >
      {isWideScreen ? 'Wide Screen' : 'Narrow Screen'}
    </div>
  );
};

export default UseMediaQueryDemo;
