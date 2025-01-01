import React, { useState, useEffect, useRef } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  React.useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

export const useIsMountedRef = () => {
  const isMountedRef = useRef<boolean | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
};

export const makeRandom = (min_val?: number, max_val?: number) => {
  const min =
    ([0].includes(min_val ?? 0) ? 0 : (min_val ?? 0) > 0 ? 1 : null) ||
    1000000000000000000;
  const max = max_val || 99999999999999999999;
  //@ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'string'. Type 'number' is not assignable to type 'string'.
  const value = Math.random() * (max - parseInt(min)) + parseInt(min);
  return parseInt(value.toFixed(0));
};

export const nFormatter = (
  isMountRef: React.MutableRefObject<boolean | null>,
  num: number
) => {
  const unitlist = ["", "K", "M", "G"];
  if (!isMountRef || !isMountRef.current) return "0";
  if (typeof num === "number") {
    const sign = Math.sign(num);
    let unit = 0;

    while (Math.abs(num) > 1000) {
      unit = unit + 1;
      num = Math.floor(Math.abs(num) / 100) / 10;
    }
    return `${sign * Math.abs(num)}${unitlist[unit]}`;
  } else {
    return "0";
  }
};

export const useRefDimensions = (ref: React.RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (ref) {
      if (ref.current) {
        const { current } = ref;
        const boundingRect = current.getBoundingClientRect();
        const { width, height } = boundingRect;
        setDimensions({ width: Math.round(width), height: Math.round(height) });
      }
    }
  }, [ref]);
  return dimensions;
};

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e: MouseEvent) =>
      setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};
