import hero1 from '../public/images/hero/hero-slide0.png';
import hero2 from '../public/images/hero/hero-slide1.png';
import hero3 from '../public/images/hero/hero-slide2.png';
import hero4 from '../public/images/hero/hero-slide3.png';

import img1 from '../public/images/slides/img1.png';
import img2 from '../public/images/slides/img1.png';
import img3 from '../public/images/slides/img3.png';
import img4 from '../public/images/slides/img4.png';
import img5 from '../public/images/slides/img5.png';
import img6 from '../public/images/slides/img6.png';
import img7 from '../public/images/slides/img7.png';
import img8 from '../public/images/slides/img8.png';
import img9 from '../public/images/slides/img9.png';
import img10 from '../public/images/slides/img10.png';
import img11 from '../public/images/slides/img11.png';
import img12 from '../public/images/slides/img12.png';
import img13 from '../public/images/slides/img13.png';

// import { useReadFiles } from '../hooks/useData';

export const heroSlides = () => {

  const arr = [ hero1.src,hero2.src,hero3.src,hero4.src, ];
  const imgArr = arr.map((src: string, index: number) => ({
    src,
    alt: `Hero Image ${index + 1}`,
  }));
  return imgArr;


  // const path = 'images/hero';
  // const data = useReadFiles(path);
  
  // Check if data is still being fetched
  // if(!data) {
  //   return [];
  // }
  
  // if(data) {
  //   const imgArr = data.map((src: string, index: number) => ({
  //     src,
  //     alt: `Hero Image ${index + 1}`,
  //   }));
  //   return imgArr;
  // }
};

export const gallerySlides = () => {

  const arr = [ img1.src,img2.src,img3.src,img4.src,img5.src,img6.src,img7.src,img8.src,img9.src,img10.src,img11.src,img12.src,img13.src, ];

  const imgArr = arr.map((src: string, index: number) => ({
    src,
    alt: `Gallery Image ${index + 1}`,
  }));
  return imgArr;

  // const path = 'images/slides';
  // const data = useReadFiles(path);
  
  // // Check if data is still being fetched
  // if(!data) {
  //   return [];
  // }

  
  // if(data) {
  //   const imgArr = data.map((src: string, index: number) => ({
  //     src,
  //     alt: `Gallery Image ${index + 1}`,
  //   }));
  //   return imgArr;
  // }
};