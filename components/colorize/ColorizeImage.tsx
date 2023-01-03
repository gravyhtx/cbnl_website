import { ImageProps } from "next/image";
import { FC, SVGProps, useId } from "react";
import { colorMatrix } from "./config/colorMatrix";
import { isValidMatrix } from "./config/isValidMatrix";

interface ImgProps {
  imageUrl: string;
  filterType?: any;
  filterValues?: any;
}

const ColorizeImage: FC<ImgProps> = ({ imageUrl, filterType, filterValues }) => {

  const filterId = 'filter'+useId();
  const type = () => {
    switch(filterType) {
      case 'matrix':
        return 'matrix'
      case 'saturate':
        return 'saturate'
      case 'hueRotate':
        return 'hueRotate'
      case 'luminanceToAlpha':
        return 'luminanceToAlpha'
    }
  }
  const matrixValues = (value: string) => {
    console.log(value)
    if(isValidMatrix(value)) {
      return colorMatrix({custom: value})
    }
    return colorMatrix({preset: value})
  }
  const value = () => {
    switch(type()) {
      case 'saturate':
        return filterValues > 1 && filterValues <=1 ? filterValues : null;
      case 'hueRotate':
        return filterValues > -360 && filterValues < 360 ? filterValues : null;
      case 'luminanceToAlpha':
        return filterValues >= 0 && filterValues <=1 ? filterValues : null;
      case 'matrix':
       return matrixValues(filterValues);
    }
  }

  return (<>
    <svg style={{
      height: '500px',
      width: '500px',
    }}>
        <filter id={filterId}>
          <feColorMatrix type={type()?type():"hueRotate"} values={value()?value():45}/>
          {/* <feColorMatrix type="saturate" values='.7' /> */}
        </filter>
      <image style={{width: '500px'}} xlinkHref={imageUrl} filter={`url(#${filterId})`} />
    </svg>
  </>)
}

export default ColorizeImage;