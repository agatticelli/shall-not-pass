import { expect } from 'chai';

import { RuleManager } from '../../src';

const ruleManager = new RuleManager();
const validateSize = ruleManager.getRule('size');

describe('Test size rule', () => {
  it('should validate with null', () => {
    expect(validateSize('', null, ['0'])).to.be.true;
  });

  it('should validate with string 1', () => {
    expect(validateSize('', 'teststring', ['10'])).to.be.true;
  });

  it('should validate with string 2', () => {
    expect(validateSize('', 'teststring', ['11'])).to.be.false;
  });

  it('should validate with string 3', () => {
    expect(validateSize('', 'teststring', ['9'])).to.be.false;
  });

  it('should validate with empty array', () => {
    expect(validateSize('', [], ['0'])).to.be.true;
  });

  it('should validate with array 1', () => {
    expect(validateSize('', [1,2,3], ['3'])).to.be.true;
  });

  it('should validate with array 2', () => {
    expect(validateSize('', [1,2,3], ['4'])).to.be.false;
  });

  it('should validate with array 3', () => {
    expect(validateSize('', [1,2,3], ['2'])).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateSize('', undefined, ['0'])).to.be.true;
  });

  it('should validate with number 1', () => {
    expect(validateSize('', 10, ['10'])).to.be.true;
  });

  it('should validate with number 2', () => {
    expect(validateSize('', 10, ['9'])).to.be.false;
  });

  it('should validate with number 3', () => {
    expect(validateSize('', 10, ['11'])).to.be.false;
  });
});
