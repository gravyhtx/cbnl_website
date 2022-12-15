import Image from "next/image";
import website from '../../config/site-data.json'

const ImageContainer = (
  img: any,
  width?: any,
  height?: any,
  size?: any | any[],
  useNext?: boolean,
  containerClasses?: string,
  imgClasses?: string,
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined,
  allowHighlight?: boolean,
  description?: string,
  id?: string,
  containerId?: string,
  priority?: any,
  useBlur?: boolean,
  drag?: boolean,
  contain?: boolean
  ) => {
  // Check imported as Next image -- Next uses 'image.src' to get the location
  const data = img.src ? img : { src: img };
  const dataSrc = data.src;

  useNext = useNext === false ? false : true;
  size = size ? size : false;
  const highlight = allowHighlight === true ? '' : ' disable-highlight';

  const imageData = {
      containerClasses: containerClasses ? ' '+containerClasses : '',
      imgClasses: imgClasses ? ' '+imgClasses : '',
      width: width ? { width:width, maxWidth:width } : {},
      height: height ? height : '',
      layout: layout ? layout : 'responsive',
      description: description ? description : website.name+" Image",
      highlight: highlight,
      id: id ? id : '',
      priority: priority ? priority : '',
      blur: useBlur ? "blur" : "empty",
      drag: drag ? drag : false,
      contain: contain ? " contain" : ""
  }

  const containerStyles = size ? { width: size[0], height: size[1] ? height : width } : {};
  
  return (
    <div className={"image-container"+imageData.containerClasses+imageData.contain+ imageData.highlight}
      style={containerStyles}
      id={containerId}>

      {size !== false && useNext ?
        <Image
          width={size[0] ? size[0] : "100%"}
          height={size[1] ? size[1] : "100%"}
          className={"image-class"+imageData.imgClasses}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          placeholder={useBlur?'blur':'empty'}
          draggable={imageData.drag}
          priority={imageData.priority} />
      : size === false && useNext ?
        <Image
          className={"image-class"+imageData.imgClasses}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          placeholder={useBlur?'blur':'empty'}
          draggable={imageData.drag}
          priority={imageData.priority} />
      : <img
          className={"image-class"+imageData.imgClasses}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          draggable={imageData.drag} />}

    </div>
  )
      
}

export default ImageContainer;