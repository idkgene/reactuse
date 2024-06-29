'use client';

import { useStyleTag } from './useStyleTag';

function StyleTagDemo() {
  const { css, setCss, isLoaded } = useStyleTag('.foo { margin-top: 32px; }');

  // You can update the CSS dynamically
  const updateCss = () => {
    setCss('.foo { margin-top: 64px; }');
  };

  return (
    <div>
      <p className="foo">CSS loaded: {isLoaded ? 'Yes' : 'No'}</p>
      <button onClick={updateCss}>Update CSS</button>
    </div>
  );
}

export default StyleTagDemo;
