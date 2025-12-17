"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ScrollContextType {
  scrollValue: number;
  progress: number;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollValue: 0,
  progress: 0,
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const p = Math.min(y / window.innerHeight, 1);

      setProgress(p);
      setScrollValue(y);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <ScrollContext.Provider value={{ scrollValue, progress }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
