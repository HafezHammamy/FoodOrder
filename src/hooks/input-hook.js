import { useState } from "react";

const useInput = (validation) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validation(inputValue);
  const hasErrors = !isValid && isTouched;

  const onInputChangeValue = (event) => {
    setIsTouched(true);
    setInputValue(event.target.value);
  };
  const onInputBlurHandler = () => {
    setIsTouched(true);
  };
  return {
    inputValue,
    onInputChangeValue,
    onInputBlurHandler,
    isValid,
    hasErrors,
  };
};

export default useInput;
