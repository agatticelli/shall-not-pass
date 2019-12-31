import { expect } from 'chai';

import { RuleManager } from '../../src';

const ruleManager = new RuleManager();
const validateNotInArray = ruleManager.getRule('notInArray');

describe('Test notInArray rule', () => {
  it('should validate with null', () => {
    expect(validateNotInArray('', null, ['1', '2', '3'])).to.be.true;
  });

  it('should validate with string', () => {
    expect(validateNotInArray('', 'harry', ['harry', 'ron', 'hermione'])).to.be.false;
  });

  it('should validate with string 2', () => {
    expect(validateNotInArray('', 'harry', ['Harry', 'Ron', 'Hermione'])).to.be.true;
  });

  it('should validate with empty array', () => {
    expect(validateNotInArray('', 'dexter', [])).to.be.true;
  });

  it('should validate with numbers', () => {
    expect(validateNotInArray('', 0, ['0', '1', '2', '3'])).to.be.false;
  });

  it('should validate with numbers 2', () => {
    expect(validateNotInArray('', 0, ['1', '2', '3'])).to.be.true;
  });

  it('should validate with numbers 3', () => {
    expect(validateNotInArray('', null, ['0', '1', '2', '3'])).to.be.true;
  });

  it('should validate with numbers 4', () => {
    expect(validateNotInArray('', 0, ['', '1', '2', '3'])).to.be.true;
  });
});
