import { isValidMatrix } from "./isValidMatrix";

interface MatrixProps {
  preset?: 'reset' | 'coolAndCrisp' | undefined;
  custom?: string;
}

export const colorMatrix = ( value: {preset?: string, custom?: string} ) =>{
  // Spread props
  const { preset, custom } = value;

  const resetMatrix = `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0`

  // OUTPUT LOGIC FOR CUSTOM MATRIX
  if(!preset && custom) {
    let matrix = custom && preset === undefined && isValidMatrix(custom)
      ? custom
      : undefined;
    if(isValidMatrix(custom)) return matrix;
    console.warn(
      `The Matrix provided is either undefined or not a valid matrix. "ResetMatrix" (no filter) is
       being used.`
    )
    return resetMatrix;
  }

  // OUTPUT LOGIC FOR PRESET MATRIX
  switch(preset) {
    case 'coolAndCrisp': // "cool abd Crisp (Blue_) - Filter"
      return(`1.000  0.000  0.000  0.020  0.000 
              0.000  1.000  0.000  0.000  0.000 
              0.100  0.200  1.000  0.000  0.000 
              0.000  0.500  0.000  1.000  0.000` );      
    case 'reset':
    default:
      if(preset !== 'reset') console.warn(`"${preset}" is not a valid preset. Defaulting to "reset".`);
      return(resetMatrix);
  }
}