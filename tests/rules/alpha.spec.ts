import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateAlpha = ruleManager.getRule('alpha');

describe('Test alpha rule', () => {
  it('should validate with null', () => {
    expect(validateAlpha('', null, [])).to.be.false;
  });

  it('should validate with empty string', () => {
    expect(validateAlpha('', '', [])).to.be.true;
  });

  it('should validate with spaces-only string', () => {
    expect(validateAlpha('', '  ', [])).to.be.false;
  });

  it('should validate with String object', () => {
    expect(validateAlpha('', new String('teststring'), [])).to.be.true;
  });

  it('should validate with String object and space', () => {
    expect(validateAlpha('', new String('test string'), [])).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateAlpha('', undefined, [])).to.be.false;
  });

  it('should validate with long string', () => {
    expect(validateAlpha('', 'veryveryveryverylongstringtest', [])).to.be.true;
  });

  it('should validate with uppercase', () => {
    expect(validateAlpha('', 'DSDFEASDFEASD', [])).to.be.true;
  });

  it('should validate with number inside string', () => {
    expect(validateAlpha('', "7horrocruxes", [])).to.be.false;
  });

  it('should validate with only number inside string', () => {
    expect(validateAlpha('', "1234567890", [])).to.be.false;
  });

  it('should validate with number', () => {
    expect(validateAlpha('', 0, [])).to.be.false;
  });

  it('should validate with string with space', () => {
    expect(validateAlpha('', "test user", [])).to.be.false;
  });

  it('should validate with boolean', () => {
    expect(validateAlpha('', false, [])).to.be.false;
  });
});
