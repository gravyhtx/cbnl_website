import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  header?: string | ReactNode;
  attributes?: {
    headerClasses?: string;
    headerId?: string;
    containerClasses?: string;
    containerId?: string;
    textClasses?: string;
    textId?: string;
  }
  opts?: {
    border?: boolean;
    contain?: boolean;
    margin?: boolean;
  }
  fn?: {
    click?: () => any;
    change?: () => any;
    blur?: () => any;
  }
}


const TextContainer: FC<Props> = ({ children, header, attributes, opts, fn }) => {

  const {
    headerClasses,
    headerId,
    containerClasses,
    containerId,
    textClasses,
    textId
  } = attributes;

  const { border, contain, margin } = opts;
  const { click, change, blur } = fn;

  let cClass = containerClasses ? " "+containerClasses : "";
  let cId = containerId || "";
  let hId = headerId || "";
  let tId = textId || "";
  let hClass = headerClasses ? " "+headerClasses  : "";
  let tClass= textClasses ? " "+textClasses: "";
  let borders = border ? " borders" : "";
  let container = contain === undefined || contain === false ? "" : " contain";

  const handleClick = () =>  click();

  const handleChange = () => change();

  const handleBlur = () => blur();

  return (
    <div className={margin === false ? "text-container no-margin" : "text-container"}>
      <div
        onClick={click?handleClick:null}
        onChange={change?handleChange:null}
        onBlur={blur?handleBlur:null}
        className={"text-container box" + cClass + borders + container}
        id={cId}>
          {header ? <header className={"text-container_header"+hClass} id={hId}>{header}</header> : <></>}
          {children ? <div className={"text-container_text"+tClass} id={tId}>{children}</div> : <></>}
      </div>
    </div>
  )
}


////////////////////////////////
//-- TEXT-CONTAINER CLASSES --//
////////////////////////////////

// CONTAINER
//    Background: no-bkg, dark, light, dark-gradient
//    Box: padding, margin, no-margin/padding

// BORDERS
//    FX: thick, dark, shadow, glow
//    reverse

// HEADER:
//    dark, light, big, small, thick, thin, glow

// TEXT:
//    dark, light, dark-gradient


export default TextContainer;