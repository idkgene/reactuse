'use client';
import React from 'react';
import { useShare } from './useShare';

const ShareDemo: React.FC = () => {
  const { isSupported, share } = useShare({
    title: 'Check out this article',
    url: 'https://www.example.com/article',
    files: [],
  });

  const handleShare = () => {
    share({
      text: 'This is a great article!',
      files: [],
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <p className="mb-4">
        {isSupported
          ? 'Web Share API is supported in this browser.'
          : 'Web Share API is not supported in this browser.'}
      </p>
      {isSupported && (
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Share
        </button>
      )}
    </div>
  );
};

export default ShareDemo;
