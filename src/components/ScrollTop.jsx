import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This forces the window to jump to the top left corner (0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // This triggers every time the URL path changes

  return null;
}