import { useEffect, useId, useRef, useState } from 'react';

import DefaultLayout from '../templates/DefaultLayout';
import { MiCon, SvgIcon } from '../components/elements/Icons';

import useWindowSize from '../hooks/useWindowSize';
import { colorMatrix } from '../components/colorize/config/colorMatrix';

import website from '../config/site-data.json';
import siteImages from '../config/site-images.config';

import test from '../public/images/test/blacksabbath.jpeg';
import test2 from '../public/images/slides/img1.png';
import { isValidMatrix } from '../components/colorize/config/isValidMatrix';

const Images = () => {
  const title = 'Image Test';

  const Playground = ({ children }) => {
    const pg = {
      style: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
    return (<>
      <div style={pg.style}>
        { children }
      </div>
    </>)
  }

  console.log(siteImages);
  console.log(SvgIcon());

  console.log(test)
  console.log(performance.now())
  
  useEffect(() => {
      window.onscroll = function (e) {  
        console.log(true)
        // called when the window is scrolled.  
    }
  } )

  const FilteredImage = ({ imageUrl, filterType, filterValues }) => {

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
    const matrixValues = (value) => {
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

  return (<>
    <DefaultLayout title={title} swipeNav={false}>
      <Playground>
        {/* <MiCon icon='ios_share' /> */}
        <FilteredImage imageUrl={test2.src} filterType={'matrix'} filterValues={'coolAndCrisp'} />
      </Playground>
      {/* <Hero /> */}
    </DefaultLayout>
  </>)
}

export default Images;