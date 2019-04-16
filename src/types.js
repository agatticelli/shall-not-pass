const isArray = value => Array.isArray(value);
const isBoolean = value => typeof (value) === 'boolean';
const isDate = value => value instanceof Date;
const isNull = value => value === null || value === void 0;
const isNumeric = value => Number.isFinite(value);
const isString = value => typeof value === 'string' || value instanceof String;

export {
  isArray,
  isBoolean,
  isDate,
  isNull,
  isNumeric,
  isString,
};
