import { ChangeEvent, useState } from "react";

// valueとonChangeを返すカスタムフック
export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
};