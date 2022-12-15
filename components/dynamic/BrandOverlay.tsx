import Image from 'next/image';
import { useState } from 'react';
import ImageContainer from '../containers/ImageContainer';
import { siteLogo } from '../elements/SiteImages';
import logoDark from '../../public/logo-dark.png';
import website from '../../config/site-data.json';
import styles from  './styles/BrandOverlay.module.css';

const BrandOverlay = (
  // destroyTimer?: number | undefined,
  darkMode?: boolean | undefined,
) => {
  // const [show, setShow] = useState(true);
  // const delay = destroyTimer !== undefined ? destroyTimer : 11000;
  darkMode = darkMode === true ? true : false;
  // setTimeout(() => setShow(false), 8000);
  const logoAlt = website.name ?  website.name +  " Site Logo" : "Site Logo";
  return (<>
    <div className={styles.brandOverlay + ' animate__animated animate__fadeIn'}>
      <div className={styles.overlayWrapper}>
        <div className={styles.container}>
          <Image src={logoDark}
            className={styles.logo}
            width={logoDark.width}
            height={logoDark.height}
            alt={logoAlt}
            sizes="100vw"
            placeholder="blur" />
        </div>
      </div>
    </div>
  </>)
}

export default BrandOverlay;