import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateMax = ruleManager.getRule('max');

describe('Test max rule', () => {
  it('should validate with null', () => {
    expect(validateMax('', null, ['10'])).to.be.true;
  });

  it('should validate with string 1', () => {
    expect(validateMax('', 'teststring', ['5'])).to.be.false;
  });

  it('should validate with string 2', () => {
    expect(validateMax('', 'teststring', ['10'])).to.be.true;
  });

  it('should validate with string 3', () => {
    expect(validateMax('', 'teststring', ['200'])).to.be.true;
  });

  it('should validate with empty array', () => {
    expect(validateMax('', [], ['10'])).to.be.true;
  });

  it('should validate with array 1', () => {
    expect(validateMax('', [1, 2, 3], ['2'])).to.be.false;
  });

  it('should validate with array 2', () => {
    expect(validateMax('', [1, 2, 3], ['10'])).to.be.true;
  });

  it('should validate with array 3', () => {
    expect(validateMax('', [1, 2, 3], ['3'])).to.be.true;
  });

  it('should validate with number 1', () => {
    expect(validateMax('', 10, ['9'])).to.be.false;
  });

  it('should validate with number 2', () => {
    expect(validateMax('', 10, ['10'])).to.be.true;
  });

  it('should validate with number 3', () => {
    expect(validateMax('', 10, ['20'])).to.be.true;
  });
});
