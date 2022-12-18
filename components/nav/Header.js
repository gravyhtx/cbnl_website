import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import Notification from '../notify/Notification';
import NavLinks from './NavLinks';

import website from '../../config/site-data.json';

import styles from './styles/Header.module.css';
import navStyles from './styles/navHeader.module.css';

import logo from '../../public/logo-dark.png';
import mobileLogo from '../../public/logo-light.png';
import Contact from '../elements/Contact';

const Logo = () => {
  const logoAlt = "Site Logo"
  return (
    <Image src={logo}
      className={styles.logo}
      alt={logoAlt}
      sizes="100vw"
      fill />
  )
}

const MobileLogo = () => {
  const logoAlt = "Site Logo"
  return (
    <Image src={mobileLogo}
      className={styles.mobileLogo}
      alt={logoAlt}
      sizes="100vw"
      fill />
  )
}

export const NotificationBar = ({ notifyLink, helpLink }) => {

  notifyLink = website.notifyLink ? website.notifyLink : false;
  helpLink = website.helpLink ? website.helpLink : false;

  const phoneNumber = <Contact element='phone' />


  const notifyText = {
    "desktop": <>Welcome to Chackbay Nursery & Landscaping. Call us
      at {phoneNumber} to get started on your new project today!</>,
    "mobile": <>Call Us Now | {phoneNumber}</>,
  }

  const text = <>{isMobile ? notifyText.mobile : notifyText.desktop}</>

  const help = helpLink ?
    <span className="info-icon" id="info-icon">
      <Link href={helpLink}>
        <i className="material-icons info-icon">info_outline</i>
      </Link>
    </span> : <></>;

  return (<>
    {text ?
      <div className={styles.notificationBar+' disable-highlight'}>
        <Notification
          text={text?text:""}
          link={notifyLink}
          ext={helpLink ? help : undefined}
          extLink={helpLink ? helpLink : undefined} />
      </div> : <></>}
    </>)
}

export const Header = () => <Logo />

export const HomeHeader = ({ useHeaderImage, useNotification, useNavLinks }) => {
  const router = useRouter();
  const path = router.pathname;
  const isHome = path === '/' ? true : false;

  useHeaderImage = useHeaderImage === true ? true : false;
  useNavLinks = useNavLinks === false ? false : true;
  useNotification = useNotification === false ? false : true;

  return (<>
    <header className={styles.header} id="home-header">
      <div className={styles.navHome} id="header-container">
        { useHeaderImage ? 
          <div className={styles.navbarBrandContainer}>
            <Link className="navbar-brand container" href="/" id="header-link-container">
              <div className="header-img-container disable-highlight" id="header-img-container">
                <div className={
                  isHome === true
                  ? "header-img animate__animated animate__fadeInDown"
                  : "header-img" }>
                  <Header />
                </div>
              </div>
            </Link>
          </div>
          : <></> }
        { useNavLinks
          ? <div className={navStyles.links}>
              <NavLinks location='top' />
            </div>
          : <></>}
      </div>
    </header>
    { useNotification
      ? <NotificationBar />
      : <></>}
  </>)
}

export const BrandHeader = ({ useHeaderImage, useNavLinks, useNotification }) => {
  const router = useRouter();
  const path = router.pathname;
  const isHome = path === '/' ? true : false;

  useHeaderImage = useHeaderImage === false ? false : true;
  useNavLinks = useNavLinks === false ? false : true;
  useNotification = useNotification === false ? false : true;

  return (<>
    <header className={styles.header} id="brand-header">
      <div className={isHome === true ? styles.navHome : styles.navBrand} id="header-container">
        { useHeaderImage ? 
          <div className={styles.navbarBrandContainer}>
            <Link className="navbar-brand container" href="/" id="header-link-container">
              <div className="header-img-container disable-highlight" id="header-img-container">
                <div className={
                  isHome === true
                  ? "header-img animate__animated animate__fadeInDown"
                  : "header-img" }>
                  <Header />
                </div>
              </div>
            </Link>
          </div>
          : <></> }
        { useNavLinks
          ? <div className={navStyles.links}>
              <NavLinks location='top' />
            </div>
          : <></>}
      </div>
    </header>
    { useNotification
      ? <NotificationBar />
      : <></>}
  </>)
}


export const StandardHeader = ({ useHeaderImage, notification }) => {
  const router = useRouter();
  const path = router.pathname;
  const isHome = path === '/' ? true : false;
  return (
    <header className="site-header" id="site-header">
      <div className="navbar-container" id="header-container">
        <Link className="navbar-brand container" href="/" id="header-link-container">
          <div className="header-img-container disable-highlight" id="header-img-container">
            <div className={
              isHome === true
              ? "header-img animate__animated animate__fadeInDown"
              : "header-img" }>
              { useHeaderImage ? useHeaderImage : <></> }
            </div>
          </div>
        </Link>
        { notification }
      </div>
    </header>
  )
}

export const MobileHeader = () => {
  return (
    <div className={styles.mobileHeader}>
      <div className={styles.container}>
        <MobileLogo />
      </div>
    </div>
  )
}