import { imageSizeObj } from "../../utils/validation";
import website from '../../config/site-data.json'

// USE OBJECT TAG TO CREATE AN INTERACTIVE IMAGE MAP
const ImageMap = ({ img, classes, name, areaObj, sizeObj, alt, onClick }) => {

  const data = img.src ? img : img.img ? { src: img.img } : { src: img };
  const dataSrc = data.src;

  name = name  ? name.toLowerCase() : `${website.name} Mapped Image`;
  alt = alt ? alt : `${website.name} Mapped Image`;
  classes = classes !== {} ? ' '+classes  :  '';

  const size = sizeObj === true ? { width: data.width, height: data.height }
    : sizeObj !== undefined && sizeObj !== true && sizeObj !== false ? imageSizeObj(sizeObj) : false;

  const ImageMap = () => {
    return size ?
      <img
        className={"img-map"+classes}
        alt={alt}
        src={dataSrc}
        useMap={`#${name}`}
        width={size.width}
        height={size.height} /> :
      <img
        className={"img-map"+classes}
        alt={alt}
        src={dataSrc}
        useMap={`#${name}`} />
  }

  const clickie = (name) => {
    console.log(`You clicked on ${name}`)
  }

  const AreaMap = ({ areaArr, onClick }) => {
    let output = [];

    for(let i=0; i < areaArr.length; i++) {
      let shape = areaArr[i].shape;
      let coords = areaArr[i].coords;
      let alt = areaArr[i].alt;
      let href = areaArr[i].href;
      
      if(onClick === true) {
        output.push(
          <area shape={shape}
            coords={coords}
            alt={alt}
            onClick={() => clickie(alt)}
            key={name+'-'+i} />)
      } else {
        output.push(
          <area shape={shape}
            coords={coords}
            alt={alt}
            href={href}
            onClick={onClick}
            key={name+'-'+i} />)
      }
    }
    return output;
  }

  return(<>
    <ImageMap />
    <map name={name}>
      <AreaMap areaArr={areaObj} onClick={onClick} />
    </map>
  </>)
}

export default ImageMap;