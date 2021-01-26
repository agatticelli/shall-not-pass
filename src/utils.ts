import { isNumeric, isArray, isString } from './types-checker';
import { ValidationValue } from './RuleManager';
import { ObjectLiteral } from './types';

const getSize = (value: ValidationValue): number => {
  if (isNumeric(value)) {
    return value;
  }

  if (isString(value) || isArray(value)) {
    return value.length;
  }

  return 0;
};

const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-zA-Z])/g, (a, l) => l.toUpperCase());
};

const _splitNestedKeys = (keyPath: string): string[] => {
  // splits by dot (.) except for those who are preceded by "\\". Then replaces "\\." with "."
  return keyPath.split(/(?<!\\)\./).map(k => k.replace(/\\./, '.'));
};

const _reduceNestedPath = (obj: ObjectLiteral, path: string[]): any => {
  return path.reduce((prev, key) => prev?.[key], obj);
};

const getValue = (obj: ObjectLiteral, keyPath: string): any => {
  return _reduceNestedPath(obj, _splitNestedKeys(keyPath));
};

const keyExists = (obj: ObjectLiteral, keyPath: string): boolean => {
  const path = _splitNestedKeys(keyPath);
  const finalKey = path.pop();
  if (!finalKey) {
    return false;
  }
  const result = _reduceNestedPath(obj, path) ?? {};

  return finalKey in result;
};

const alpha = /^[a-zA-Z]*$/;
const alphaNumeric = /^[a-zA-Z0-9]*$/;
const date = /^\d{4}-(?:0\d|1[0-2])-(?:[0-2]\d|3[01])[\sT](?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)(?:\.\d{3})?(?:Z)?$/;
const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numeric = /^[0-9]+(?:\.[0-9]+)?$/;

const ValuesUtils = { getSize };
const StringUtils = { snakeToCamel };
const ObjectUtils = { getValue, keyExists };
const RegexUtils = { alpha, alphaNumeric, date, email, numeric };

export { ValuesUtils, StringUtils, ObjectUtils, RegexUtils };
