import { useEffect, useRef } from "react";

const useInterval = <T extends Function>(callback: T, delay: number, stop: boolean) => {
  const callbackRef = useRef<T | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // ssr support
    if (typeof window === "undefined") return () => {};
    if (stop) return () => {};

    const timer = setInterval(() => callbackRef.current && callbackRef.current(), delay);

    return () => clearTimeout(timer);
  }, [delay, stop]);
};

export default useInterval;
