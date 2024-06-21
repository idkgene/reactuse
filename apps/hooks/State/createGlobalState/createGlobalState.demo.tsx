'use client';
import React from 'react';
import { createGlobalState } from './createGlobalState';

const useGlobalState = createGlobalState({
  value1: 'Banana',
  value2: 'Cherry',
  value3: 'Apple',
});

const Demo: React.FC = () => {
  const [state, setState] = useGlobalState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="bg-[#161618] p-[2em] relative mb-[10px] rounded-[8px] transition-colors">
      <p className="text-[rgba(235,235,245,.6)] absolute top-0 right-[10px] text-[12px] font-medium transition-colors leading-[28px] my-[.5rem]">
        <a
          href="#"
          target="_blank"
          className="font-medium text-underline underline-offset-2 transition-colors text-[#44bd87]"
        >
          source
        </a>
      </p>
      <div>
        <input
          type="text"
          name="value1"
          className="block text-[.9rem] pt-[.5em] px-[1em] pb-[.4em] border border-solid border-[#2e2e32] rounded outline-none bg-[#1b1b1f] max-w-[20rem] my-[.5rem]"
          value={state.value1}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="value2"
          value={state.value2}
          className="block text-[.9rem] pt-[.5em] px-[1em] pb-[.4em] border border-solid border-[#2e2e32] rounded outline-none bg-[#1b1b1f] max-w-[20rem] my-[.5rem]"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="value3"
          className="block text-[.9rem] pt-[.5em] px-[1em] pb-[.4em] border border-solid border-[#2e2e32] rounded outline-none bg-[#1b1b1f] max-w-[20rem] my-[.5rem]"
          value={state.value3}
          onChange={handleInputChange}
        />
        <pre className="overflow-auto opacity-80">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const CreateGlobalStateDemoPage: React.FC = () => {
  return (
    <div className="p-[2em] relative mb-[10px] rounded-[8px] transition-colors"></div>
  );
};

export default CreateGlobalStateDemoPage;
