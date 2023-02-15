import { useCallback, useEffect, useState } from "react";

const useShowScrollIndicator = (scrollPercentage = 15) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const handleScroll = useCallback(() => {
    const hasScroll =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;
    if (!hasScroll) return;
    const maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setShowScrollIndicator(
      document.documentElement.scrollTop >= maxScroll * (scrollPercentage / 100)
    );
  }, [setShowScrollIndicator, scrollPercentage]);

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll);

    return () => window?.removeEventListener("scroll", handleScroll);
  }, []);

  return showScrollIndicator;
};

export default useShowScrollIndicator;
