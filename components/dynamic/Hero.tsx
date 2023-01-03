import { useEffect, useState, Fragment, ReactNode, } from 'react';
import Image from 'next/image';

// GLIDER
import Glider from '../carousel/Glider';
import GliderPanel from '../carousel/GliderPanel';

// SLIDES
import hero0 from '../../public/images/hero/hero-slide0.png';
import hero1 from '../../public/images/hero/hero-slide1.png';
import hero2 from '../../public/images/hero/hero-slide2.png';
import hero3 from '../../public/images/hero/hero-slide3.png';
import { heroSlides } from '../../config/site-images.config';
// LOGO
import logoDark from '../../public/logo-dark.png';

import website from '../../config/site-data.json';
import styles from './styles/hero.module.css';

const homeSlides = [ hero0, hero1, hero2, hero3 ];
// console.log(heroSlides())

const heroSlide = (
  index?: number,
  opts?: {
    map?: boolean | undefined,
    rotate?: boolean | undefined,
  }
) => {

  const [timer, setTimer] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  // let timer = 0; // let imgIndex = 0; // let fadeOut = false;
  
  useEffect(() => {
    const time = setInterval(() => {
      if(timer < 25) {
        setFadeOut(timer >= 23 ? true : false);
        setTimer(timer+1)
      }
      else {
        setTimer(0);
        setFadeOut(false)
        setImgIndex(imgIndex < homeSlides.length - 1 ? imgIndex + 1 : 0);
      }
    }, 1000);
    return () => clearInterval(time);
  }, [timer, imgIndex, fadeOut]);

  const fade = fadeOut === true ? styles.out : styles.in;

  const display = (index: number) => {
    return opts.map === true && opts.map !== undefined ? { display: imgIndex === index ? 'block' : 'none' } : null;
  }

  return (
    <Image className={styles.slide + ' ' + fade}
      style={display(index)}
      src={homeSlides[imgIndex]}
      alt={`Hero Image ${imgIndex+1}`}
      sizes="100vw"
      placeholder="blur"
      quality={80}
      fill={true} />
  )
}

const Logo = () => {


  const logoAlt = website.name ?  website.name +  " Site Logo" : "Site Logo";

  const siteLogo =
    <div className={styles.logoContainer}>
      <Image src={logoDark}
        className={styles.logo}
        width={logoDark.width}
        height={logoDark.height}
        alt={logoAlt}
        sizes="100vw"
        placeholder="blur" />
    </div>
  return siteLogo;
}

export const HeroTest = () => {
  const opts = {
    map: true,
    rotate: true,
  }
  return (
    <div className={styles.homepageHero}>{
      (homeSlides as any[]).map((index: number) => {
        return (
          <Fragment key={index}>
            <div className={styles.container}>
              { heroSlide(index, opts) }
            </div>
          </Fragment>)
      })}
    </div>
  )
}

export const HomepageHero = () => {
  const opts = {
    map: false,
    rotate: false,
  }

  return (
    <div className={styles.homepageHero}>
      { heroSlide(0, opts) }
      <Logo />
    </div>
  )
}


// export const HeroSlider = () => {
//   const opts = {
//     map: false,
//     rotate: false,
//   }

//   return (
//     <div className={styles.homepageHero}>
//       <Glider hasDots={true} slidesToShow={slidesToShow}>
//         <GliderPanel key={index} onClick={() => openSlide()}>
//             <div className={styles.imgContainer}>
//             <Image src={slideSrc} alt={slideAlt} sizes="100vw" fill />
//           </div>
//         </GliderPanel>
//       </Glider>
//       <Logo />
//     </div>
//   )
// }