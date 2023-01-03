// CHECK IF CUSTOM MATRIX IS VALID
export function isValidMatrix(matrix: any) {
  // Split the matrix string into an array of values
  var values = matrix.split(",");

  // Check that the array has exactly 20 values
  if (values.length != 20) return false;
  // Check that each value is a valid number
  for (var i = 0; i < values.length; i++) {
    if (isNaN(values[i])) return false;
  }
  // If all checks pass, the matrix is valid
  return true;
}