import { useState } from "react";

export const useDefault = (defaultValue) => {
  const [state, setState] = useState(defaultValue);

  const setValue = (newValue) => {
    if (newValue === undefined || newValue === null) {
      setState(defaultValue);
    } else {
      setState(newValue);
    }
  };
  return [state, setValue];
};
