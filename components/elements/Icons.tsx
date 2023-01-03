import { checkType, checkTypeof, fileName, unFileName } from "../../utils/validation";
import { MouseEvent, ReactElement } from "react";
import Link from "next/link";

import * as Unicons from '@iconscout/react-unicons';
import { capitalize } from "../../utils/generator";

import 'material-icons/iconfont/material-icons.css';


interface MiProps {
  icon: string,
  name?: string,
  classes?: string,
  url?: string,
  useButton?: boolean,
  navColsTotal?: number | false,
  linkClasses?: string,
  alt?: string,
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
}

export const MiCon = (props: MiProps) => {

  let {icon, name, classes, url, useButton, navColsTotal, linkClasses, alt, onClick} = props;

  linkClasses = linkClasses ? linkClasses : null;
  useButton = useButton === true ? true : false;
  navColsTotal = navColsTotal ? navColsTotal : false;
  alt = !alt && name ? name : alt ? alt : 'Site Icon';

  if(navColsTotal && !checkType(navColsTotal, 'number')) {
    console.warn(
      "Must set 'navColsTotal' to a number! This feature has been disabled. "+
      "('navColsTotal' is a "+checkTypeof(navColsTotal,'number').type)+")"
  }

  navColsTotal = checkType(navColsTotal, 'number') ? (12 / Number(navColsTotal)) : false;

  const micon = navColsTotal ?
    <div className={"col s" + navColsTotal + " micon-col"}>
      <span
        onClick={onClick && useButton === false ? onClick : null}
        aria-label={!url ? alt : null}
        className={"material-icons "+(classes?'micon '+classes:'micon')}>
        { icon ? icon : 'person' }
      </span>
    </div> :
    <span
      onClick={onClick && useButton === false ? onClick : null}
      aria-label={!url ? alt : null}
      className={"material-icons "+(classes?'micon '+classes:'micon')}>
      { icon ? icon : 'person' }
    </span>

const iconLink = url === 'void' || url === 'js' || url === '#' || url === 'javascript:void(0)'
    ? <a href={onClick ? null : "#"} className={linkClasses} aria-label={alt}>{ micon }</a>
    : <Link href={url} className={linkClasses} aria-label={alt}>{ micon }</Link>
  
  const output = (micon: ReactElement): JSX.Element => {
    return useButton === true ?
      <button name={name}
        onClick={onClick?onClick:null}
        color="inherit"
        className={"btn-floating micon-link mi-"+fileName(name)}
      >{ micon }</button> : micon }

  return url ? output(iconLink) : output(micon);

}


export const SvgIcon = (
  name: 'help' | undefined,
) => {
  const Path = () => {
    switch(name) {
      case 'help':
        return <path d="M7 1C3.74 1 1 3.77 1 7c0 3.26 2.77 6 6 6 3.27 0 6-2.73 6-6s-2.73-6-6-6Zm1.06 9.06c-.02.63-.48 1.02-1.1
        1-.57-.02-1.03-.43-1.01-1.06.02-.63.5-1.04 1.08-1.02.6.02 1.05.45 1.03 1.08Zm.73-3.07-.47.3c-.2.15-.36.36-.44.6a3.6
        3.6 0 0 0-.08.65c0 .04-.03.14-.16.14h-1.4c-.14 0-.16-.09-.16-.13-.01-.5.11-.99.36-1.42A4.6 4.6 0 0 1 7.7
        6.07c.15-.1.21-.21.3-.33.18-.2.28-.47.28-.74.01-.67-.53-1.14-1.18-1.14-.9 0-1.18.7-1.18 1.46H4.2c0-1.17.31-1.92.98-2.36a3.5
        3.5 0 0 1 1.83-.44c.88 0 1.58.16 2.2.62.58.42.88 1.02.88 1.82 0 .5-.17.9-.43 1.24-.15.2-.44.47-.86.79h-.01Z"></path>
      default:
        return <></>
    }
  }
  return (<>
    <svg aria-hidden="true" className="va-text-bottom svg-icon iconHelpSm" width="14" height="14" viewBox="0 0 14 14">
      <Path />
    </svg>
  </>)
}

export const UIcons = (name: string) => {
  const iconName = 'Uil'+ capitalize(name);
  // const uni = Unicons[iconName]
  return Unicons;
}