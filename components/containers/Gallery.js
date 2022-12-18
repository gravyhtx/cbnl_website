import Glider from '../carousel/Glider';
import GliderPanel from '../carousel/GliderPanel';
import Image from 'next/image';

import img1 from '../../public/images/slides/img1.png';
import img2 from '../../public/images/slides/img2.png';
import img3 from '../../public/images/slides/img3.png';
import img4 from '../../public/images/slides/img4.png';
import img5 from '../../public/images/slides/img5.png';
import img6 from '../../public/images/slides/img6.png';
import img7 from '../../public/images/slides/img7.png';
import img8 from '../../public/images/slides/img8.png';
import img9 from '../../public/images/slides/img9.png';
import img10 from '../../public/images/slides/img10.png';
import img11 from '../../public/images/slides/img11.png';
import img12 from '../../public/images/slides/img12.png';
import img13 from '../../public/images/slides/img13.png';

import styles from './styles/gallery.module.css';
import useWindowSize from '../../hooks/useWindowSize';

const Gallery = ({ imgObjArray }) => {
  // Get window width
  const winsize = useWindowSize();
  const width = winsize.width;

  // Default slides for testing...
  const slides = [{
    src: img1,
    alt: "Image 1"
  },{
    src: img2,
    alt: "Image 2"
  },{
    src: img3,
    alt: "Image 3"
  },{
    src: img4,
    alt: "Image 4"
  },{
    src: img5,
    alt: "Image 5"
  },{
    src: img6,
    alt: "Image 6"
  },{
    src: img7,
    alt: "Image 7"
  },{
    src: img8,
    alt: "Image 8"
  },{
    src: img9,
    alt: "Image 9"
  },{
    src: img10,
    alt: "Image 10"
  },{
    src: img11,
    alt: "Image 11"
  },{
    src: img12,
    alt: "Image 12"
  },{
    src: img13,
    alt: "Image 13"
  },];

  const Slides = () => {
    const arr = imgObjArray ? imgObjArray : slides;
    return (
      arr.map((image, index) => {
        const slideSrc = image.src;
        const slideAlt = image.alt;
        
        const openSlide = () => {
          console.log('open'+index)
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

  const slidesToShow = width > 1400
      ? 1.75
    : width <= 1400 && width > 1024
      ? 1.5
    : width <= 1024 && width > 768
      ? 1.2
      : 1

  return (
    <section className={styles.container} id="gallery">
      <h2>GALLERY</h2>
      <Glider hasDots={true} slidesToShow={slidesToShow}>
        <Slides />
      </Glider>  
    </section>
  )
}

export default Gallery;