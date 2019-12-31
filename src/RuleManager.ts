import { isString, isArray, isDate, isBoolean, isNull, isNumeric } from './types-checker';
import utils from './utils';

const IMPLICIT_RULES = [
  'required',
  'filled',
  'required_with',
  'required_with_all',
  'required_without',
  'required_without_all',
  'required_if',
  'required_unless',
  'accepted',
  'present',
];

type ValidationValue =
  | object
  | string
  | number
  | undefined
  | null
  | Date
  | string
  | number
  | boolean
  | Array<ValidationValue>
  | Set<ValidationValue>;

const alpha = (attribute: string, value: ValidationValue): boolean => isString(value) && utils.regex.alpha.test(value);

const alphaNumeric = (attribute: string, value: ValidationValue): boolean =>
  isString(value) && utils.regex.alphaNumeric.test(value);

const array = (attribute: string, value: ValidationValue): boolean => isArray(value);

const between = (attribute: string, value: ValidationValue, params: Array<string>): boolean => {
  const size = utils.values.getSize(value);

  return Number(params[0]) <= size && Number(params[1]) >= size;
};

const boolean = (attribute: string, value: ValidationValue): boolean =>
  isBoolean(value) || [0, 1, 'false', 'true'].includes(value as string | number);

const date = (attribute: string, value: ValidationValue): boolean =>
  (isDate(value) && !isNaN(value.getSeconds())) || (isString(value) && utils.regex.date.test(value));

const email = (attribute: string, value: ValidationValue): boolean => isString(value) && utils.regex.email.test(value);

const inArray = (attribute: string, value: ValidationValue, params: Array<string>): boolean =>
  params.includes(isNumeric(value) ? value.toString() : (value as string));

const numeric = (attribute: string, value: ValidationValue): boolean => isNumeric(value);

const max = (attribute: string, value: ValidationValue, params: Array<string>): boolean =>
  utils.values.getSize(value) <= Number(params[0]);

const min = (attribute: string, value: ValidationValue, params: Array<string>): boolean =>
  utils.values.getSize(value) >= Number(params[0]);

const notInArray = (attribute: string, value: ValidationValue, params: Array<string>): boolean =>
  !inArray(attribute, value, params);

const required = (attribute: string, value: ValidationValue): boolean =>
  !isNull(value) &&
  !(isString(value) && utils.values.getSize(value.trim()) === 0) &&
  !(isArray(value) && utils.values.getSize(value) === 0);

const size = (attribute: string, value: ValidationValue, params: Array<string>): boolean =>
  utils.values.getSize(value) === Number(params[0]);

const string = (attribute: string, value: ValidationValue): boolean => isString(value);

// istanbul ignore next
const nullable = (): boolean => true;

const regex = (attribute: string, value: ValidationValue, params: Array<string>): boolean =>
  new RegExp(params[0]).test(value as string);

const notRegex = (attribute: string, value: ValidationValue, params: Array<string>): boolean =>
  !regex(attribute, value, params);

type RuleCallback = (attribute: string, value: ValidationValue, params: Array<string>) => Promise<boolean> | boolean;

type RuleSet = {
  [ruleName: string]: RuleCallback;
};

class RuleManager {
  private rules: RuleSet;

  constructor() {
    this.rules = {
      alpha,
      alphaNumeric,
      array,
      between,
      boolean,
      date,
      email,
      inArray,
      numeric,
      max,
      min,
      notInArray,
      required,
      size,
      string,
      nullable,
      regex,
      notRegex,
    };
  }

  public getRules(): RuleSet {
    return this.rules;
  }

  public getRule(ruleName: string): RuleCallback {
    if (!(ruleName in this.rules)) {
      throw new Error(`Rule doesn't exist`);
    }

    return this.rules[ruleName];
  }

  public addRule(ruleName: string, callbackFn: RuleCallback): void {
    if (ruleName in this.rules) {
      throw new Error('Rule already exists');
    }

    this.rules[ruleName] = callbackFn;
  }
}

export { IMPLICIT_RULES, RuleManager, RuleCallback, RuleSet, ValidationValue };
