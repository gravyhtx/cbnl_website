import Head from 'next/head';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import SideNav from '../components/nav/SideNav';
import SideNavTrigger from '../components/nav/SideNavTrigger';
import { HomepageHero } from '../components/dynamic/Hero';
import { HomeHeader, BrandHeader, MobileHeader } from '../components/nav/Header';
import BrandOverlay from '../components/dynamic/BrandOverlay';
import Footer from '../components/nav/Footer';
import { SvgContainer } from '../components/containers/SvgContainer';
import { heroSlides } from '../config/site-images.config';

import { ScrollToPosition } from '../modules/scrollSystem';
// import { authCheck } from '../utils/siteFunctions';
import { isMobile } from 'react-device-detect';

import { elementIsVisible, useClientRect } from '../hooks/useClientRect';
import useScrollPosition from '../hooks/useScrollPosition';
import { select, randomize } from '../utils/generator';

import website from '../config/site-data.json';
import { metaTags } from '../config/theme.config';
import { checkType } from '../utils/validation';
import useWindowSize from '../hooks/useWindowSize';

import logo from '../public/logo.png';

import styles from './layout.module.css';

const DefaultLayout = ({
  title,
  children,
  id,
  hero,
  layoutClasses,
  containerClasses,
  description,
  useHeader,
  withAuth,
  authRedirect,
  backToTop,
  scalable,
  swipeNav,
  useBrandOverlay,
  useSideNav
}) => {

  const router = useRouter();
  const path = router.pathname;
  const isHome = path === '/' ? true : false;

  const winsize = useWindowSize();
  const width = winsize.width;
  const height = winsize.width;

  // console.log(heroSlides())

  let mobileCheck = isMobile === true || width < 760 ? true : false;

  useHeader = useHeader === false ? false : true;
  useBrandOverlay = useBrandOverlay === false || isHome === false ? false : true;
  useSideNav = useSideNav ? useSideNav : true;
  swipeNav = swipeNav === false ? ' no-swiping' : '';

  // useEffect(() => {
  //   if(withAuth && (authCheck() === false)) {
  //     window.location.href = authRedirect ? authRedirect : '/';
  //   }
  // });
  
  const [sideNav, setSideNav] = useState(false);

  const openSideNav = useCallback(() => {
    setSideNav(!sideNav);
  }, [sideNav]);

  const SideNavContainer = () => {
    // const header = <SvgContainer src={logo.src} sizeObj={false} />
    const header = <></>
    return useSideNav
      ? <SideNav header={header} activate={sideNav} setActivate={setSideNav} />
      : <></>;
  }

  const [playIntro, setPlayIntro] = useState(isHome === true ? true : false);

  const Intro = () => <>{
    useBrandOverlay === true
      ? <div onClick={() => setPlayIntro()}><BrandOverlay /></div>
      : <></>
    }</>

  const Header = () => {
    const HomeHero = () => {
      return (<>
        {isHome === true
        ? <>
            <HomepageHero />
          </>
        : <></>}
      </>)
    }
    return (
      <div>
        <hgroup className={styles.header}>
          <MobileHeader />
          { isHome === true ? <HomeHero /> : <></> }
          { useHeader && isHome === true ? <HomeHeader /> : useHeader && isHome === false ? <></> : <></>}
          {/* { useHeader && isHome === true ? <HomeHeader /> : useHeader && isHome === false ? <BrandHeader /> : <></>} */}
          { hero && isHome === false ? hero : <></> }
        </hgroup>
      </div>
    )
  }

  useEffect(() => {
    let isLoaded = false;

    window.onload = () => {
      isLoaded = true;
    };

    const loadingCancel = setInterval(() => {
      if(playIntro === false && isLoaded === false) {
        setPlayIntro(false)
      }
    }, 3000);

    const time = setInterval(() => {
      if(playIntro === true) {
        setPlayIntro(false)
      }
    }, 6000);

    return () => {
      clearInterval(time);
      clearInterval(loadingCancel);
    };
  }, [playIntro]);

  // CLASSES
  const homeClass = isHome === true ? ' home' : '';
  layoutClasses = layoutClasses ? " "+layoutClasses : "";
  containerClasses = containerClasses ? " "+containerClasses : "";
  backToTop = backToTop === true ? true : false;  
  
  // GET SCROLL POSITION
  const layoutRef = useRef(null);
  const elementRef = layoutRef;
  // console.log(useScrollPosition(elementRef));
  const mainRef = useRef(null);
  const mainViz = elementIsVisible(mainRef);

  const Main = () => {
    return (
      <main ref={mainRef} className={ "main-content"+containerClasses+homeClass } id={id?id:"content"}>
        { mainViz }
        { children }
        {/* { withAuth && authCheck() || !withAuth ? children : <></> } */}
      </main>
    )
  }

  const sel = (el) => {
    const output = el[randomize(el.length)];
    return output[randomize(output.length)] ? output[randomize(output.length)] : el[randomize(el.length)];
  };

  useEffect(() => {
    const arr = [1,2,3];
    const arrArr = [arr, [9,7,3], ['a','b','c']];
    const str= 'asdfghjk456789';
    console.log(select(arr));
    console.log(select(arrArr));
    console.log(sel(str));
    console.log(navigator.canShare)
  }, [])

  return (<>
    <div
      className={ "animate__animated animate__fadeIn layout"+layoutClasses+swipeNav }
      ref={layoutRef}
      id="layout">
      <Head>
        <title>{ title ? website.name + " | " + title : website.name }</title>
        { metaTags( title, description, scalable ) }
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ScrollToPosition />
      { playIntro === true
        ? <Intro />
        : <>
          <Header />
          <Main />
          <Footer isMobile={mobileCheck} />
          { useSideNav === true ? <SideNavTrigger openSideNav={openSideNav} /> : <></> }
          { useSideNav === true ? <SideNavContainer /> : <></> }
          </>
      }
    </div>
  </>)
}

export default DefaultLayout;