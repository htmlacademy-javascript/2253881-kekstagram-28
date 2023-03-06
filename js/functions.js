const lengthStringChecker = (string, numberLength) => {
  const result = string.length > numberLength;

  return result
    ? `Результат: ${result} - строка проходит по длине`
    : `Результат: ${result} — строка не проходит`;
};

const palindromChecker = (string) => {
  const result = string
    .replace(/\s/g, '')
    .split('')
    .reverse()
    .join('')
    .toLowerCase();

  return string.replace(/\s/g, '').toLowerCase() === result
    ? 'Результат: true - строка является палиндромом'
    : 'Результат: false - это не палиндром';
};

const pullingNumber = (string) =>
  string.replace(/\D/g, '') === ''
    ? 'Результат: NaN'
    : `Результат: число ${Number(string.replace(/\D/g, ''))}`;

const stringEditor = (startString, maxLength, addedString) => {
  if (startString.length >= maxLength) {
    return `Результат: строка ${startString}`;
  }

  if (addedString.length >= maxLength) {
    const arrayedAddedString = addedString.split('');

    while (arrayedAddedString.length + startString.length !== maxLength) {
      arrayedAddedString.pop();
    }
    arrayedAddedString.push(startString);
    return `Результат: строка '${arrayedAddedString.join('')}'`;
  }

  maxLength = maxLength - startString.length;
  if (maxLength > addedString.length) {
    addedString += addedString.repeat(maxLength / addedString.length);
  }
  return `Результат: строка '${
    addedString.slice(0, maxLength) + String(startString)
  }'`;
};

lengthStringChecker('asdasdasdadadadasd', 10);
palindromChecker('Лёша на полке клопа нашёл ');
pullingNumber('adjskdahsdk ajsdkhasdkjhs.../ // //');
stringEditor('q', 4, 'we');
