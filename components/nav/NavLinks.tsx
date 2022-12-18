import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";

import { navlinks } from "../../config/theme";

import Leaf from '../../public/images/icons/site/svg/leaf_icon.svg';
import SvgElement from "../elements/SvgElement";

import * as Unicons from '@iconscout/react-unicons';

import styles from './styles/navlinks.module.css';

interface Props {
  location?: 'side' | 'top' | 'bottom';
  classes?: string;
  hoverIcon?: {
    use?: boolean,
    size?: string | number,
  };
}

const NavLinks: FC<Props> = ({ location, classes, hoverIcon }): JSX.Element => {
  // Check location for highlighting appropriate link
  const router = useRouter();
  const path = router.pathname;

  // const width = hoverIcon.size ? hoverIcon.size.toString() : '20px';
  // const HoverIcon = () => <img className="" src={leaf.src} style={{width: width}} />
  // const HoverIcon = () => <Leaf fill={'#333'} />
  const loc = () => {
    switch (location){
      case 'top':
        return styles.top;
      case 'bottom':
        return styles.bottom;
      case 'side':
      default:
        return styles.side; 
    }
  }

  // Handle Active and Hover
  const [hover, setHover] = useState(null);
  const ActiveIcon = () => location === 'side' ? <span className={styles.before}>{''}</span> : <></>;

  const handleHover = (index: number | null) => {
    setHover(index);
  }

  // Classes
  classes = classes ? classes : '';
  const cls = styles.link + ' ' + loc() + ' ' + classes;

  return (<>
    {navlinks.map((
      item: {
        alt: string,
        link: string,
        name: string
      },
      index
    ) => {

      // Set synamic variables
      const isActive = path === item.link;
      const active = isActive ? ' '+styles.active : '';
      const navLink = active ? <><ActiveIcon/>{item.name.toUpperCase()}</> : <>{item.name.toUpperCase()}</>;

      const HoverIcon = () => {
        const display = hover === index ? ' '+styles.show : ' '+styles.hide;
        const color = isActive ? '#888' : '#bbb';
        const Icon = () => <Unicons.UilAngleLeft color={color} size="30" />
        return <span className={styles.hoverIcon+display}>&nbsp;<Icon /></span>
      }
      return (
        <ul className={cls+active} aria-label={item.alt} key={index}>
          <Link
          className={styles.navlink}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
            href={item.link}>
            { navLink }
            { location === 'side' ? <HoverIcon /> : <></> }
            {/*  && hover === index */}
          </Link>
        </ul>
      )})}
  </>)
}

export default NavLinks;