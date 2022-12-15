import { useState } from "react";

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  // This function is triggered when the user scroll
  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const containerHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;

    const scrollTop = event.currentTarget.scrollTop;
    setProgress(((scrollTop + containerHeight) / scrollHeight) * 100);
  };

  return {
    scrollHandler: scrollHandler,
    progress: progress
  };
}

export default useScrollProgress;