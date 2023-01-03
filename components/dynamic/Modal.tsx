//*===========================*//
//*==<([ MODAL CONTAINER ])>==*//
//*===========================*//

import { FC, ReactElement, ReactNode } from "react";

//  This is a pop-up modal with an outer shell to darken the background and serve as a clickable element to
//  close the modal (instead of using a click event on the document behind it). This is so that 'useState' and
//  'useEffect' aren't needed at all while being able to destroy itself when closed instead of using 'display:
//  none' or other methods which just hide the component.

//  If the shell element should be removed and it is necessary to close the modal if it is clicked on outside
//  of this component, 'useEffect' should be used:
//
//  useEffect(() => {
//    if(activate === true) {
//      document.getElementById('layout').addEventListener('click', () => {
//        close();
//      });
//    }
//  })

//  All elements overlay the content behind it so it does not need to be put at the end of the document, though
//  it is still recommended.

//  There are several customization options available, though many more need to be tested and implemented. There
//  will be styles through an object to move certain options to here with JS instead of CSS in the 'settings'
//  object.

interface Props {
  children: ReactNode;
  activate: Boolean;
  setActivate: (activate: boolean) => void;
  size?: 'small' | 'medium' | 'large' | string | undefined;
  closeButton?: ReactElement | undefined;
  classes?: {
    modal?: string;
    title?: string;
  };
  labels?: {
    title?: string;
    id: string;
  };
  opts?: {
    addSpace?: boolean;
    scroll?: boolean;
    border?: 'none' | 'thin' | boolean;
    blankSlate?: boolean;
    blur: boolean;
  };
}

const Modal: FC<Props> = ({
  children,
  activate,
  setActivate,
  labels,
  size,
  closeButton,
  classes,
  opts
}) => {

// Set 'wrapper' & 'outer' wrapper parameters
let active = activate ? ' active' : '';

const { title, id } = labels;
const { addSpace, scroll, border, blankSlate, blur } = opts;

size = size==='md' || size==='medium'
  ? 'md'
: size==='lg' || size==='large'
  ? 'lg'
: size==='sm' || size==='small'
  ? 'sm'
  : '';

const spacing = addSpace === true
  ? ' add-space'
: 'more'
  ? ' add-more-space'
: 'less'
  ? 'add-less-space'
  : '';

// Add custom modal 'container' classes
const modalClasses = classes.modal ? ' '+classes.modal : '';
// Add additional Title classes
const titleClasses = classes.title ? ' '+classes.title : '';

// If 'blankSlate' is true, the modal wrapper will not be stylized, the border
// styles will be determined by custom classes for the additional modal classes.
const removeStyles = blankSlate === true ? ' no-style' : '';
// Make content scrollable by default
const scrollable = scroll !== false ? ' scroll' : '';
// Border options
const borderStyle = border === false || border === 'none'
    ? ' no-border'
  : border === 'thin' 
    ? ' thin-border'
    : '';

// Custom inner-wrapper ('container') classes
const containerClasses = modalClasses+removeStyles+borderStyle;


// Setting 'blur' to true will blur the background behind the modal.
const blurBkg = blur ? ' blur-background' : '';

// Close function so that multiple events can happen on closing the modal.
const close = () => {
  setActivate(!activate);
}

// Close button element to be used if no close button is added to the component.
// Setting 'closeButton' to false will completely remove this feature and the
// modal will only close if the user selects an area outside the modal component.
const CloseButton = () => {
  return (
    <div className="modal-close_container disable-highlight">
      <div role="button" onClick={ () => close() } className="modal-close" id="modal-close" aria-label="Close">&times;</div>
    </div>
  )
}

// This class is used when a title is added to push the children down 70px to
// compensate for the space added when the title is used.
const titlePush = title ? ' modal-title_push' : ' no-title';

// Modal settings
const settings = {
  id: id ? '-'+id : null,
  outerClasses: "modal-outer darken-content"+blurBkg+active,
  outerStyle: {},
  wrapStyle: {},
  containerClasses: "modal-container"+containerClasses+scrollable,
  innerStyle: {},
  titleClasses: "modal-title"+titleClasses+borderStyle,
  contentClasses: "modal-content"+titlePush+spacing,
}

return (<>
  {activate ? <>
    <div className={settings.outerClasses+size} onClick={() => close()}>
    </div>
    <div className="modal-wrapper"
      onClick={(e) => e.stopPropagation()}
      aria-hidden={activate ? false : true}
      data-modal-open={activate ? true : false}
      id={"modal"+id}>
      { closeButton ? closeButton : closeButton === undefined ? <></> : <CloseButton /> }
      <div className={settings.containerClasses+size} id="modal-container">
        <div className={settings.contentClasses}>
          { title ?
            <header className={settings.titleClasses}>
              { title }
            </header> : <></> }
          { children ?
            <div className={'modal-children'}>
              { children }
            </div> : <></> }
        </div>
      </div>
    </div>
  </>:<></>}
</>)
}

export default Modal;


/*=============================================================================================================*/

///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\////
/// HOW TO USE THE 'MODAL' COMPONENT ///
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\////



//==========================//
//=<([ TITLE + CHILDREN ])>=//
//==========================//

//   The title and children are both optional (of course children is recommended) and may be
//   strings/numbers or elements. Ideally an element for 'children' and string for the 'title'.

//   The height of the title is 70px and when there is a title the children element is pushed
//   down by 70px to keep the content in children centered vertically.

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


//======================//
//=<([ CLOSE BUTTON ])>=//
//======================//

//   The close button performs the same operation to close the modal as clicking the background.
//   It is able to be imported so that custom actions and styles can be applied. 


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


//=================================//
//=<([ ACTIVATE + SET ACTIVATE ])>=//
//=================================//

//   Activate and Set Activate are taken from a getter and setter wherever the component is being
//   used. This should be set to 'false' if the modal needs to be closed when the page loads or set
//   to 'true' if the modal needs to be activate when the page loads.


//=============================================================================================================//