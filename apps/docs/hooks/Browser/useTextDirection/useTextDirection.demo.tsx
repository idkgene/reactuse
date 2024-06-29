'use client';

import { useTextDirection } from './useTextDirection';

function TextDirectionDemo() {
  const [direction, setDirection] = useTextDirection({
    observe: true,
    selector: 'p',
  });

  return (
    <div>
        <p>Current text direction: {direction}</p>
        <button onClick={() => { setDirection('ltr'); }}>Set LTR</button>
        <button onClick={() => { setDirection('rtl'); }}>Set RTL</button>
        <button onClick={() => { setDirection('auto'); }}>Set Auto</button>
      </div>
  );
}

export default TextDirectionDemo;
