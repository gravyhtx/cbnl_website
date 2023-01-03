import Panel from "./Panel";

import styles from '../styles/section.module.css';

const Section = (
  content: {
    children: any,
    colSize?: string,
    bkgColor?: string,
    bkgImgUrl?: string,
    fullHeight?: boolean,
    classes?: string,
    containerClasses?: string,
    styles?: object,
  }[],
  id: string | number,
  newRow?: boolean,
  autosize?: boolean,
) => {

  const row = newRow === true ? ' row' : '';

  const columns = content.length === 1 ? "s12" :
    content.length === 2 ? "s6" :
    content.length === 3 ? "s4" :
    content.length === 4 ? "s3" :
    "";

  const wrapper = styles.wrapper+row;

  const MapPanels = () => {
    return <>{content.map((panel, index) => {
      return (
        <Panel
          colSize={panel.colSize && !autosize ? panel.colSize : !panel.colSize && autosize && columns ? columns : "s12"}
          bkgColor={panel.bkgColor?panel.bkgColor:null}
          bkgImg={panel.bkgImgUrl?panel.bkgImgUrl:null}
          fullHeight={panel.fullHeight?panel.fullHeight:false}
          classes={panel.classes?panel.classes:null}
          containerClasses={panel.containerClasses?panel.containerClasses:null}
          styles={panel.styles?panel.styles:null}
          key={index}>
            { panel.children }
        </Panel>
      )})}
    </>
  }
  
  return(
    <section className={wrapper} id={id.toString()}>
      <MapPanels />
    </section>
  )
}

export default Section;