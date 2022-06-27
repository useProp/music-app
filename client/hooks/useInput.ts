import React, {useState} from "react";


export const useInput = (inputValue) => {
  const [value, setValue] = useState(inputValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return {
    value, onChange
  }
}
