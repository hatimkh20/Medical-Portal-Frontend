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

export const getTextBeforeUnderscore = (input) => {
  const parts = input.split('_');
  return parts[0];
};

export const isOtherSelected = (value) => {
  return value === "Other";
}

export const otherOrValue = (options, value) => {
  return isOtherSelected(options, value)? "Other": value;
}

export const isPluralFrequencySelected = (value) => {
  return value === "day(s)" || value ===  "week(s)" || value === "month(s)";
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'PPpp'); // Example format: "Jul 26, 2024, 9:54 AM"
};

export const getDateWithoutTZ = (dateTime) => {
  return new Date(dateTime).toISOString().split('T')[0];
}

export const getFilteredOptions = (filteredOptions, key) => {
  const valuesSet = new Set(
    filteredOptions.map((item) => item[key]).filter((v) => v && v.trim())
  );
  return ["Other", ...Array.from(valuesSet)];
};

export const formatTraumaOther = (input) => {
  const [key, value] = input.split(':').map(part => part.trim());
  const cleanedValue = value.replace(/^"|"$/g, '');

  return `${cleanedValue}`;
}