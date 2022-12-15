import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToPosition = () => {
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    const queryId = window.location.hash ? window.location.hash.substring(1) : "";
    const rootEl = document.getElementById('layout');
    const scrollEl = document.getElementById(queryId);
    const scrollPosition = () => {
    scrollEl
    ? scrollEl.scrollIntoView({ behavior: "smooth", block: "start" })
    : rootEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  setTimeout(() => {
    scrollPosition()},500);
  }, [path]);
  return null;
};

export default ScrollToPosition;