import { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import useSWR from "swr";
import { checkType } from "./validation";
import { resolve } from "styled-jsx/css";

// import { readFileSync } from 'fs';



////////////////////
// DATE FUNCTIONS //
////////////////////

const date =  new Date();

// GET CURRENT YEAR
// Input a number 1 to 4 (or -4 to -1) to specify the number of digits to output
export const getYears = (int) => {
  const year =  date.getFullYear().toString();
  const getLast = int && int !== true && int <= 4 && int >= 1
      ? -1*int
    : int && int !== true && int <= -1 && int >= -4
      ? int
    : int === true ? -2 : false;
  return getLast ? year.slice(getLast) : year;
}

// GET CURRENT MONTH
export const getMonths = (addZeros, toString) => {
  toString = toString === true ? true : false;
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = addZeros && (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; 
  return toString === false ? month : months[date.getMonth()];
}

// GET CURRENT DATE
export const getDays = (addZeros) => {
  const today = date.getDate();
  return addZeros && today < 10 ? '0' + today.toString() : today.toString();
}

// GET HOURS/MINUTES IN CALCULATION OR MILITARY TIME
// Ex. 14hr 30min = 14.5 or 1430
export const getTimeCalc = (hour, minutes, military) => {
  const total = 60;
  const min = !Number.isNaN(minutes) && minutes <= 60 ? Number(minutes) : 0;
  const hr = !Number.isNaN(hour) && ((hour < 24 && min) || (hour === 24 && min === 0)) ? Number(hour) : 0;

  const timeCalc = hr + (min / total);

  const milMin = min > 10 ? min.toString() : min < 10 && min !== 0 ? '0' + minutes.toString() : '00';
  const milHr = hr < 10 ? '0'+hr.toString() : hr.toString();
  const milTime = milHr + milMin;

  return military === true ? milTime : timeCalc.toFixed(2);
}

// FORMAT DATE BASED ON 'FORMAT' INPUT
export const formatDate = (inputDate, format) => {
  inputDate = inputDate ? inputDate : false;
  format = format === true ? true : format && format !== true ? format.toLowerCase() : undefined;

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const toDate = new Date(inputDate);
  const toYear = inputDate ? toDate.getFullYear() : today.getFullYear();
  const toMonth = inputDate ? toDate.getMonth()+1 : today.getMonth()+1;
  const toDay = inputDate ? toDate.getDate() : today.getDate();

  if(inputDate === true && format === false) {
    return today.toLocaleDateString();
  }
  if(inputDate === false && format === true) {
    return today.toISOString();
  }
  if(inputDate === true && format === true) {
    return today.toDateString();
  }

  switch (format) {
    case false:
    case 'number':
      const numberFormat =
        (toMonth < 10 ? '0'+toMonth : toMonth).toString() +
        (toDay < 10 ? '0'+toDay : toDay).toString() +
        toYear.toString().slice(-2);
      return inputDate === false
        ? getMonths(true)+getDays(true)+getYears(2)
        : Number(numberFormat);
        // 061322
    case true:
    case 'local':
    case 'locale':
      return inputDate === false
        ? today.toLocaleDateString()
        : toDate.toLocaleDateString();
        // "6/13/2020"
    case 'str':
    case 'string':
      return inputDate === false
        ? today.toDateString()
        : toDate.toDateString();
        // "Sun Jun 13 2020"
    case 'iso':
      return inputDate === false
        ? today.toISOString()
        : toDate.toISOString();
        // "2020-06-13T18:30:00.000Z"
    case 'utc':
      return inputDate === false
        ? today.toUTCString()
        : toDate.toUTCString();
        // "Sat, 13 Jun 2020 18:30:00 GMT"
    case 'obj':
    case 'object':
      return { month: toMonth, day: toDay, year: toYear }
      // {month: 6, day: 13, year: 2020}
    default:
      return toDate.getTime();
  }
}

// CHECK FOR VALID DATE FORMAT
// Includes Date object with {month,day,year}
// To check if it is a valid "new Date" object specifically, use "checkType(inputDate,'date')" instead
export const valiDate = (inputDate) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (checkType(inputDate, 'obj')) {
    const d = {m:inputDate.month,d:inputDate.day,y:inputDate.year}
    return regex.test(`${d.m}/${d.d}/${d.y}`)
  }
  
  const date = checkType(inputDate,'date') ? inputDate : new Date(inputDate);

  if (date == 'Invalid Date') {
    return false;
  }

  const timestamp = date.getTime();

  if (!checkType(timestamp, 'number')) {
    return false;
  }

  return true;
}

// USE 'new Date(x)' TO VALIDATE
export function dateIsValid(date) {
  // date 
  if (
    typeof date === 'object' &&
    date !== null &&
    typeof date.getTime === 'function' &&
    !isNaN(date)
  ) {
    return true;
  }

  return false;
}

// CHECK IF DATE MATCHES TODAY'S DATE
export const isToday = (inputDate) => {
  const today = formatDate(true);
  const formatToday = (inputDate) => formatDate(inputDate,true);

  if (!checkType(inputDate, 'array')) {
    return formatToday(inputDate) === today;
  }

  if (checkType(inputDate, 'array')) {
    for(let i=0; i < inputDate.length; i++) {
      if(formatToday(inputDate[i]) === today) {
        return true;
      }
    }
  }

  return false;
}


////////////////////////
// SERVER SIDE CHECKS //
////////////////////////

// USE JTW AUTH
// export const authCheck = () => {
//   const token = Auth.loggedIn();
//   const authorized = token ? true : false;
//   return authorized;
// };



////////////////////////
// CLIENT SIDE CHECKS //
////////////////////////

// CHECK IF DEVICE IS MOBILE
export const isMobile = (checkScreenSize) => {
  checkScreenSize = checkScreenSize === true ? true : false;
  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || (checkScreenSize === true && window.matchMedia("only screen and (max-width: 760px)").matches) ) {
    return true;
  } else {
    return false;
  }
}

/////////////////
// RETURN DATA //
/////////////////

export const isEmpty = (data) => {
  if (data && (!isNaN(data) || data !== 0) && data !== undefined && data !== '' && (data !== [] || (checkType(data, 'array') && data.length))) {
    return false;
  }
  if (isNaN(data)) {
    return data
  }
  return true;
}

export const MapData = ({ data, DataMap }) => {
  return (<>{
    !isEmpty(data) &&
    data.map((item, index) => {
      return (
        <Fragment key={index}>
          <DataMap props={item} />
        </Fragment>
      )
    })
  }</>)
}


////////////////
// READ FILES //
////////////////

export const handleTxt = (file, outputArray, classes, id, tag) => {
  
  outputArray = outputArray === true ? true : false;

  const split = file.split('\n');
  let content = [];

  if(outputArray !== true) {
    split.forEach((el, index) => {
      id = id ? id + '-' + index : null;
      content.push(
        tag === 'span' ? <span id={id}>{el}</span>
        : tag === 'p' ? <p id={id}>{el}</p>
        : <div id={id}>{el}</div>
      );
    });
    return <>{content}</>;
  }
  else {
    return content;
  }
}


//////////////////////
// CONVERT ELEMENTS //
//////////////////////

export const canvasToDataUrl = ( canvasEl ) => {
  const dataUrl = canvasEl.toDataURL();
  return dataUrl;
}

export const canvasToImg = ( el, alt, classes, id ) => {
  const dataUrl = el.toDataURL();
  const img = document.write(`<img src="${dataUrl}" className=${classes} alt=${alt} id=${id} />`);
  return img;
}


/////////////
// COUNTER //
/////////////

export const counter = ( callback, delay, startVal ) => {

  startVal = startVal ? startVal : 0;

  function useInterval() {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
      savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  function count() {
    const [count, setCount] = useState(startVal);

    useInterval(() => {
      setCount(count + 1);
    }, 1000);
    
    return count;
  };
  
  count();

}



/////////////////////
// RETURN ELEMENTS //
/////////////////////

export const getPromise = async (file, setData) => {
  
  const readPromise = (data) => {
    return new Promise((res, rej) => {
      try {
        const output = readFile(data);
        res(output);
      }
      catch(err) {
        rej(new Error(err))
      }
    })
  }

  const res = await readPromise(file);

  if (setData) {
    setData(res);
  } else {
    return res;
  }

}

// RETURN AN EMPTY IMAGE
export const emptyImg = ( outputObject, outputImage ) => {
// outputObject = { height: 1000, width: 1000 } - or - boolean
// outputImage = {classes: 'image-classes', styles: { style1: value1, style2: value2 }}

  // Returns an empty 1x1 px Data PNG
  const url = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  
  const img = {
    classes: outputImage ? outputImage.classes : '',
    styles: outputImage ? outputImage.styles : {}
  }

  const height = outputObject.height ? outputObject.height : 2000;
  const width = outputObject.width ? outputObject.width : 2000;

  return (  outputImage && !outputObject ? <img className={img.classes} style={img.styles} src={url} />
          : outputObject && !outputImage ? { src: url, blurDataUrl: url, height: height, width: width }
          : url )
}

// CHECK IF IMAGE EXISTS
export const imageExists = (url) => {
  url = url.src ? url.src : url;
  const fetch = async () => axios.get(url).then(res => res.data);
  const { data, error } = useSWR(url, fetch);
  return data || !error ? true : error || !data ? false : undefined;
}