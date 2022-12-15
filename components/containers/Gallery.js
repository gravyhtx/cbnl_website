import Glider from '../carousel/Glider';
import GliderPanel from '../carousel/GliderPanel';
import Image from 'next/image';

import img1 from '../../public/images/slides/img1.png';
import img2 from '../../public/images/slides/img2.png';
import img3 from '../../public/images/slides/img3.png';
import img4 from '../../public/images/slides/img4.png';
import img5 from '../../public/images/slides/img5.png';
import img6 from '../../public/images/slides/img6.png';

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
    <section className={styles.container}>
      <h2>GALLERY</h2>
      <Glider slidesToShow={slidesToShow}>
        <Slides />
      </Glider>  
    </section>
  )
}

export default Gallery;