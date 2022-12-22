import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import {isMobile} from 'react-device-detect';

import SideNav from '../components/nav/SideNav';
import { HomepageHero } from '../components/dynamic/Hero';
import { HomeHeader, BrandHeader, MobileHeader } from '../components/nav/Header';
import BrandOverlay from '../components/dynamic/BrandOverlay';
import Footer from '../components/nav/Footer';

import { SvgContainer } from '../components/containers/SvgContainer';

import { ScrollToPosition } from '../modules/scrollSystem';
import { authCheck } from '../utils/siteFunctions';
import { useDevice } from '../hooks/useDevice';
import { elementIsVisible, useClientRect } from '../hooks/useClientRect';
import useScrollPosition from '../hooks/useScrollPosition';

import website from '../config/site-data.json';
import { metaTags } from '../config/theme';

import logo from '../public/logo.png';

import styles from './layout.module.css';

export default function DefaultLayout({
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
}) {

  const router = useRouter();
  const path = router.pathname;
  const isHome = path === '/' ? true : false;

  let mobileCheck = false;
  
  useEffect(() => {
    mobileCheck = useDevice().isMobile;
  })

  useHeader = useHeader === false ? false : true;
  useBrandOverlay = useBrandOverlay === false || isHome === false ? false : true;
  useSideNav = useSideNav ? useSideNav : true;
  swipeNav = swipeNav === false ? ' no-swiping' : '';

  useEffect(() => {
    if(withAuth && (authCheck() === false)) {
      window.location.href = authRedirect ? authRedirect : '/';
    }
  });
  
  const [sideNav, setSideNav] = useState(false);

  const openSideNav = useCallback(() => {
    console.log(sideNav);
    setSideNav(!sideNav)
  }, [sideNav])

  const SideNavContainer = () => {
    return useSideNav
      ? <SideNav header={<SvgContainer svg={logo.src} sizeObj={false} />} activate={sideNav} setActivate={setSideNav} />
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
          { useHeader && isHome === true ? <HomeHeader /> : useHeader && isHome === false ? <BrandHeader /> : <></>}
          { hero && isHome === false ? hero : <></> }
        </hgroup>
      </div>
    )
  }

  useEffect(() => {
    const time = setInterval(() => {
      if(playIntro === true) {
        setPlayIntro(false)
      }
    }, 6000);
    return () => clearInterval(time);
  }, [playIntro]);

  // CLASSES
  const homeClass = isHome === true ? ' home' : '';
  layoutClasses = layoutClasses ? " "+layoutClasses : "";
  containerClasses = containerClasses ? " "+containerClasses : "";
  backToTop = backToTop === true ? true : false;

  // GET CLIENT RECT AT "MAIN"
  function useRect( property, elementRef ) {
    if(elementRef && elementRef.current !== null) {
      return elementRef.current.getBoundingClientRect();
    }
    const [rect, setRect] = useState(null);
    const ref = useCallback((node) => {
      if (node !== null && rect === null && property !== undefined) {
        setRect(node.getBoundingClientRect()[property]);
      }
      else if (node !== null && rect === null && property === undefined) {
        setRect(node.getBoundingClientRect());
      }
    }, []);
    return [rect, ref];
  }

  // GET HEADER SIZE
  const [rect, headerRef] = useRect();

  // useEffect(() => {
  //   console.log(rect);
  // },[rect]);

  // GET SCROLL POSITION
  const layoutRef = useRef(null);
  const elementRef = layoutRef;
  // console.log(useScrollPosition(elementRef));
  const mainRef = useRef(null);
  
  // const elInView = (elementRef) => {
    
  //   const [isVisible, setIsVisible] = useState(false);

  //   useEffect(() => {
  //     const refresh = () => {
  //       const rect = elementRef.current.getBoundingClientRect();
  //       if (rect.top >= 0 &&
  //         rect.left >= 0 &&
  //         rect.bottom <= document.body.clientHeight &&
  //         rect.right <= document.body.clientWidth) {
  //           setIsVisible(true);
  //       }
  //       else {
  //         setIsVisible(false);
  //       }
  //       console.log(isVisible)
  //     }
  //     if(elementRef.current !== null) {
  //       refresh();
  //       if(document) {
  //         document.body.addEventListener("scroll", refresh);
  //         return () => document.body.removeEventListener('scroll', refresh);
  //       }
  //     }
  //   })
  //   return isVisible;
  // }

  const SideNavTrigger = () => {
    return (<>
      {/* { elInView(mainRef) ?
        <div className="sidenav-trigger">
          <div className='container'>
            <button onClick={openSideNav}>&#9776;</button>
          </div>
        </div> : <></>} */}
      <div className="sidenav-trigger">
        <div className='container'>
          <button onClick={openSideNav}>&#9776;</button>
        </div>
      </div>
    </>)
  }
  const Main = () => {
    return (
      <main ref={mainRef} className={ "main-content"+containerClasses+homeClass } id={id?id:"content"}>
        { withAuth && authCheck() || !withAuth ? children : <></> }
      </main>
    )
  }

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
          { useSideNav === true ? <SideNavTrigger /> : <></> }
          { useSideNav === true ? <SideNavContainer /> : <></> }
          </>
      }
    </div>
  </>)
}