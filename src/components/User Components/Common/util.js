export const titleCase = (value) => {
    return value.at(0).toLowerCase() + value.substring(1);
  }
 
export const toCamelCase = (value) => {
    const splitted = value.split(' ');
    return titleCase(splitted.at(0)) + splitted.slice(1)
          .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join('')

}

export const isOtherSelected = (options, value) => {
  return !options
  .filter(opt => opt !== "Other")
  .includes(value);
}

export const otherOrValue = (options, value) => {
  return isOtherSelected(options, value)? "Other": value;
}