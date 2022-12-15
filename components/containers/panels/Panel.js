import website from '../../../config/site-data.json';

const Panel = ( children, bkgColor, bkgImgUrl, colSize, fullsize, fullWidth, fullHeight, classes, containerClasses, styles )  => {

  // Background
  const panelBkgImg = bkgImgUrl ? `url(${bkgImgUrl})` : null;
  const panelBkgColor = bkgColor && typeof bkgColor === 'string' ? bkgColor  : 
    bkgColor === true && website.containerColor ? website.containerColor :
    '#000000';


  // Classes
  const panelContainerClasses = containerClasses+panelFullSize+col;
  containerClasses = containerClasses ? " "+containerClasses : "";
  const panelClasses = userClasses+imageClasses;

  const userClasses = classes ? " " + classes : "";

  const col = (colSize && !fullWidth && !fullsize) ? " col "+colSize : null;

  const panelFullSize =
    (fullWidth && fullHeight) || fullsize ? " full-size" :
    fullWidth && !fullHeight && !fullsize ? " full-width" :
    fullHeight && !fullWidth && !fullsize ? " full-height" :
    null;
  
  const imageClasses = bkgImgUrl ? " bkg-img" : "";

  const panelBackground = bkgColor && !panelBkgImg ?
    { backgroundColor: panelBkgColor } :
    panelBkgImg && !bkgColor ?
    { backgroundImage: panelBkgImg, backgroundPosition: "center" } :
    {};

  // Styles
  const panelStyles = {
    ...panelBackground,
    ...styles
  }

  
  return (
    <div className={"panel-container"+panelContainerClasses}>
      <div className={"panel"+panelClasses} style={panelStyles}>
        { children }
      </div>
    </div>
  )
}

export default Panel;