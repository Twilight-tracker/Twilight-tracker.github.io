import { useEffect, useState } from "react";

export function useScrollToTop({ containerId, behavior }) {
  const [showButton, setShowButton] = useState(false);
  const scrollMethod = () => {
    const scrollParameters = { top: 0, left: 0, behavior: behavior };
    if (containerId) {
      document.getElementById(containerId).scrollTo(scrollParameters);
    } else {
      window.scrollTo(scrollParameters);
    }
  };

  useEffect(() => {
    if (containerId) {
      const container = document.getElementById(containerId);
      const handleScrollToTop = (event) => {
        setShowButton(event.target.scrollTop > 300);
      };
      container.addEventListener("scroll", handleScrollToTop);
      return () => {
        container.removeEventListener("scroll", handleScrollToTop);
      };
    } else {
      const handleScrollToTop = () => {
        setShowButton(window.scrollY > 300);
      };
      window.addEventListener("scroll", handleScrollToTop);
      return () => {
        window.removeEventListener("scroll", handleScrollToTop);
      };
    }
  }, [containerId]);
  return [showButton, scrollMethod];
}
