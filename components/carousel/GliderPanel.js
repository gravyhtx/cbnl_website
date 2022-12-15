//  https://react-glider.vercel.app/
import styles from './glider.module.css';

const GliderPanel = ({ children, perspective }) => {

  const Slide = () => {
    return (
      <div className={styles.slide+" slide"}>
        { children }
      </div>
    )
  }

  const SlideOuter = () => {
    return (
      <div className={styles.slide+" "+styles.outer+" slide-outer"}>
        { children }
      </div>
    )
  }

  return perspective ? <SlideOuter /> : <Slide />

}


export default GliderPanel;