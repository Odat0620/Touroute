import { ChangeEvent, useState } from "react";

// valueとonChangeを返すカスタムフック
export const useTextarea = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
  };
};