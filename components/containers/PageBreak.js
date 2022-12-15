import styles from './styles/page-break.module.css';

const PageBreak = ({ children, wrapperClasses, border, borderClasses, borderStyles, shadow, padding }) => {

  // Add custom wrapper classes
  wrapperClasses = wrapperClasses ? ' '+wrapperClasses : '';

  // Add container classes
  borderClasses =
    border && !borderClasses  // If border is true and no border classes, add default border to container
      ? styles.container + ' ' + styles.border
    : borderClasses && border // If border classes and border is true, add default border and custom classes to container
      ? styles.container + ' ' + styles.border + ' ' + borderClasses
    : borderClasses && !border // If border classes and no border is true, add custom container classes only
      ? styles.container + ' '  + borderClasses
      : styles.container;
  
  // Add style object to container
  let containerStyle = borderStyles ? borderStyles : null;

  // Remove padding from container
  padding = padding === false ? ' ' + styles.no-padding :  '';

  let shadowStyles = {
    boxShadow: '5px 5px 10px black',
    outline: '1px solid',
    outlineColor: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  }


  if(shadow === true) {
    containerStyle = {
      ...shadowStyles,
      ...containerStyle,
    }
  }

  return (<>
    <div className={styles.wrapper+wrapperClasses}>
      <div className={borderClasses+padding} style={containerStyle}>{children}</div>
    </div>
  </>)
}

export default PageBreak;