'use client';
import React from 'react';
import { usePreferredLanguages } from './usePreferredLanguages';

const PreferredLanguagesDemo: React.FC = () => {
  const languages = usePreferredLanguages();

  return (
    <div>
      <h2>Preferred Languages:</h2>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

export default PreferredLanguagesDemo;
