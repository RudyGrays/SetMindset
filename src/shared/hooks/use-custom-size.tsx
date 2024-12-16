import * as React from "react";

export function useCustomSize(value: number) {
  const [isLess, setIsLess] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${value - 1}px)`);
    const onChange = () => {
      setIsLess(window.innerWidth < value);
    };
    mql.addEventListener("change", onChange);
    setIsLess(window.innerWidth < value);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isLess;
}
