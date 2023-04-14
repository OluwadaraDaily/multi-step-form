export const getNumberFromStr = str => {
  let arrOfStr = str.split('')
  let numStr = ''
  for(const char of arrOfStr) {
    if(!isNaN(char)) {
      numStr += char
    }
  }
  return Number(numStr)
}

// export default { getNumberFromStr }