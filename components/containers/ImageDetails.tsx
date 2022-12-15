import Image from 'next/image';
import { FC, ImgHTMLAttributes, ReactNode } from 'react';

import styles from './styles/imageDetails.module.css';

interface Props {
  image: ImgHTMLAttributes<HTMLImageElement>;
  alt: string;
  details: {
    content: ReactNode | string;
    header?: ReactNode | string;
  };
  position?: 'left' | 'right' | undefined;
}

const ImageDetails: FC<Props> = ({ image, position, alt, details }) => {

  const ImageBox = () => {
    return (
      <div className={styles.imageBox}>
        { image
          ? <Image
              src={image.src}
              alt={alt}
              sizes="100vw"
              fill /> : <></> }
      </div>
    )
  }

  const Details = () => {
    return (
      <div className={styles.details}>
        { details.header
        ? <h3 className={styles.header}>
            { details.header }
          </h3>
        : <></>}
        <div className={styles.content}>
          { details.content }
        </div>
      </div>
    )
  }

  return (
    <>
      { position === 'right' ?
        <div className={styles.container+' '+styles.right}>
          <Details />
          <ImageBox />
        </div>
      : <div className={styles.container+' '+styles.left}>
          <ImageBox />
          <Details />
        </div>
      }
    </>
  )
}

export default ImageDetails;