'use client';
import React from 'react';
import { useDocumentVisibility } from './useDocumentVisibility';
import Demo from '@/components/Common/Demo/demo';

const UseDocumentVisibilityDemo = () => {
  const visibilityState = useDocumentVisibility();

  return (
    <Demo href="#">
      <h1>Document Visibility State: {visibilityState}</h1>
    </Demo>
  );
};

export default UseDocumentVisibilityDemo;
