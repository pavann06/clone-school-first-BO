import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  let format;

  if (number && number >100) {
    format = number.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
  } else if (number || number === 0) {
    format = `₹${number}`;
  } else {
    format = '';
  }

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

export function fIndianCurrency(number) {
  if (number <= 10000000) {
    return fCurrency(number);
  }
  const crore = number / 10000000;
  return `${numeral(crore).format('₹0,0.00')} Cr`;
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
