import React from 'react';

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="size-16 animate-spin rounded-full border-y-2 border-gray-900" />
    </div>
  );
}

export { Spinner };
