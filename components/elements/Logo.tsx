import Image from "next/image";
import website from '../../config/site-data.json';

import logoLight from '../../public/logo-light.png';
import logoDark from '../../public/logo-dark.png';

const Logo = (
  colorMode?: 'light' | 'dark' | undefined,
  classes?: any | undefined,
  styles?: object | undefined
) => {

  const logo = colorMode === 'light' ? logoLight : logoDark;

  const logoStyle = styles ? styles : null;
  const logoClasses = classes ? classes+" " : "";
  const logoAlt = website.name ?  website.name +  " Site Logo" : "Site Logo";

  return (
    <div className={logoClasses+"site-logo"}>
      <Image src={logo} width={logo.width} height={logo.height} alt={logoAlt} style={logoStyle} sizes="100vw" placeholder="blur" />
    </div>
  )
}

export default Logo;