import CryptoJS from "crypto-js";
import * as crypto from 'crypto';


import { shuffleStr } from './generator';
import { checkType } from "../utils/validation";


// AUTOMATICALLY ENCRYPT/DECRYPT ANYTHING
export const useCrypto = (
  data: any | any[],
  action: 'encrypt' | 'decrypt' | undefined,
) => {

  action = action === 'decrypt' ? 'decrypt' : 'encrypt';
  data = data && data!==undefined && data!=='' && data!==null
    ? data
    : undefined;
    
  const input = data;

  const errorMsg = `${action === 'decrypt' ? 'Decryption' : 'Encryption'} failed. Unable to read data.`

  if(input === undefined) {
    console.error(new Error(errorMsg))
    return undefined
  }

  let key = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_KEY || "12345678901234567890123456789012");
  let iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_IV || "1234567890123456");
  // if(action === 'encrypt') {
  //   iv = CryptoJS.enc.Utf8.parse(randomString());
  // }

  let encrypted: string;
    if(action === 'encrypt')
      encrypted = CryptoJS.AES.encrypt(JSON.stringify({input}), key, { iv: iv }).toString();

  const decrypt = (inputData: string) => {
    if(action === 'decrypt')
      return JSON.parse(CryptoJS.AES.decrypt(inputData, key, { iv: iv }).toString(CryptoJS.enc.Utf8)).input;
  }

  let decrypted = decrypt(input);
      decrypted = checkType(Number(decrypted), 'number')
        ? Number(decrypted)
        : decrypted;

  return action === "decrypt" ? decrypted : { data: encrypted, iv: iv };
}

// SMALL HASH
export const shortenHash = (string: string) => {
  for (var h = 0, i = 0; i < string.length; h &= h) // 'h &= h' makes the number reset to 0 if exceeds 'max safe integer'
    h = 31 * h + string.charCodeAt(i++);            // (Number.MAX_SAFE_INTEGER or +/-9007199254740992)
  return h;
}

// SIMPLE HASH
export const simpleHash = (string: string, lowercase?: boolean) => {
  lowercase = lowercase === true ? true : false;
  let hash = 0;
  const outputLength = 10;

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
      // '<<' is "left shift operator", used to shift the bits of the hash variable to the left by 5 places
      // Multiplies 'hash' value by 32
    hash &= hash; // Convert to 32bit integer
  }
  const hashString = new Uint32Array([hash])[0].toString(36);
  let output: string;
  while (hashString.length < outputLength) {
    const randomNum = Math.floor(Math.random()*10).toString()
    output = randomNum + hashString;
  }
  return lowercase ? shuffleStr(output) : shuffleStr(output.toUpperCase());
};


export const generateUID = () => {
  let firstPart = ((Math.random() * 46656) | 0).toString();
  let secondPart = ((Math.random() * 46656) | 0).toString();
  firstPart = ("000" + parseInt(firstPart, 10).toString(36)).slice(-3);
  secondPart = ("000" + parseInt(secondPart, 10).toString(36)).slice(-3);
  return firstPart + secondPart;
}

// RANDOM 14 CHARACTER STRING
export const randomString = ()  => {
  // Output a random 14 character string with uppercase/lowercase letters and numbers 
  return Math.floor((Math.random()*Math.pow(10,16))).toString(16)
}


// ROT13 CYPHER - Same to encode and decode
export const rot13 = (str: string) => str.split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) + (char.toLowerCase() < 'n' ? 13 : -13)))
    .join('');


// COMPLEX HASH - Requires DATA and a TIMESTAMP to function as an additional key
export const complexHash = (
  data: any,
  stamp: string | number,
  action?: 'encrypt' | 'decrypt' | undefined
) => {
  action = action === 'decrypt' ? 'decrypt' : 'encrypt';
  if(action === 'encrypt') {
    const hashObj = {
      data: data,
      stamp: stamp,
      hash: simpleHash(useCrypto({data:data,stamp:stamp}, 'encrypt'))
    }
    const encryptObj = useCrypto(hashObj, 'encrypt').split('=',1)[0];
    return encryptObj + '=' + hashObj.hash
  }
  else {
    const pass = checkComplexHash(data, stamp);
    return pass ? useCrypto(data.split('=')[0], 'decrypt').data : undefined;
  }
}


export const checkComplexHash = (cplxHash: string, stamp?: string | number) => {
  const splitHash = cplxHash.split('=');
  const decrypted = useCrypto(splitHash[0], 'decrypt');
  const simpleCheck = splitHash[1] === decrypted.hash;
  const timeCheck = stamp === decrypted.stamp;
  return simpleCheck === true && timeCheck === true ? true : false;
}