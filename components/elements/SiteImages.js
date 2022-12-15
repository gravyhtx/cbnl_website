// IMAGES
  //LOGOS
    // Black
    import logo from '../../public/images/logos/cbnl-logo.png';
    import logoSvg from '../../public/images/logos/svg/cbnl-logo.svg';
    // Light
    import logoLight from '../../public/images/logos/cbnl-logo_light.png';
    import logoLightSvg from '../../public/images/logos/svg/cbnl-logo_light.svg';
    // Dark
    import logoDark from '../../public/images/logos/cbnl-logo_dark.png';
    import logoDarkSvg from '../../public/images/logos/svg/cbnl-logo_dark.svg';

  // LEAF ICON
    // Black
    import leafIcon from '../../public/images/icons/site/leaf_icon.png';
    import leafIconSvg from '../../public/images/icons/site/svg/leaf_icon.svg';
    // Light
    import leafIconLight from '../../public/images/icons/site/leaf_light.png';
    import leafIconLightSvg from '../../public/images/icons/site/svg/leaf_light.svg';
    // Dark
    import leafIconDark from '../../public/images/icons/site/leaf_dark.png';
    import leafIconDarkSvg from '../../public/images/icons/site/svg/leaf_dark.svg';


// IMPORTS
import { checkSizeFormat, checkType } from '../../utils/validation';

import styles from './styles/SiteImages.module.css';


export const siteLogo = (name, version, useSvg) => {

  name = name === ('default' || true) ? 'default' : checkType(name, 'string') ? name : 'default';

  version = version === 'dark' ? 'dark' : version === 'light' ? 'light' : 'default';
  useSvg = useSvg ? true : false;

  // console.log(version)

  if(useSvg === false) {
    switch(version) {
      case ('dark'):
        return logoDark;
      case ('light'):
        return logoLight;
      default:
        return logo;
    }
  }

  if(useSvg === true) {
    switch(version) {
      case 'dark':
        return logoDarkSvg;
      case 'light':
        return logoLightSvg;
      default:
        return logoSvg;
    }
  }

  return useSvg ? logoSvg : logo;

}

export const siteIcon = (version, useSvg) => {

  version = version === 'dark' ? 'dark' : version === 'light' ? 'light' : 'default';
  useSvg = useSvg ? true : false;

  if(useSvg === false) {
    switch(version) {
      case 'dark':
        return leafIconDark;
      case 'light':
        return leafIconLight;
      default:
        return leafIcon;
    }
  }

  if(useSvg === true) {
    switch(version) {
      case 'dark':
        return leafIconDarkSvg;
      case 'light':
        return leafIconLightSvg;
      default:
        return leafIconSvg;
    }
  }

  return useSvg ? leafIconSvg : leafIcon;

}

export const SiteImage = ({ width }) => {

  const isSizeFormat = checkSizeFormat(width).is;

  const container = () => {
    let output;
    if (checkType(width, 'string')) {
      width === ('xs' || 'xsmall')
          ? output = styles.container.xs
        : width === ('s' || 'sm' || 'small')
          ? output = styles.container.sm
        : width === ('m' || 'md' || 'mediuim')
          ? output = styles.container.md
        : width === ('l' || 'lg' || 'large')
          ? output = styles.container.lg
        : width === ('xl' || 'xlarge')
          ? output = styles.container.xl
        : width === ('xxl' || 'full' || 'fullsize' || 'xlarge')
          ? styles.container.full
          : output = styles.container
      } else { output === false }
    return output ? output : styles.container
  }

  let containerWidth = isSizeFormat && container === styles.container ? {width: width} : null;


  return (<>
    <div className={container} style={containerWidth}>
      
    </div>
  </>)
}