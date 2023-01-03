import slugify from 'sluga';
import isObject from 'isobject';

// CHECK ELEMENT TYPES
// Uses various methods to check if the given 'element' matches a 'type' (string)
export const checkTypeof = (variable, type) => {
  // Set Output
  let output;

  // Convert type to lowercase
  type = type ? type.toLowerCase().trim() : undefined;

  // Perform checks...
  output =
    // MULTIPLE ARRAYS
    type && (type === "arrays" || type === "arrayofarrays" || type === "array_of_arrays" || type === "multiarray"
    || type === "multi_array" || type === "multiple_arrays" || type === "multiplearrays")
    && Array.isArray(variable) && variable.length && variable[0].length

      ? output = {is: true, type: "arrays"}

    // ARRAY = TRUE
    : type && type === "array" && Array.isArray(variable)

      ? output = {is: true, type: "array"}

    // ARRAY = FALSE
    : type && type !== "array" && Array.isArray(variable)

      ? output = {is: false, type: "array"}

    // FUNCTION = TRUE
    : type && type === "function" && (typeof variable === "function" || variable instanceof Function)

      ? output = {is: true, type: "function"}

    // FUNCTION = FALSE
    : type && type !== "function" && (typeof variable === "function" || variable instanceof Function)

      ? output = {is: false, type: "function"}

    // REGEX = TRUE
    : (type && type === "regex" && variable instanceof RegExp)

      ? output = {is: true, type: "regex"}

    // REGEX = FALSE
    : (type && type !== "regex" && variable instanceof RegExp)

      ? output = {is: false, type: "regex"}

    // NUMBER = TRUE
    : type && type === 'number' && typeof type === 'number' && !Number.isNaN(variable)

      ? output = {is: true, type: "number"}

    // NUMBER = FALSE
    : type && type !== 'number' && typeof type === 'number' && !Number.isNaN(variable)

      ? output = {is: false, type: "number"}

    // STRING = TRUE
    : type && type === 'string' && type !== 'object' && typeof variable === 'string'

      ? output = {is: true, type: 'string'}

    // DATE = true (new Date)
    : type && Object.prototype.toString.call(variable) === '[object Date]'

      ? output = {is: true, type: 'date'}

    // NODE = TRUE
    : type && type === "node" && typeof variable === "object" && typeof variable.nodeType === "number"
      && typeof variable.nodeName==="string"

      ? output = {is: true, type: "node"}

    // NULL = TRUE
    : type && type === "null" && variable === null

      ? output = {is: true, type: "null"}

    // NULL = FALSE
    : type && type !== "null" && variable === null

      ? output = {is: false, type: "null"}

    // UNDEFINED = TRUE
    : type && type === "undefined" && variable === undefined

      ? output = {is: false, type: "undefined"}

    // UNDEFINED = FALSE
    : type && type !== "undefined" && variable === undefined

      ? output = {is: false, type: "undefined"}

    // ELEMENT = TRUE
    : type && type === "element" && (React.isValidElement(variable) ||
      (typeof variable !== "object" && variable !== null
      && variable.nodeType === 1 && typeof variable.nodeName==="string"))

      ? output = {is: true, type: "element"}

    // IMAGE = TRUE
    : type && type === 'image' && typeof variable === 'object' && "type" in variable && variable.type === 'img'

      ? output = {is: true, type: 'image'}

    // IMAGE = FALSE
    : type && type !== 'image' && type !== 'object' && typeof variable === 'object' && variable !== null
      && "type" in variable && (variable.type === 'img' || variable.type.name === 'Image')

      ? output = {is: false, type: 'image'}

    // PERCENTAGE = TRUE
    : type && type === 'percentage' && /^(\d+|(\.\d+))(\.\d+)?%$/.test(variable)

      ? output = {is: true, type: 'percentage'}
    
    // OBJECT = TRUE (Uses 'isobject' package -- https://github.com/jonschlinkert/isobject)
    : type && type !== 'object' && isObject(variable)

      ? output = {is: true, type: 'object'}

    // ALL ELSE... TRUE
    : type && typeof variable === type

      ? output = {is: true, type: typeof variable}

    // ALL ELSE... FALSE
    : type && typeof variable !== type

      ? output = {is: false, type: typeof variable}

    // ALL ELSE... UNDEFINED
      : output = {is: undefined, type: typeof variable}

  return output;

}

// Types:
//   Array = "array"
//   Undefined = "undefined"
//   Null =	"object" (reason)
//   Boolean = "boolean"
//   Number = "number"
//   BigInt = "bigint"
//   String = "string"
//   Symbol = "symbol"
//   Function = "function" (implements [[Call]] in ECMA-262 terms; classes are functions as well)
//   DOM Element = "element"
//   DOM Node = "node"
//   Any other object = "object"

// CHECK VARIABLE TYPES -- SHORTCUT!!!
export const checkType = (variable, type) => {
  variable = !variable ? false : variable;
  type = !type ? false : type;
  //  'Type' shortcuts
  if(type === 's' || type === 'str') {
    type = 'string'
  }
  if(type === 'o' || type === 'obj' || type ==='{}') {
    type = 'object'
  }
  if(type === 'a' || type === 'arr' || type === '[]') {
    type = 'array'
  }
  if(type === 'multiarr' || type === 'arrs' || type === '[[]]') {
    type = 'arrays'
  }
  if(type === 'big') {
    type = 'bigint'
  }
  if(type === 'd') {
    type = 'date'
  }
  if(type === 'f' || type === 'fun' || type === 'func') {
    type = 'function'
  }
  if(type === 'b' || type === 'bool' || type === '?') {
    type = 'boolean'
  }
  if(type === 'n' || type === 'num') {
    type = 'number'
  }
  if(type === 'p' || type === 'percent' || type === '%') {
    type = 'percentage'
  }
  if(type === 'sym') {
    type = 'symbol'
  }
  if(type === 'u' || type === 'und' || type === 'ud') {
    type = 'undefined'
  }
  if(type === 'e' || type === 'el') {
    type = 'element'
  }
  if(type === '<>') {
    type = 'node'
  }
  if(type === 'img') {
    type = 'image'
  }

  return type !== false && variable !== false
    ? checkTypeof(variable, type).is
  : type === false && variable !== false
    ? checkTypeof(variable)
  : !type && !variable
    ? undefined
    : undefined;
}


// CHECK SIZE FORMAT
export const sizeFormat = (input, allowNumberOutput, outputOnly, forceOutput, widthOnly) => {

  let output;

  outputOnly = outputOnly === false ? false : true;
  forceOutput = forceOutput === false ? false : true;

  allowNumberOutput = allowNumberOutput === true ? true : false;
  widthOnly = widthOnly === true ? true : false;

  const suffixes = ['px','rem','em','%','vw', 'ch'];
  const allowedHeights = ['vh', 'ex'];

  const allowedFormats = widthOnly === false ? [...suffixes, ...allowedHeights] : suffixes;
  
  if (checkType(input, 'number') && allowNumberOutput === true) {
    output = {is: true, size: input};
  }

  else if (checkType(Number(input), 'number') && allowNumberOutput === false) {
    output = {is: true, size: input+'px'}
  }

  else if (checkType(input, 'string')) {
    for(let i=0; i < allowedFormats.length; i++) {
      if(!input.endsWith(allowedFormats[i])) {
        output = {is: false, size: input};
      }
      if(checkType(Number(input.replace(allowedFormats[i], '')), 'number')) {
        output = {is: true, size: input};
      }
    }
  }

  const allElseFails = () => {
    if(checkType(input, 'string')) {
      return input.endsWith('w')
        ? 'vw'
      : input.endsWith('h')
        ? 'vh'
      : input.endsWith('p')
        ? 'px'
      : input.endsWith('r')
        ? 'rem'
      : input.endsWith('re')
        ? 'rem'
      : input.endsWith('e')
        ? 'em'
        : false
      }
      return false;
  }

  return outputOnly && output.is === true
      ? output.size
    : outputOnly && output.is === false && forceOutput === true && allElseFails !== false
      ? output.size.replace(/\D/g,'') + allElseFails
    : outputOnly && output.is === false && forceOutput === true && allElseFails === false
      ? output.size.replace(/\D/g,'') + 'px'
    : outputOnly && output.is === false
      ? false
      : output
  
}


export const checkSizeFormat = (input, allowNumberOutput) => {
  allowNumberOutput = allowNumberOutput === true ?  true : false;
  return sizeFormat(input, allowNumberOutput, false, false)
}


// VALIDATE EMAIL ADDRESSES
// API -- https://apilayer.com/marketplace/email_verification-api
export const validateEmail = (email) => {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const successMessage = "Email is valid."

  let errors = [];

  const errorMessage = errors.length > 0 ? errors.join(' ') : "";

  if (!email.match(emailFormat)) {
    errors.push("Please enter a valid email address.")
  }

  if (!errors.length && email.match(emailFormat)) {
    return { is: true, msg: successMessage }
  } else {
    return { is: false, msg: errorMessage }
  }
}

// VALIDATE PASSWORDS
export const validatePassword = (password, reEnterPassword, passwordMatch, complexPassword, specialCharacters, min, max, consecutiveLimit) => {
  
  // Ensure password is a string
  password = password.toString();

  // Determine if user must re-enter passwords. Defaults to 'false'. May enter 'false'
  // in 'reEnterPassword' and/or 'passwordMatch'
  passwordMatch = passwordMatch === false || reEnterPassword === false ? false : true;
  // Determine if it must be a complex password. Defaults 'false'.
  complexPassword = complexPassword === false ? false : true;

  // MIN & MAX DO NOT WORK RIGHT NOW
  min = checkType(min, 'number') ? min : min === false ? 1 : 6;
  max = checkType(max, 'number') ? max : max === false ? 200 : 20;

  consecutiveLimit = checkType(Number(consecutiveLimit), 'number') && Number(consecutiveLimit) > 1 ?
    Number(consecutiveLimit) : 2;

  // No white space
  const pwFormatSpaces = /^\S*$/;
  // 6 to 20 characters with at least one numeric digit, one uppercase an one lowercase letter
  const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  // Special characters
  // !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"|,.<>?\/\\~]/;
  
  let errors = [];
  let successMessage = "Password is valid!";

  // let pwStrength = useRef(0);

  if (passwordMatch === true && password.toString() !== reEnterPassword.toString()) {
    errors.push("Password fields do not match.");
  }

  if (complexPassword === false && (password.length < min || password.length > max
    || (passwordMatch && reEnterPassword.length < min)
    || (passwordMatch && reEnterPassword.length > max))) {
    errors.push(`Password must be between ${min} to ${max} characters.`);
  }
  
  if (complexPassword
    && ((pwFormat.test(password) === false || (passwordMatch && pwFormat.test(reEnterPassword) === false))
    || (password.length < min || password.length > max)
    || (passwordMatch && reEnterPassword.length < min)
    || (passwordMatch && reEnterPassword.length > max))) {
    errors.push(`Password must be between 6 to 20 characters with at least one numeric digit, one uppercase,
                 and one lowercase letter.`);
  }

  if (specialCharacters === true
    && (specialChars.test(password) === false
    || (passwordMatch && specialChars.test(reEnterPassword) === false))) {
    errors.push("Must have at least one special character.");
  }

  if (pwFormatSpaces.test(password) === false
    || (passwordMatch && pwFormatSpaces.test(reEnterPassword) === false)) {
    errors.push("Password cannot contain spaces.");
  }

  if (consecutiveChars(password, consecutiveLimit) === true
    || (passwordMatch && consecutiveChars(reEnterPassword, consecutiveLimit) === true)) {
    errors.push(`Password cannot have the same character repeated more than ${consecutiveLimit} times.`);
  }
  errors = errors ? errors.join(' ').replace(/\s+/g, ' ').trim() : '';
  
  // STRENGTH
  let strength = 0;

  // Pasword is at least minimum
  if(password.length < min && password.length > 8) {
    strength += 1;
  }
  // Pasword is more than minimum plus 4 (up to 32) and at least 12
  if(((min + (min / 2)) >= 12 && password.length >= (min / 2))
    || ((min + (min / 2)) <= 12 && password.length >= 12)
    || (password.length >= 32)) {
    strength += 1;
  }

  // Password has an uppercase and lowercase
  if(/^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password)) {
    strength += 1;
  }
  // Pasword has a number
  if(/^(?=.*[0-9]).*$/.test(password)) {
    strength += 1;
  }
  // Password has a special character
  if(specialChars.test(password)) {
    strength += 1;
  }

  // Handle errors
  if (errors.length) {
    return { is: false, pw: undefined, msg: errors }
  } else {
    return { is: true, pw: password.toString(), msg: successMessage }
  }
}

export const passwordsMatch = (password, reEnterPassword) => {

  const errorMessage = "Password fields do not match.";
  const successMessage = "Password fields match.";

  if (password !== reEnterPassword) {
    return { is: false, pw: password.toString(), msg: errorMessage }
  } else {
    return { is: true, pw: password.toString(), msg: successMessage }
  }
}

// CHECK FOR VAIL PHONE NUMBER
// API -- https://apilayer.com/marketplace/number_verification-api
export const validPhoneNumber = (phoneNumber) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phoneNumber);
}


// CHECK FOR CONSECUTIVE CHARACTERS
//  Default max consecutive characters is 2 in a row -- 3+ returns 'true'
export const consecutiveChars = (string, checkCasing, limit) => {

  string = checkCasing === false ? string : string.toLowerCase();  
  //  If 'checkCasing' is false then repeats of the same character in
  //  different cases will be ignored. Defaults to 'true'.

  limit = checkType(Number(limit), 'number') && limit > 0 ? Number(limit) : 2;
  //   Limit must be at least 1
  const pattern = checkCasing === false ? /([a-zA-Z0-9])\1+/g : /([a-z0-9])\1+/g; 
  const matches = string.match(pattern);

  if(string && matches) {
    for(let i = 0; i < matches.length; i++) {
      let split = matches[i].split('');
      if(split.length && split.length > limit) {
        return true;
      }
    }
  }

  return false;
}

const makeRegex = (pattern, flags) => {
  // FLAGS
  //  g	= Search globally
  //  i	= Case-insensitive search
  //  m	= Allows for ^ and $ to check for newline character matches
  //  s	= Allows . to match newline characters.

}

export const stringReplace = (input, searchFor, replaceWith, flags, caseSensitive) => {

  input = checkType(input, 'string') || checkType(input, 'regex') ? input : false;
  searchFor = checkType(searchFor, 'string') ? searchFor : false;
    if((input || conditions) === false) { return input }
  
  replaceWith = checkType(replaceWith, 'string') ? replaceWith : '';

  caseSensitive = caseSensitive === true ? true : false;

  flags = flags === true && caseSensitive === true
      ? 'gi'
    : replaceWith === ('g' || 'i' || 'gi' || 'gm' || 's')
      ? replaceWith
      : 'g'

  const regex = new RegExp(input, searchFor)
  return input.replace(regex, flags);
}

export const alphaNumOnly = (input, exceptions, alphaOnly) => {
  const conditions = alphaOnly === true ? '^a-z' : '^a-z0-9';
  const allow = checkType(exceptions, 'string') ? exceptions : '';
  const regex = new RegExp(conditions+allow, 'gi');
  console.log(regex)
  return input.replaceAll(regex, '');
}


export const fileName = (string, sluga) => {
  let str = '';
  sluga = sluga === true ? true : false;

  if(string !== undefined && checkType(string, 'string')) {
    str = string.replace(/\s+/g, ' ').trim().toLowerCase();
  }
  const output = str ? str.replace(/ /g, "_").replace(/[^a-z0-9_]/gmi, "-") : string;
  return sluga ? slugify(string) : output;
}

export const unFileName = (string, caps) => {

  caps = caps === false ? false : caps !== true && caps !== undefined ? caps : true; 

  if(string !== undefined && checkType(string, 'string')) {
    string = string.replace(/_+/g, ' ').trim().toLowerCase();
    string = string.replace(/-/g, ' ');
    return caps === 'titlecase'
        ? titleCase(string)
      : caps === true
        ? capitalizeWords(string)
        : string;
  }
  return undefined;
}


// CHECK STRING FOR WORDS
export const checkForWords = (string, wordsList, booleanOutput) => {
  let isTrue = false;
  // Use an array with a list of words to check string for instances
  const checks = wordsList ? string.match( new RegExp("\\b(" + wordsList.join('|') + ")\\b", "ig") ) : undefined;

  // Check if string is included in "Words List"
  isTrue = wordsList ? wordsList.includes(string) : false;

  return booleanOutput === true || !checks ? isTrue : checks;
}

// It's just a bunch of useful words...
export const listOfWords = (type) => {
  // (Well, it will be.)
  type = fileName(type);

  // TITLECASE WORDS
  // Used to check for non-capitalized words in titles
  const titleCase = [  // (See 'titleCase' function in 'generator.js')
    "a", "an", "and", "at", "but", "by", "to", "for", "is", "of", "the",
  ];
  const romanNumerals = [
    'i','ii','iii','iv','iiii','v','vii','viii','ix','viiii','x','xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx',
    'xxi','xxii','xxiii','xxiv','xxv','xxvi','xxvii','xxviii','xxix','xxx',
  ];

  switch(type) {
    case 'title':
    case 'titlecase':
      return titleCase;
    case "numerals":
    case "romannumerals":
    case "roman_numerals":
      return romanNumerals;
  }
}



// IMPORT NEXT IMAGE OR SIZE TO CREATE PROPER WIDTH/HEIGHT OBJECTS
export const imageSizeObj = ( obj ) => {

  // Must be a Next image object, array of sizes, number, or string
  // Array -- [width, height] -- both must be numbers or strings
  //                          -- if one contains 'px', both must contain 'px' (will be removed)
  // String -- "100"/"100px"  -- must be number only or can have number + 'px' (will be be removed)
  let sizeObj;


  // Perform checks...

  if (obj.width && obj.height) {

    sizeObj = { width: obj.height, height: obj.width };
  
  } else if ((checkType(obj, 'number') && !checkType(obj, 'string'))
    || (checkType(obj, 'string') && !isNaN(obj))) {

    sizeObj = { width: Number(obj), height: Number(obj) };
    
  }  else if (checkType(obj, 'string') && !isNaN(obj)){

    sizeObj = { width: Number(obj), height: Number(obj) };
    
  } else if (!checkType(obj, 'array') && checkType(obj, 'string') && obj.toString().includes("px",1)) {

    let size = obj.replace('px','');
    sizeObj = { width: Number(size), height: Number(size) };
    
  } else if (checkType(obj, 'string')
    && !checkType(obj, 'array') && obj.toString().includes("px",1)) {

    sizeObj = { width: Number(obj.replace('px','')), height: Number(obj.replace('px','')) }
    
  } else if (checkType(obj, 'array')
  && !obj[0].toString().includes("px",1) && !obj[1].toString().includes("px",1)
  && checkType(obj[0], 'number') && checkType(obj[1], 'number')) {

    sizeObj = { width: Number(obj[0]), height: Number(obj[1]) }
    
  } else if (checkType(obj, 'array')
    &&  obj[0].toString().includes("px",1) && obj[1].toString().includes("px",1)) {

    sizeObj = { width: Number(obj[0].replace('px','')), height: Number(obj[1].replace('px','')) }
    
  } else if (checkType(obj, 'array')
    && checkType(obj[0], 'string') && !isNaN(obj[0])
    && checkType(obj[1], 'string') && !isNaN(obj[1])) {

    sizeObj = { width: Number(obj[0]), height: Number(obj[1]) }

  } else {
    
    return false;
    
  }
  
  return sizeObj;
}