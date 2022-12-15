// https://react-glider.vercel.app/
import ReactGlider from 'react-glider';

import styles from './glider.module.css';

const Glider = ({ children, wrapperClasses, hasDots, hasArrows, perspective, draggable, responsiveHeight,
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

  contain = contain === true ? "container" : "";
  wrapperClasses = wrapperClasses ? " "+wrapperClasses+" " : "";

  const containerClassName = contain + wrapperClasses + styles.wrapper;
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

export default Glider;
