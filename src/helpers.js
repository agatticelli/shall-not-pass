import * as types from './types';

const getSize = value => {
  if (types.isNumeric(value)) {
    return value;
  }

  if (types.isString(value) || types.isArray(value)) {
    return value.length;
  }

  return 0;
};

const snakeToCamel = str => str.replace(/_([a-zA-Z])/g, (a, l) => l.toUpperCase());

export {
  getSize,
  snakeToCamel,
}