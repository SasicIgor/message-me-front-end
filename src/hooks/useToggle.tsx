import { useCallback, useState } from "react";

const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);
  return [value, toggle] as const;
};

export default useToggle;
