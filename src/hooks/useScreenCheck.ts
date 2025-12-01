import { useEffect, useState } from "react";

const useScreenCheck = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isMobile = screenWidth <= 768;
  const isTablet = screenWidth <= 1024;
  const isDesktop = screenWidth >= 1024;

  return { isMobile, isTablet, isDesktop };
};

export default useScreenCheck;
