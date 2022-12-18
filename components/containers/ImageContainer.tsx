import Image from "next/image";
import { FC, ImgHTMLAttributes } from "react";
import SafeNumber from "next";
import website from '../../config/site-data.json';

import styles from './styles/imageContainer.module.css';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  img: any;
  type: 'next' | 'img' | 'imageBackground';
  imageBackground?: {
    size?: 'cover' | 'contain' | undefined,
    repeat?: boolean | undefined,
    position?: 'top' | 'left' | 'right' | 'bottom' | 'center' | string | undefined,
    attachment?: 'scroll' | 'fixed' | 'local' | string | undefined,
  };
  classes?: {
    container?: string,
    image?: string,
    content?: string,
  };
  layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
  description?: string;
  id?: string;
  containerId?: string;
  allowHighlight?: boolean;
  priority?: any;
  useBlur?: boolean;
  drag?: boolean;
  contain?: boolean;
  }

const ImageContainer: FC<Props> = ({
  img, type, imageBackground, width, height, classes, layout, allowHighlight, description, id,
  containerId, priority, useBlur, drag, contain
}) => {
  // Check imported as Next image -- Next uses 'image.src' to get the location
  const data = img.src ? img : { src: img };
  const dataSrc = data.src;
  
  const highlight = allowHighlight === true ? '' : ' disable-highlight';

  width = width ? width : '';
  height = height ? height : !height && width ? width : '';
  const size = { width: width, height: height }

  const imageData = {
    classes: (classes.image || classes.container || classes.content) ? true : false,
    imgCls: classes.image ? ' '+classes.image : '',
    cntnrCls: classes.container  ? ' '+classes.container  : '',
    cntntCls: classes.content  ? ' '+classes.content  : '',
    width: width ? { width:width, maxWidth:width } : {},
    height: height ? height : '',
    layout: layout ? layout : 'responsive',
    description: description ? description : website.name+" Image",
    highlight: highlight,
    id: id ? id : '',
    priority: priority ? priority : '',
    blur: useBlur ? "blur" : "empty",
    drag: drag ? drag : false,
    contain: contain ? " contain" : '',
  }

  const containerStyles = size ? { width: size.width, height: size.height ? size.height : size.width } : {};

  const ImageBkg = () => {
    const imgbkg = imageBackground
    const imgRepeat = imgbkg.repeat === undefined || imgbkg.repeat === false ? false : true;
      const repeat = imgRepeat === true ? 'repeat' : 'no-repeat';
    const attachment = imgbkg.attachment && imgbkg.attachment !== 'fixed'
      ? imgbkg.attachment
      : 'fixed';
    const position = imgbkg.position && imgbkg.position !== 'center'
      ? imgbkg
      : 'center';
    const imgBkgStyles = {
      background: `url("${img.src}") ${position} / ${repeat} ${attachment} ${position}`,
      backgroundSize: 'cover',
    }
    return (
      <div className={styles.imgBkgContainer}>
        <div className={styles.image} style={imgBkgStyles} />
        <div className={styles.content}></div>
      </div>
    )
  }
  
  return (
    <div className={"image-container"+imageData.cntnrCls+imageData.contain+ imageData.highlight}
      style={containerStyles}
      id={containerId}>

      {size !== undefined && type === 'next' ?
        <Image
          width={Number(width)}
          height={Number(height)}
          className={"image-class"+imageData.imgCls}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          placeholder={useBlur?'blur':'empty'}
          draggable={imageData.drag}
          priority={imageData.priority} />
      : size === undefined && type === 'next' ?
        <Image
          className={"image-class"+imageData.imgCls}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          placeholder={useBlur?'blur':'empty'}
          draggable={imageData.drag}
          priority={imageData.priority} />
      : size === undefined && type === 'imageBackground' ?
        <ImageBkg />
      : <img
          className={"image-class"+imageData.imgCls}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          draggable={imageData.drag} />}

    </div>
  )
      
}

export default ImageContainer;