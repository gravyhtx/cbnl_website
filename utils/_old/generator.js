import { checkType, checkForWords, listOfWords } from "../validation";

/////////////////////////////
// SIMPLE NUMBER FUNCTIONS //
/////////////////////////////


// RANDOMIZE SHORTCUT
export const randomize = (n) => {
	return Math.floor(Math.random() * n);
}

// HEADS... OR TAILS?
export const cointoss = () => {
  let n = randomize(2);
  let bool = n === 0 ? true : false;
  return bool;
};

// RANDOMLY MAKE A NUMBER POSITIVE OR NEGATIVE
export const posNeg = (n) => {
  return (n?n:1)*(Math.round(Math.random()) * 2 - 1)
}

// ROLL A RANDOM NUMBER -- ASSIGN IT WHEREVER YOU WANT ACROSS PAGES!
export const luckyRoll = (n) => {
  let output = randomize(n)+1;
  localStorage.setItem("luckyNumber", output);
  return output;
};

// TRUNCATE TO DECIMAL PLACE
export const truncate = (num, decimalPlaces) => {    
  var numPowerConverter = Math.pow(10, decimalPlaces || 1); 
  return ~~(num * numPowerConverter)/numPowerConverter;
}

// ROUND TO NEAREST SPECIFIED MULTIPLE
export const roundToMultiple = (num, multiple) => {
  const m = multiple || 5;
  return Math.round(num / m) * m;
}

// RANDOM VALUE FROM BELL CURVE
export function randomBell(multiplier, min, max, skew) {

  multiplier=(multiplier===true)?100:(typeof multiplier === 'number')?multiplier:undefined;
  min=min?min:0;
  max=max?max:1;
  skew=skew?skew:1;

  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = randomBell(min, max, skew) // Resample between 0 and 1 if out of range
  } else {
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return multiplier ? Math.floor(num*multiplier) : num;
}

// CLAMP NUMBER WITHIN SPECIFIED RANGE
export const numberClamp = (num, min, max) => {
  // Example...
  //  numberClamp(123,50,100) || Output: 100
  min = min ? min : 0;
  max = max ? max : 100;
  return Math.min(Math.max(num, min), max);
};

// HANDLE EVEN/ODD VALUES
//  ** Need to figure out handling non-whole number **
export const numberIsEven = (number) => {
  return number % 2 == 0 ? true : false;
}

export const numberIsOdd = (number) => {
  return number % 2 == 0 ? false : true;
}

export const makeNumberEven = (number) => {
  return number % 2 == 0 ? number : number+1;
}

export const makeNumberOdd = (number) => {
  return number % 2 == 0 ? number+1 : number;
}



////////////////////////
// ROUNDING FUNCTIONS //
////////////////////////

// PRECISION ROUNDING (Round things like "1.005")
export const precisionRound = (num) => {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

// GAUSSIAN ROUNDING (Round to the nearest even number)
export const gaussRound = (num, decimalPlaces) => {
  var d = decimalPlaces || 0,
  m = Math.pow(10, d),
  n = +(d ? num * m : num).toFixed(8),
  i = Math.floor(n), f = n - i,
  e = 1e-8,
  r = (f > 0.5 - e && f < 0.5 + e) ?
  ((i % 2 == 0) ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}



/////////////
// STRINGS //
/////////////

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// CAPITALIZE MULTIPLE WORDS IN A STRING OR ARRAY
// Make Override List work
export const capitalizeWords = (input, titleCase, excludeWordsList, overrideList) => {

  // Check string to see if there are multiple words in a string. Checks to see if there
  // is at least one space, excluding leading and training spaces.
    const checkForMultipleWords = input.trim().indexOf(' ') != -1;
    const checkForArray = checkType(input, "array");
    const splitString = input.split(" ");
    const arr = checkForMultipleWords ? splitString : checkForArray ? input : [];

  // If input is just a single word and no reference checks need to be performed then output
  // then skip the rest and just return the word capitalized.
  if(checkType(input, "string") && !checkForMultipleWords && !titleCase && !overrideList) {
    return capitalizeWord(input);
  }

  // Make output for string of words or an array of words & set checks
  let capsArr = [];
  const overrideWords = overrideList && overrideList !== undefined && overrideList.length ? overrideList : false;
  let titleArray = overrideWords
    ? removeFromArray(listOfWords("titleCase"), overrideList)
    : listOfWords("titleCase");

  const wordsToCheck =
    (titleCase === true || titleCase) && excludeWordsList
      ? excludeWordsList.concat(titleArray)
    : titleCase || (titleCase === true && !excludeWordsList)
      ? titleArray
    : false;
  
  // Loop through words array to check and exclude in capitalization
  for (let i = 0; i < arr.length; i++) {
    const word = arr[i].toLowerCase();
    // Need to make override list work, add list of words to capitalize all letters, and more...
    if (checkType(word[i], 'number')) {
      capsArr.push(word);
      continue;
    }

    if 
      ((i !== 0 && titleCase === true && checkForWords(word, wordsToCheck, true))
      || (titleCase === false && excludeWordsList && checkForWords(word, excludeWordsList, true) === true)
      || (i !== 0 && titleCase === true && excludeWordsList && checkForWords(word, wordsToCheck, true) === true) )
        { capsArr.push(word); }
    else
      { capsArr.push(capitalizeWord(word)); }
  }

  // If capitalized words array worked then the new output is a new string from 'capsArr'
    const output = capsArr ? capsArr.join(" ") : false;
  // Return the new string if it exists
    return output !== false ? output : capitalizeWord(input);
}

// TITLE CASE
// Capitalizes the first letter in the words of a string
export const titleCase = (input, excludeWordsList, overrideList) => {
  return capitalizeWords(input, true, excludeWordsList, overrideList);
}

// REMOVE ACCENTS IN A WORD
export const removeWordAccents = (word) => {
  // Split accent from letters into 2 separate characters
  const splitAccent = Array.from( word.normalize( 'NFD' ) );
  let output = '';
  splitAccent.map(char => {
    // Only push letters and numbers, accents will be ignored
    if(!char.match(/[^a-z0-9]/gi, '')){
      output += char;
    }
  })
  return output;
}

// REMOVE ACCENTS IN A STRING -- Multiple words (follows same structure as 'capitalizeWords')
export const removeAccents = (input) => {
  const checkForMultipleWords = input.trim().indexOf(' ') != -1;
  const checkForArray = checkType(input, "array");
  const splitString = input.split(" ");

  const inputArray = checkForMultipleWords ? splitString : checkForArray ? input : [];

  if(checkType(input, "string") && checkForMultipleWords === false) {
    return removeWordAccents(input);
  }

  let normalizedWords = [];

  for (let i = 0; i < inputArray.length; i++) {
    const word = inputArray[i];
    normalizedWords.push(removeWordAccents(word))
  }

  const output = capsArr ? capsArr.join(" ") : false;
  return output !== false ? output : removeWordAccents(input);
}

export const unicodeToChar = (code) => {
  const uPlus = code.match(/u\+1/g);
  const split = uPlus ? code.split(uPlus[0]) : '';
  const regex = '\\'+`u{${split[1]}}`;
  const normal = code.replace(/\\u[\dA-F]{4}/gi, 
         function (match) {
              return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
         });

  return regex ? new RegExp(regex) : normal;
}


// RANDOM 14 CHARACTER STRING
export const randomString = ()  => {
  // Output a random 14 character string with uppercase/lowercase letters and numbers 
  return Math.floor((Math.random()*Math.pow(10,16))).toString(16)
}



///////////////////////
// COMPARE & SHUFFLE //
///////////////////////

// "THE COMPARE FUNCTION" -- Used in "ARRANGE NUMBERS" function 
export const compare = (reverse, random) => {
  // Replaces return statement in `arr.sort(function(a, b){return a-b})`
  if(reverse === "random" || random) {
    return (a,b) => (0.5 - Math.random()) }
  else {
    return (a,b) => reverse === true ? b-a : a-b }
}

// GET AVERAGE OF NUMBERS IN AN ARRAY
export const average = (numberArray) => {
	const avg = numberArray.reduce((a,b) => a+b);
	return avg;
}

// COMPARE OBJECTS FOR PERCENT MATCH
export const compareObjects = (objA, objB) => {
	// Get number of items in each object
	const aLength = Object.keys(objA).length;
	const bLength = Object.keys(objB).length;
	// Get "smaller" number, set the other as "larger" number
	const smaller = aLength < bLength ? objA : objB;
	const larger = smaller === objA ? objB : objA;
	// Check all objects for any matches in key/value pairs
	const count = Object.keys(smaller).reduce((acc, val) => {
		if(Object.keys(larger).includes(val)){
			if(larger[val] === smaller[val]){
				return ++acc;
			}};
	  	return acc;
	}, 0); // << let 'acc' increment from '0'
	return (count / Math.min(aLength, bLength)) * 100;
};


// MOST FREQUENTLY USED VALUE
export const mostFreqValue = (arr) => {
  // Find the most common value in an array
  // Ex.
  //  const arr = [1,2,4,1,5,2,1];
  //  mostFreqVal(arr) = 1
  if (arr.length == 0) return null;
  return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

// PERFECT NUMBER SHUFFLE (aka "Fisher Yates Shuffle")
export const shuffle = (array) => {
  for (let i = array.length -1; i > 0; i--) {
    let j = randomize(i);
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
  return array;
}

// SHUFFLE STRING ORDER
export const shuffleStr = (str) => { // Randomizes character order of a string
  const arr = str.split('');
  str = shuffleArr(arr);
  const output = str.join('');
  return output;
}

// SHUFFLE ARRAY ORDER
export const shuffleArr = (array) => {
  // Get number of indexes to replace
  let index = array.length;
  let randomIndex;
  while (index !== 0) {
    // Randomly choose from available elements.
    randomIndex = randomize(index);
    index--;
    // Replace current index with random element.
    [array[index], array[randomIndex]] =
    [array[randomIndex], array[index]];
  }
  return array;
}

// SHUFFLE LIKE DECK OF CARDS -- Split in half, Shuffle one at a time, Split again
export const cardShuffle = (array, setSplit, bellSplit, tarot) => {
  tarot = tarot === true ? true : false;
  // console.log(tarot)
  // First Split
  const split = splitArray(reverseArr(array), bellSplit?"bell":false, setSplit);
    // Reverses order of deck to keep output in same order since loop starts with the end
    // so that `pop()` can be used to remove each item. Still would be the same result if
    // it were to start from the "bottom of the deck".
  const len = array.length;

  let output = [];
  let setA = split[0];
  let setB = split[1];

  // Shuffle
  for(let i = len; i > 0; i--) { // Emulate odds of left vs. right side being shuffled in
    let sel = cointoss();
    if((sel && setA.length) || !setB.length) {
      output.push(setA[setA.length-1]);
      setA.pop();
    } else {
      if(tarot) {
        setB[setB.length-1].reversed = !setB[setB.length-1].reversed;
      }
      output.push(setB[setB.length-1]);
      setB.pop();
    }
  }
  
  // Second Split
  output = splitArray(output, bellSplit?"bell":false, setSplit);
  output = output[1].concat(output[0]); // Combine sets
  
  return output;
}

// THE "SHUFFLE CARDS" FUNCTION -- w/ Rounds, Computer Shuffle, & Split options
export const shuffleCards = (array, rounds, moreRandom, split, tarot) => {
  tarot = tarot === true ? true : false;

  // Using "bell" for split will give best approximation for a true "human middle-split"
  //    -- tends to be close to middle within a range within a bell curve
  // Using a number will be split at an exact point for every shuffle
  //    -- minimum is 1, maximum is 1 less than the array length
  // No split will split in the middle or, when odd, setA will be weighted with more

  const bellSplit = split === "bell" || split === true ? true : false;
  const setSplit = !bellSplit && typeof split === 'number' && !Number.isNaN(split)
    ? split : false;

  if(rounds > 100){
    rounds = 100;
    moreRandom = true;
  }

  let output = cardShuffle(array, setSplit, bellSplit, tarot);

  if (rounds > 1) {
    for(let i = 0; i < (rounds-1); i++) {
      output = cardShuffle(output, setSplit, bellSplit, tarot);
    }
  }

  if(moreRandom) {
    output = shuffle(output);
  }

  return output;
}



/////////////////////
// SORT & ORGANIZE //
/////////////////////

// ARRANGE NUMBERS (Organize numbers in order lowest to highest or highest to lowest)
export const arrangeNumbers = (numArr, reverse, random) => {
  return numArr.sort(compare(reverse, random));
}

// SIMPLE MAP FUNCTION (From an array of items)
export const simpleMap = (items, classes, tag, id) => {
  const elType = tag ? tag.toLowerCase() : `div`;
  return (<>
    {items.map((item, index) => {
			tag
				? `<${elType} className=${classes} key=${index} id=${id ? id+index : ''}>${item}</${elType}>`
				: <div className={classes} key={index} id={id ? id+index : ''}>{item}</div>
		})}
  </>)
}

// USE AN ARRAY OF OBJECTS TO RETURN ELEMENTS WITH UNIQUE TAGS AND/OR CLASSES IN MAP FUNCTION
export const complexMap = (itemsArray) => {
  return (<>
    {itemsArray.map((item, index) => {
      `<${item.tag.toLowerCase()} className=${item.classes} key=${index}>${item.content}</${item.tag.toLowerCase()}>`
    })}
  </>)
}

// REVERSE ORDER OF AN ARRAY
export const reverseArr = (input) => {
  var output = new Array;
  if(input){
      for(var i = input.length-1; i >= 0; i--) {
        output.push(input[i]);
    }
  }
  return output;
}

// REMOVE ITEMS FROM AN ARRAY
export const removeFromArray = (array, removeItems) => {
  return array.filter(value => !removeItems.includes(value));
}



//////////////////////////
// SPLIT & SELECT ARRAY //
//////////////////////////

// SPLIT ARRAY INTO TWO SEPARATE ARRAYS -- Weighted on FIRST half

// This was initially made just to output an array with two halves whether it is even or odd, but
// now it does much more! You can choose the half split, there's a "human" split which splits it
// randomly on a bell curve somewhere around the middle, you can set 'randomSplit' to true and it
// it chooses a number halfway between 0 and the halfway point to be added or subtracted to the
// 'half' value, or choose an exaxt point to split.

// If only 'list' is entered this will just split the array in half as was initially intended. You
// can also add padding to ensure the length of each array is not less than a specified value to
// make sure the set split is within a specified range, especially useful when that value and/or the
// halfway point is unknown.

export const splitArray = (list, randomSplit, setSplit, clampPad, outputObj) => {

  const half = Math.ceil(list.length / 2); // The first array will get the extra item if array is odd
  const randomVal = randomize(Math.ceil(half / 2)); // Random value at half of half
  const split = cointoss() ? half+randomVal : half-randomVal;
  const splitAt = randomSplit ? split : randomSplit === "bell" ? randomBell(list.length) : half;

  const padding = clampPad && typeof clampPad === 'number' && !Number.isNaN(clampPad) ? clampPad : 0;

  const min = 1+padding; // Each array will have at least ONE item plus the 'clampPad' value
  const max = (list.length-1)-padding;

  setSplit = ( setSplit || setSplit ) === 0 ? numberClamp(
      setSplit, numberClamp(min, 1, half-1), numberClamp(max, half+1, list.length-1)
    ) : false; // Ensure split remains between 1 and half with 'clampPad' value
  
  const a = list.slice( 0, setSplit ? setSplit : splitAt );
  const b = list.slice( setSplit ? setSplit : splitAt );

  // Output an array unless 'outputObj' is true
  return outputObj === true ? { a: a, b: b } : [ a, b ];
}

// RETURN ONE ITEM (or set/object) FROM AN ARRAY or ARRAY OF ARRAYS
export const select = (el) => {
  const output = el[randomize(el.length)];
  return output[randomize(output.length)] ? output[randomize(output.length)] : el[randomize(el.length)];
};

// GET MULTIPLE RANDOM ITEMS FROM AN ARRAY OF ARRAYS
export const randomSelection = (arraySet, selectIndexesArray) => {
  let output = [];
  if (selectIndexesArray) {
    for (let i=0; i < selectIndexesArray.length; i++) {
      const n = selectIndexesArray[i];
      if(checkType(n,'number')) {
        output.push(arraySet[n]);
      } else {
        console.warn(`All selected values must be numbers! Value
        "${selectIndexesArray[i]}" at index ${i} was skipped...`)
      }
    }
  } else {
    output=arraySet;
  }
  return output[randomize(output.length)];
}

// RETURN A SINGLE ELEMENT OR SET FROM AN ARRAY OF ARRAYS

  // "arraySet" is the array of arrays being sorted

  // "outputArray" is boolean
  //    true = output entire array set (default)
  //    false = output one element from array set... just like `select(el)` function above ^^^

  // "arraySelect" is an array conatining indexes of array sets to be considered
  //    use to include only specific array sets from the array of arrays ("arraySet")

  //   CHOOSE ONE ARRAY SET FROM AN ARRAY OF ARRAYS
  //   Example (selecting only indexes 0 and 2 from array):
  //     const arr = [["1a","2a"],["1b"],["1c","2c","3c"],["4b","4c"]]
  //     arrayEl(arr, true, [0,2])
  //     OUTPUT -- ["1c","2c","3c"] -- Selected 'arr[2]' from indexes 0 and 2

export const arrayEl = (arraySet, outputEntireSet, selectIndexesArray) => {
  // Default to 'randomSelection' unless 'outputEntireSet' is false
  outputEntireSet = outputEntireSet !== false ? true : false;
  // Choose one set from the 'arraySet'
  const randomOutput = randomSelection(arraySet, selectIndexesArray);
  // Output an entire set or a single item from the set
  return outputEntireSet ? randomOutput : select(arraySet);
}



///////////////
// ITERATION //
///////////////

// REPEAT ACTIONS

// Ex.
//  let labels = [];
//  repeater(3, i => { labels.push(`Unit ${i + 1}`})
//  console.log(labels) ==>> ['Unit 1', 'Unit 2', 'Unit 3']

export const repeater = (n, action) => {
  for(let i = 0; i < n; i++) {
    action(i);
  }
}

//  OBJECT MAP
export const objectMap = (object, mapFn) => {

  // objectKey = objectKey ? objectKey : false;
  // mapFn = mapFn ? mapFn : (_, item) => item[objectKey];

  return Object.keys(object).reduce((result) => {
    result[key] = mapFn(object[key]);
    return result;
  }, {})
}

export const objMap = (object, mapFn) => {
  Object.keys(object).forEach(
    (item, index) => { return mapFn(item, index) })
}

// More Object Iteration...
// https://medium.com/sanjagh/iterating-over-javascript-objects-declaratively-or-how-to-map-filter-and-reduce-on-objects-d179cd40d935

// const fruits = {
//   apple: { qty: 300, color: "green", name: "apple", price: 2 },
//   banana: { qty: 130, color: "yellow", name: "banana", price: 3 },
//   orange: { qty: 120, color: "orange", name: "orange", price: 1.5 },
//   melon: { qty: 70,  color: "yellow", name: "melon", price: 5 }
// };

export const mapBy = (obj, objKey, func) => {

  // Use with a custom function:
  //  const myFruits = map(fruits, (_, fruit) => fruit.color);
  //  OUTPUT:
  //      { apple: 'green', banana: 'yellow', orange: 'orange', melon: 'yellow' }

  // ...or with just the object key:
  //  const myFruits = map(fruits, 'price');
  //  OUTPUT:
  //    { apple: 2, banana: 3, orange: 1.5, melon: 5 }

  objKey = objKey ? objKey : false;
  func = func ? func : (_, item) => item[objKey];
  
  return Object.entries(obj).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]: func(key, value)
    }), {}
  );
}

// FILTER OBJECT WITH A KEY & VALUE
export const filterBy = (obj, objKey, filterVal, lessOrGreater, func) => {
  // Use with a custom function:
  // const myFruits = filter(fruits, false, false, (_, fruit) => fruit.price <= 2);
  //  OUTPUT:
  //    { apple: { qty: 300, color: 'green', name: 'apple', price: 2 },
  //    orange: { qty: 120, color: 'orange', name: 'orange', price: 1.5 } }

  // ...or with just the filter value:
  //  OUTPUT:
  //    const myFruits = map(fruits, 'qty', 130);
  //    { apple: { qty: 300, color: 'green', name: 'apple', price: 2 }
  func = func ? func : false;
  filterVal = filterVal ? filterVal : false;
  lessOrGreater = lessOrGreater ? lessOrGreater : false;

  if(filterVal !== false && lessOrGreater === false && func === false) {
    func = (_, item) => item[objKey] = filterVal;
  } else if(filterVal !== false && lessOrGreater === ">" && func === false) {
    func = (_, item) => item[objKey] > filterVal;
  } else if(filterVal !== false && lessOrGreater === "<" && func === false) {
    func = (_, item) => item[objKey] < filterVal;
  } else if(filterVal !== false && lessOrGreater === ">=" && func === false) {
    func = (_, item) => item[objKey] >= filterVal;
  } else if(filterVal !== false && lessOrGreater === "<=" && func === false) {
    func = (_, item) => item[objKey] <= filterVal;
  } else if(filterVal === false && lessOrGreater === false && func) {
    func = func;
  }

  return Object.entries(obj).reduce(
    (prev, [key, value]) => ({
      ...prev,
      ...( func(key, value) ? { [key]: value } : {} )
    }), {}
  );
}

// TURN OBJECT INTO ARRAY OF OBJECTS
export const reduceBy = (obj, func, initialValue) => {
// const myFruits = reduce(fruits, (prev, _, fruit) => [...prev, fruit], []);
//    [ { qty: 300, color: 'green', name: 'apple', price: 2 },
//      { qty: 130, color: 'yellow', name: 'banana', price: 3 },
//      { qty: 120, color: 'orange', name: 'orange', price: 1.5 },
//      { qty: 70, color: 'yellow', name: 'melon', price: 5 } ]
  func = func ? func : (prev, _, item) => [...prev, item];
  return Object.entries(obj).reduce(
    (prev, [key, value]) => func(prev, key, value),
    initialValue ? initialValue : []
  );
}








export const lorem = (times) => {
  const ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.`
  return (ipsum)
}