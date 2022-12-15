import { Children, useState } from "react";
import Panel from "./Panel";

const PanelSlide = ( children, imageUrlArray, slideColor, panelClasses, panelContainerClasses, panelStyles, fullHeight ) => {

  const [slideIndex, setSlideIndex] = useState(0);
  const slidesLength = imageUrlArray.length ? imageUrlArray.length  : 0;

  const slideStyleProps = {
    backgroundColor: slideColor?slideColor:'#FFFFFF'
  }

  return(
    <div className="panel-slide_container" style={slideStyleProps}>
      <Panel
        fullSize={true}
        bkgColor={bkgColor?bkgColor:null}
        bkgImg={imageUrlArray[slideIndex]}
        fullHeight={fullHeight?fullHeight:true}
        classes={panelClasses}
        containerClasses={panelContainerClasses?panelContainerClasses:null}
        styles={panelStyles?panelStyles:null} />
      { children }
    </div>
  )
}