import { ReactNode } from 'react';
import styles from './styles/container.module.css';

export const Wrapper = (
  children: ReactNode,
  classes?: string,
  layout?: 'fill' | 'responsive' | 'grid',
) => {
  classes = classes ? ' '+classes : '';
  const layoutType = () => {
    switch(layout) {
      case 'fill': // fills height, padding
        return ' '+styles.fill;
      case 'responsive': // padding
        return ' '+styles.responsive;
        case 'grid': // no padding
          return ' '+styles.grid;
      default:
        return '';
    }
  }
  const type = layoutType();
  const wrapperClasses = type+classes;

  return (
    <div className={styles.wrapper+wrapperClasses}>
      { children }
    </div>
  )
}

export const Container = (
  children: ReactNode,
  classes?: string,

) => {
  classes = classes ? ' '+classes : '';
  return (
    <div className={styles.container+classes}>
      { children }
    </div>
  )
}

// export const Grid = (
//   rows: {
    
//   },
// ) => {
//   return (
//     rows.map((row, index) => {
//       <Wrapper layout={'grid'} key={index}>
//         { row.map((item, index) => {
//             <Container classes={item.classes} key={index}>
//               { item. }
//             </Container>
//           })
//         }
//       </Wrapper>
//     })
//   )
// }