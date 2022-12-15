import { scrollToTop, handleScrollClasses, getScrollPosition } from "../../utils/useWindow";

const BackToTop = () => {
  handleScrollClasses("back-to-top",["show-on","show-off"])
  // console.log(getScrollPosition());
  return (
    <div onClick={scrollToTop} className="back-to-top disable-highlight show-off" id="back-to-top">
        BACK TO TOP
    </div>
  )
}

export default BackToTop;