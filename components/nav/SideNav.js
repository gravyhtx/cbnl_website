import useWindowSize from "../../hooks/useWindowSize";
import NavLinks from "./NavLinks";

import styles from './styles/sidenav.module.css';

const SideNav = ({ position, header, activate, setActivate, blur }) => {

  // Automatically position to left side
  position = position === 'right' ? position = 'right' : position = 'left';

  // Determine screen width and position...
  // If right -- add width / if left -- subtract width
  // Slide in nav from outside of screen with screen width
  let screenWidth = useWindowSize().width;

  // Set styles for dynamic navigation container
  let navStyles = {
    width: screenWidth > 500 ? '380px' : screenWidth,
  }

  const close = () => {
    setActivate(false);
  }

  // CLASSES
  // Setting 'blur' to true will blur the background behind the modal.
  blur = blur ? ' blur-background' : '';
  // Add active class when open
  let active = activate ? ' active ' : ' ';
  // Position wrapper
  const loc = position === 'right' ? styles.right : styles.left;

  const cls = {
    aside: styles.sidenav+blur,
    outer: styles.outer + ' darken-content',
    wrapr: styles.wrapper+active+loc,
    cntnr: header?styles.headernav+' '+styles.container:styles.container,
    nmenu: styles.menu,
    headr: styles.header
  }

  return (<>
    { activate ? 
      <aside className={cls.aside}>
        <div className={cls.outer} onClick={() => close()}>
        </div>
        <nav className={cls.wrapr} style={navStyles}>
          <div className={cls.cntnr}>
            { header ? <div className={cls.headr}>{header}</div> : <></> }
            <div className={cls.nmenu}>
              <NavLinks location="side" />
            </div>
          </div>
        </nav>
      </aside> : <></> }
  </>)
}

export default SideNav;