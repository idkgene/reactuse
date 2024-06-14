import * as React from 'react';

import { useTrunc } from './useTrunc';

const UseTruncDemo = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [truncatedValue, truncateNumber] = useTrunc();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    truncateNumber(Number(inputValue));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input">Enter a number:</label>
          <input
            type="text"
            name="input"
            id="input"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Truncate</button>
        </form>
        <p>Trunctaed value: {truncatedValue}</p>
      </div>
    </>
  );
};

export default UseTruncDemo;
