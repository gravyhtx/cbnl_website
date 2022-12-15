// https://react-glider.vercel.app/
import { useCallback, useRef, useEffect } from "react";
import ReactGlider from 'react-glider';

const AutoplayGlider = ({ children, hasDots, hasArrows, draggable, scrollLock, slidesToShow, slidesToScroll, contain }) => {

  hasDots = hasDots === false ? false : true;
  hasArrows = hasArrows === true ? true : false;
  draggable = draggable === false ? false : true;
  
  scrollLock = scrollLock === true ? true : false;
  slidesToShow = slidesToShow ? slidesToShow : 5;
  slidesToScroll = slidesToScroll ? slidesToScroll : 1;

  contain = contain === true ? true : false;

  const INTERVAL = 5000;
  const MAX = 11;

  const intervalRef = useRef(null);

  const callbackRef = useCallback((glider) => {
    if (glider) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          let index = glider.page;
          if (index < MAX) {
            index += 1;
          } else {
            index = 0;
          }
          glider.scrollItem(index, false);
        }, INTERVAL);
      }
    }
  }, []);

  useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
    []
  );

  return (
    <div className="container">
      <ReactGlider
        className="glider-container"
        draggable={draggable}
        hasArrows={hasArrows}
        hasDots={hasDots}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        scrollLock={scrollLock}
        ref={callbackRef}
      >
      { children }
      </ReactGlider>
    </div>
  );
}

export default AutoplayGlider;
