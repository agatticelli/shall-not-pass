import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateAlphaNumeric = ruleManager.getRule('alphaNumeric');

describe('Test alphaNumeric rule', () => {
  it('should validate with null', () => {
    expect(validateAlphaNumeric('', null, [])).to.be.false;
  });

  it('should validate with empty string', () => {
    expect(validateAlphaNumeric('', '', [])).to.be.true;
  });

  it('should validate with spaces-only string', () => {
    expect(validateAlphaNumeric('', '  ', [])).to.be.false;
  });

  it('should validate with String object', () => {
    expect(validateAlphaNumeric('', new String('teststring'), [])).to.be.true;
  });

  it('should validate with String object and space', () => {
    expect(validateAlphaNumeric('', new String('test string'), [])).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateAlphaNumeric('', undefined, [])).to.be.false;
  });

  it('should validate with long string', () => {
    expect(validateAlphaNumeric('', 'veryveryveryverylongstringtest', [])).to.be.true;
  });

  it('should validate with uppercase', () => {
    expect(validateAlphaNumeric('', 'DSDFEASDFEASD', [])).to.be.true;
  });

  it('should validate with number inside string', () => {
    expect(validateAlphaNumeric('', "7horrocruxes", [])).to.be.true;
  });

  it('should validate with only number inside string', () => {
    expect(validateAlphaNumeric('', "7777", [])).to.be.true;
  });

  it('should validate with number', () => {
    expect(validateAlphaNumeric('', 0, [])).to.be.false;
  });

  it('should validate with string with space', () => {
    expect(validateAlphaNumeric('', "test user", [])).to.be.false;
  });

  it('should validate with boolean', () => {
    expect(validateAlphaNumeric('', false, [])).to.be.false;
  });
});
