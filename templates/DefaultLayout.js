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
import { useClientRect } from '../hooks/useClientRect';
import useScrollPosition from '../hooks/useScrollPosition';
import useScrollProgress from '../hooks/useScrollProgress';

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

  const SideNavTrigger = () => {
    return (
      <div className="sidenav-trigger">
        <div className='container'>
          <button onClick={openSideNav}>&#9776;</button>
        </div>
      </div>
    )
  }

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
  
  const layoutRef = useRef(null);
  const layoutCurrent = layoutRef.current;
  const [scrollPos, setScroll] = useState({})
  
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      console.log(scrollPosition);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

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
      <hgroup className={styles.header}>
        <MobileHeader />
        { isHome === true ? <HomeHero /> : <></> }
        { useHeader && isHome === true ? <HomeHeader /> : useHeader && isHome === false ? <BrandHeader /> : <></>}
        { hero && isHome === false ? hero : <></> }
      </hgroup>
    )
  }

  // const MemoHeader = useMemo(() => <Header />, [])

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

  console.log(useScrollPosition())

  // GET HEADER SIZE
  // const [rect, ref] = useClientRect();
  // console.log(rect);

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
          {/* <Header ref={ref} /> */}
          {/* <MemoHeader /> */}
          <Header />
            <main className={ "main-content"+containerClasses+homeClass } id={id?id:"content"}>
              { withAuth && authCheck() || !withAuth ? children : <></> }
            </main>
            
          <Footer isMobile={mobileCheck} />
          { useSideNav === true ? <SideNavTrigger /> : <></> }
          { useSideNav === true ? <SideNavContainer /> : <></> }
          </>
      }
    </div>
  </>)
}