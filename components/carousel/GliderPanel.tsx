//  https://react-glider.vercel.app/
import { FC, ReactNode } from 'react';
import styles from './glider.module.css';

interface Props {
  children: ReactNode;
  onClick: () => any;
  perspective?: boolean;
}

const GliderPanel: FC<Props> = ({ children, onClick, perspective }) => {

  const Slide = () => {
    return (
      <div className={styles.slide+" slide"}>
        { children }
      </div>
    )
  }

  const SlideOuter = () => {
    return (
      <div onClick={onClick} className={styles.slide+" "+styles.outer+" slide-outer"}>
        { children }
      </div>
    )
  }

  return perspective ? <SlideOuter /> : <Slide />

}


export default GliderPanel;