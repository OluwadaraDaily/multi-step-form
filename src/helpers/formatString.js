export const getNumberFromStr = str => {
  if(!str || str === null) {
    return 0;
  }
  let arrOfStr = str.split('')
  let numStr = ''
  for(const char of arrOfStr) {
    if(!isNaN(char)) {
      numStr += char
    }
  }
  return Number(numStr)
}