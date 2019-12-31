import { expect } from 'chai';

import { RuleManager } from '../../src';

const ruleManager = new RuleManager();
const validateBetween = ruleManager.getRule('between');

describe('Test between rule', () => {
  it('should validate with null', () => {
    expect(validateBetween('', null, ['1', '3'])).to.be.false;
  });

  it('should validate string with min value', () => {
    expect(validateBetween('', 'stringtest', ['1', '100'])).to.be.true;
  });

  it('should validate string with min value 2', () => {
    expect(validateBetween('', 'stringtest', ['10', '18'])).to.be.true;
  });

  it('should validate string with min value 3', () => {
    expect(validateBetween('', 'stringtest', ['11', '18'])).to.be.false;
  });

  it('should validate string with max value', () => {
    expect(validateBetween('', 'stringtest', ['0', '10'])).to.be.true;
  });

  it('should validate string with max value 2', () => {
    expect(validateBetween('', 'stringtest', ['0', '9'])).to.be.false;
  });

  it('should validate with String object', () => {
    expect(validateBetween('', new String('stringtest'), ['1', '10'])).to.be.true;
  });

  it('should validate with undefined', () => {
    expect(validateBetween('', undefined, ['0', '10'])).to.be.true;
  });

  it('should validate with undefined 2', () => {
    expect(validateBetween('', undefined, ['1', '10'])).to.be.false;
  });

  it('should validate with array min value', () => {
    expect(validateBetween('', [1, 2, 3], ['1', '10'])).to.be.true;
  });

  it('should validate with array min value 2', () => {
    expect(validateBetween('', [1, 2, 3], ['4', '10'])).to.be.false;
  });

  it('should validate with array max value', () => {
    expect(validateBetween('', [1, 2, 3], ['1', '10'])).to.be.true;
  });

  it('should validate with array max value 2', () => {
    expect(validateBetween('', [1, 2, 3, 4, 5, 6], ['1', '5'])).to.be.false;
  });

  it('should validate with number', () => {
    expect(validateBetween('', 10, ['1', '200'])).to.be.true;
  });

  it('should validate with number 1', () => {
    expect(validateBetween('', 10, ['1', '10'])).to.be.true;
  });

  it('should validate with number 2', () => {
    expect(validateBetween('', 1, ['1', '200'])).to.be.true;
  });

  it('should validate with min number ', () => {
    expect(validateBetween('', 10, ['20', '200'])).to.be.false;
  });

  it('should validate with max number ', () => {
    expect(validateBetween('', 10, ['0', '9'])).to.be.false;
  });
});
