import CryptoJS from "crypto-js";
import { checkType } from "../utils/validation";


// AUTOMATICALLY ENCRYPT/DECRYPT ANYTHING
export const useCrypto = (data, action) => {

  action = action === 'decrypt' ? 'decrypt' : 'encrypt';
  data = data && data!==undefined && data!=='' && data!==null && data!==NaN && data!==[]
    ? data
    : undefined;
    
  const input = action === 'decrypt' || data !== undefined ? data : undefined;

  let key = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_KEY || "12345678901234567890123456789012");
  let iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_IV || "1234567890123456");

  const errorMsg = `${action === 'decrypt' ? 'Decryption' : 'Encryption'} failed. Unable to read data.`

  if(input === undefined) {
    console.error(new Error(errorMsg))
    return undefined
  }

  let encrypted;
    if(action === 'encrypt') {
      encrypted = CryptoJS.AES.encrypt(JSON.stringify({input}), key, { iv: iv });
      encrypted = encrypted.toString();
    }

  const decrypt = (inputData) => {
    if(action === 'decrypt') {
      return JSON.parse(CryptoJS.AES.decrypt(inputData, key, { iv: iv }).toString(CryptoJS.enc.Utf8)).input;
    }
  }

  let decrypted = decrypt(input);
      decrypted = checkType(Number(decrypted), 'number')
        ? Number(decrypted)
        : decrypted;

  return action === "decrypt" ? decrypted : encrypted;
}

export const shortenHash = (string) => {
  for (var h = 0, i = 0; i < string.length; h &= h)
    h = 31 * h + string.charCodeAt(i++);
  return h;
}

export const simpleHash = (string, lowercase) => {
  lowercase = lowercase === true ? true : false;
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  const output = new Uint32Array([hash])[0].toString(36);
  return lowercase ? output : output.toUpperCase();
};


export const generateUID = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

// RANDOM 14 CHARACTER STRING
export const randomString = ()  => {
  // Output a random 14 character string with uppercase/lowercase letters and numbers 
  return Math.floor((Math.random()*Math.pow(10,16))).toString(16)
}

export const checkComplexHash = (cplxHash, stamp) => {
  const splitHash = cplxHash.split('=');
  const decrypted = hash(splitHash[0], 'decrypt');
  const simpleCheck = splitHash[1] === decrypted.hash;
  const timeCheck = stamp === decrypted.stamp;
  return simpleCheck === true && timeCheck === true ? true : false;
}

export const complexHash = (data, stamp, action) => {
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
    return pass ? useCrypto(data.split('=')[0], 'decrypt') : undefined;
  }
}