import { useEffect, useState } from 'react';

import Glider from '../carousel/Glider';
import GliderPanel from '../carousel/GliderPanel';
import Image from 'next/image';

import SyncLoader from "react-spinners/SyncLoader";

import useWindowSize from '../../hooks/useWindowSize';
import { gallerySlides } from '../../config/site-images.config';

import styles from './styles/gallery.module.css';

const Gallery = ({ header, classes, imgObjArray }) => {
  // Get window width
  const winsize = useWindowSize();
  const width = winsize.width;
  classes=classes?" "+classes: ";"

  const Slides = () => {
    const arr = imgObjArray ? imgObjArray : gallerySlides();

    const Loading = () => <div>Loading...</div>

    if(arr === null) {
      return <SyncLoader />
    }
    
    if (arr) {
      return (
        arr.map((image: {src: string, alt: string}, index: number) => {
          const slideSrc = image.src;
          const slideAlt = image.alt;
          
          const openSlide = () => {
            console.log('open'+index);
          }

          return (
            <GliderPanel key={index} onClick={() => openSlide()}>
                <div className={styles.imgContainer}>
                <Image src={slideSrc} alt={slideAlt} sizes="100vw" fill />
              </div>
            </GliderPanel>
          )
        })
      )
    }
  }

  const slidesToShow = width > 1400
      ? 1.5
    : width <= 1400 && width > 1024
      ? 1.3
    : width <= 1024 && width > 768
      ? 1.2
      : 1

  return (
    <section className={styles.container+classes} id="gallery">
      {header?header:<h2>GALLERY</h2>}
      <Glider hasDots={true} slidesToShow={slidesToShow}>
        <Slides />
      </Glider>  
    </section>
  )
}

export default Gallery;