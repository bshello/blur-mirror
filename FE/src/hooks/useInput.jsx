import { useState } from "react";

export const useInput = (initialVal) => {
  const [val, setVal] = useState(initialVal);
  const handleChange = (e) => {
    e.preventDefault();
    setVal(e.target.value);
  };

  return [val, handleChange];
};
