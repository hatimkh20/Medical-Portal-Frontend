import { format } from 'date-fns';

export const titleCase = (value) => {
    return value.at(0).toUpperCase() + value.substring(1);
}

export const firstLetterLowerCase = (value) => {
  return value.at(0).toLowerCase() + value.substring(1);
}
 
export const toCamelCase = (value) => {
    const splitted = value.split(' ');
    return firstLetterLowerCase(splitted.at(0)) + splitted.slice(1)
          .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join('')

}

export const formatString = (input) => {
  const formatted = input
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  return formatted;
};

// Example usage
console.log(formatString("personalCare")); // Outputs: Personal Care


export const isOtherSelected = (value) => {
  return value === "Other";
}

export const otherOrValue = (options, value) => {
  return isOtherSelected(options, value)? "Other": value;
}

export const isPluralFrequencySelected = (value) => {
  return value === "months" || value ===  "weeks" || value === "days";
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'PPpp'); // Example format: "Jul 26, 2024, 9:54 AM"
};

export const getDateWithoutTZ = (dateTime) => {
  return new Date(dateTime).toISOString().split('T')[0];
}