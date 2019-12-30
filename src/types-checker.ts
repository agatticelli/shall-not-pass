import utils from './utils';
import { ValidationValue } from './types';

const isArray = (value: ValidationValue): value is [] => Array.isArray(value);
const isBoolean = (value: ValidationValue): value is boolean => typeof value === 'boolean';
const isDate = (value: ValidationValue): value is Date => value instanceof Date;
const isNull = (value: ValidationValue): value is null => value === null || value === void 0;
const isNumeric = (value: ValidationValue): value is number =>
  Number.isFinite(value as number) || utils.regex.numeric.test(value as string);
const isString = (value: ValidationValue): value is string => typeof value === 'string' || value instanceof String;

export { isArray, isBoolean, isDate, isNull, isNumeric, isString };
