'use client';

import { createGlobalState } from './create-global-state';

const useGlobalState = createGlobalState({
  value1: 'Banana',
  value2: 'Cherry',
  value3: 'Apple',
});

const Demo: React.FC = () => {
  const [state, setState] = useGlobalState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="relative mb-[10px] rounded-[8px] transition-colors">
      <div>
        <input
          type="text"
          name="value1"
          className="my-[.5rem] block max-w-[20rem] rounded border border-solid border-[#2e2e32] bg-[#1b1b1f] px-[1em] pb-[.4em] pt-[.5em] text-[.9rem] outline-none"
          value={state.value1}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="value2"
          value={state.value2}
          className="my-[.5rem] block max-w-[20rem] rounded border border-solid border-[#2e2e32] bg-[#1b1b1f] px-[1em] pb-[.4em] pt-[.5em] text-[.9rem] outline-none"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="value3"
          className="my-[.5rem] block max-w-[20rem] rounded border border-solid border-[#2e2e32] bg-[#1b1b1f] px-[1em] pb-[.4em] pt-[.5em] text-[.9rem] outline-none"
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
    <div className="relative mb-[10px] rounded-[8px] p-[2em] transition-colors">
      <Demo />
    </div>
  );
};

export default CreateGlobalStateDemoPage;
