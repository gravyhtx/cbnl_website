import { memo, useEffect, useRef, useState } from 'react';
import Image from "next/image";

// SLIDES
import hero0 from '../../public/images/hero/hero-slide0.png';
import hero1 from '../../public/images/hero/hero-slide1.png';
import hero2 from '../../public/images/hero/hero-slide2.png';
import hero3 from '../../public/images/hero/hero-slide3.png';
// import { heroSlides } from '../../config/site-images.config';

import styles from './styles/hero.module.css';
import { numberClamp } from '../../utils/generator';

function Hero(){
  const homeSlides = [hero0, hero1, hero2, hero3];
  const duration = 24000; // duration for each slide in milliseconds
  const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect to set a timer to advance to the next slide after the duration has passed
  useEffect(() => {
    const timer = setTimeout(() => {
      // Increments the value of currentSlide by 1, and then uses the
      // modulo operator (%) to "wrap around" to the first slide once
      // the end of the homeSlides array has been reached.
      setCurrentSlide((currentSlide + 1) % homeSlides.length);
    }, duration);

    // clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const HeroImage = ({ img, index }: { img: any; index: number }) => {
    // only apply the animation styles if this is the current slide
    const visible = index === currentSlide;
    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!visible) {
        return;
      }

      const slide = slideRef.current!;
      const start = performance.now(); //https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

      const fadeIn = (elapsed: number) => {
        slide.style.opacity = numberClamp((elapsed / 1000 / 2),0,1).toFixed(3).toString();
        slide.style.filter = `blur(${numberClamp((20 - (elapsed / 1000) * 20),0,20).toFixed(3)}px)`;
        if (elapsed < 2000) {
          requestAnimationFrame((time) => fadeIn(time - start));
        }
      };

      const grow = (elapsed: number) => {
        slide.style.transform = `scale(${(100 + (elapsed / 1000) * 1.05).toFixed(4)}%)`;
        if (elapsed < 20000) {
          requestAnimationFrame((time) => grow(time - start));
        }
      };

      const fadeOut = (elapsed: number) => {
        slide.style.opacity = ((24000 - elapsed) / 1000).toFixed(3).toString();
        slide.style.filter = `blur(${((elapsed / 1000) * 20).toFixed(3)}px)`;
        if (elapsed < 24000) {
          requestAnimationFrame((time) => fadeOut(time - start));
        }
      };

      requestAnimationFrame((time) => fadeIn(time - start));
      setTimeout(() => requestAnimationFrame((time) => grow(time - start)), 2000);
      setTimeout(() => requestAnimationFrame((time) => fadeOut(time - start)), 22000);
    }, [visible]);

    return (
      <div className={styles.container} ref={slideRef}>
        <Image
          className={styles.slide}
          src={img.src}
          alt={`Hero Image ${index + 1}`}
          sizes="100vw"
          quality={80}
          fill={true}
        />
      </div>
    );  
  }

  // slides is an array of JSX elements representing each slide
  const slides = homeSlides.map((img: any, index: number) => {
    return <HeroImage img={img} index={index} key={index} />
  });
  
  return (
    <div className={styles.hero}>
      <div className={styles.slides}>
        {slides[currentSlide]}
      </div>
    </div>
  );
}

export const MemoizedHero = memo(Hero);