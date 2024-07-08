import { useState } from 'react';
import { useRound } from './use-round';

function UseRoundDemo() {
  const [inputValue, setInputValue] = useState('');
  const [roundedNumber, roundNumber] = useRound();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleRound = () => {
    const number = parseFloat(inputValue);
    if (!isNaN(number)) {
      roundNumber(number);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Round Number Demo</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />
      <button onClick={handleRound} style={{ marginLeft: '10px' }}>
        Round
      </button>
      <p>
        Rounded Number: <strong>{roundedNumber}</strong>
      </p>
    </div>
  );
}

export default UseRoundDemo;
