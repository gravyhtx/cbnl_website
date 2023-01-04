// https://react-glider.vercel.app/

import { useCallback, useRef, useEffect, FC, ReactNode } from "react";
import ReactGlider from 'react-glider';

import styles from './styles/glider.module.css';

interface Props {
  children?: ReactNode | undefined,
  hasDots?: boolean | undefined,
  hasArrows?: boolean | undefined,
  draggable?: boolean | undefined,
  scrollLock?: boolean | undefined,
  slidesToShow?: number | "auto" | undefined,
  slidesToScroll?: number | "auto" | undefined,
  contain?: boolean | undefined,
}

interface GliderProps extends Props {
  wrapperClasses?: string | undefined,
  perspective?: boolean | undefined,
  responsiveHeight?: boolean | undefined,
  exactWidth?: boolean | undefined,
  itemWidth?: number | undefined,
}

export const Glider: FC<GliderProps> = ({ children, wrapperClasses, hasDots, hasArrows, perspective, draggable, responsiveHeight,
  exactWidth, itemWidth, scrollLock, slidesToShow, slidesToScroll, contain }) => {

  hasDots = hasDots === true ? true : false;
  hasArrows = hasArrows === true ? true : false;
  draggable = draggable === false ? false : true;

  responsiveHeight = responsiveHeight === false ? false : true;
  exactWidth = exactWidth === true ? true : itemWidth && !exactWidth ? true : false;
  
  scrollLock = scrollLock === true ? true : false;
  slidesToShow = slidesToShow ? slidesToShow : perspective && !slidesToShow && !itemWidth ? 5
    : !slidesToShow && itemWidth ? "auto" : 1;
  slidesToScroll = slidesToScroll ? slidesToScroll : 1;

  const container = contain === true ? "container" : "";
  wrapperClasses = wrapperClasses ? " "+wrapperClasses+" " : "";

  const containerClassName = container + wrapperClasses + styles.wrapper;
  const containerStyles = responsiveHeight === true
    ? styles.container+" "+styles.responsive
    : styles.container
  const gliderClasses = containerStyles + (perspective ? " glider-perspective" : " glider-container");

  // const containerHeight = 

  return (
    <div className={containerClassName}>
      <ReactGlider
        className={gliderClasses}
        draggable={draggable}
        hasArrows={hasArrows}
        hasDots={hasDots}
        scrollLock={scrollLock}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        exactWidth={exactWidth}
        itemWidth={itemWidth}
      >
      { children ? children : <div>&nbsp;</div> }
      </ReactGlider>
    </div>
  )
}

const AutoplayGlider: FC<Props> = ({ children, hasDots, hasArrows, draggable, scrollLock, slidesToShow, slidesToScroll, contain }) => {

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

  const callbackRef = useCallback((glider: any) => {
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
