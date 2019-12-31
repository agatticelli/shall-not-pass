import { expect } from 'chai';

import { RuleManager } from '../../src';

const ruleManager = new RuleManager();
const validateMin = ruleManager.getRule('min');

describe('Test min rule', () => {
  it('should validate with null', () => {
    expect(validateMin('', null, ['10'])).to.be.false;
  });

  it('should validate with string 1', () => {
    expect(validateMin('', 'teststring', ['5'])).to.be.true;
  });

  it('should validate with string 2', () => {
    expect(validateMin('', 'teststring', ['20'])).to.be.false;
  });

  it('should validate with string 3', () => {
    expect(validateMin('', 'teststring', ['10'])).to.be.true;
  });

  it('should validate with empty array', () => {
    expect(validateMin('', [], ['10'])).to.be.false;
  });

  it('should validate with array 1', () => {
    expect(validateMin('', [1, 2, 3], ['2'])).to.be.true;
  });

  it('should validate with array 2', () => {
    expect(validateMin('', [1, 2, 3], ['10'])).to.be.false;
  });

  it('should validate with array 3', () => {
    expect(validateMin('', [1, 2, 3], ['3'])).to.be.true;
  });

  it('should validate with number 1', () => {
    expect(validateMin('', 10, ['9'])).to.be.true;
  });

  it('should validate with number 2', () => {
    expect(validateMin('', 10, ['10'])).to.be.true;
  });

  it('should validate with number 3', () => {
    expect(validateMin('', 10, ['20'])).to.be.false;
  });
});
