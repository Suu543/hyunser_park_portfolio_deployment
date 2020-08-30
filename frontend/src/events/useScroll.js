import { useState, useEffect } from "react";

// Scroll을 움직이면 x, y 값을 추적
const useScroll = () => {
  const [state, setState] = useState({
    axisx: 0,
    axisy: 0,
  });

  const onScroll = () => {
    setState({ axisy: window.scrollY, axisx: window.scrollX });
  };

  useEffect(() => {
    // scroll 이벤트를 만들어줍니다. 스크롤을 움직일때 마다
    // onScroll 함수가 실행됩니다.

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
};

export default useScroll;
