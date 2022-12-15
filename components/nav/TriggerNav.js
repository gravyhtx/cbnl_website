import SideNav from '../components/nav/SideNav';

import { checkType } from "../../utils/validation";
import website from '../../config/site-data.json';

import styles from './styles/NavHeader.module.css'
import { siteLogo } from '../elements/SiteImages';

const NavHeader = ({ sideNavTrigger, textColor, logo, background, darkMode, responsive, navLinks, useSideNav }) => {
  
  responsive = responsive === false ? false : true;
  sideNavTrigger = sideNavTrigger ? sideNavTrigger : false;
  logo = logo && logo !== true ? logo : logo === true ? siteLogo('logo', darkMode === true ? 'dark' : 'light') : false;

  const text = checkType(text, 'string') ? textColor : false ? '#00000000' : true;
  const backgroundColor = background === (false || 'transparent' || 'clear')
      ? 'transparent'
    : checkType(background, 'string')
      ? background
      : true;

  const headerBkg = () => {
    if(backgroundColor === true) {
      darkMode === true ? website.headerBkgColorDarkMode : website.headerBkgColor
    }
    return backgroundColor;
  }
  const headerText = () => {
    if(backgroundColor === true) {
      return darkMode === true ? website.headerTextColorDarkMode : website.headerTextColor
    }
    return textColor;
  }

  const navBarStyles = {
    background: headerBkg(),
    color: headerText()
  }

  const SideNavTrigger = () => {
    return (
      <div className={styles.trigger}>
        <button onClick={() => openSideNav()}>OPEN SIDENAV</button>
      </div>
    )
  }

  return (<>
    <div style={navBarStyles} className={styles.container}>
      { logo === false ? <></> : <div className={styles.siteLogo}>{logo}</div> }

      
    </div>
    { useSideNav ? <SideNav /> : <></> }
  </>)

}