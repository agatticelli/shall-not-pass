import * as helpers from './helpers';
import * as regex from './regex';
import * as types from './types';

const validateAlpha = (attribute, value) => types.isString(value) && regex.alpha.test(value);

const validateAlphaNumeric = (attribute, value) => types.isString(value) && regex.alphaNumeric.test(value);

const validateArray = (attribute, value) => types.isArray(value);

const validateBetween = (attribute, value, params) => {
  const size = helpers.getSize(value);

  return Number(params[0]) <= size && Number(params[1]) >= size;
};

const validateBoolean = (attribute, value) => types.isBoolean(value) || [0, 1, 'false', 'true'].includes(value);

const validateDate = (attribute, value) => types.isDate(value) || (types.isString(value) && regex.date.test(value));

const validateEmail = (attribute, value) => types.isString(value) && regex.email.test(value);

const validateIn = (attribute, value, params) => Array.from(params).includes(value);

const validateNumeric = (attribute, value) => types.isNumeric(value);

const validateMax = (attribute, value, params) => helpers.getSize(value) <= Number(params[0]);

const validateMin = (attribute, value, params) => helpers.getSize(value) >= Number(params[0]);

const validateNotIn = (attribute, value, params) => !validateIn(attribute, value, params);

const validateRequired = (attribute, value) => (
  !types.isNull(value)
  && !(types.isString(value) && helpers.getSize(value.trim()) === 0)
  && !(types.isArray(value) && helpers.getSize(value) === 0)
);

const validateSize = (attribute, value, params) => helpers.getSize(value) === Number(params[0]);

const validateString = (attribute, value) => types.isString(value);

export {
  validateAlpha,
  validateAlphaNumeric,
  validateArray,
  validateBetween,
  validateBoolean,
  validateDate,
  validateEmail,
  validateIn,
  validateNumeric,
  validateMax,
  validateMin,
  validateNotIn,
  validateRequired,
  validateSize,
  validateString,
};