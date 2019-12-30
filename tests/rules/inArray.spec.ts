import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateInArray = ruleManager.getRule('inArray');

describe('Test inArray rule', () => {
  it('should validate with null', () => {
    expect(validateInArray('', null, ['1', '2', '3'])).to.be.false;
  });

  it('should validate with string', () => {
    expect(validateInArray('', 'harry', ['harry', 'ron', 'hermione'])).to.be.true;
  });

  it('should validate with string 2', () => {
    expect(validateInArray('', 'harry', ['Harry', 'Ron', 'Hermione'])).to.be.false;
  });

  it('should validate with empty array', () => {
    expect(validateInArray('', 'dexter', [])).to.be.false;
  });

  it('should validate with numbers', () => {
    expect(validateInArray('', 0, ['0', '1', '2', '3'])).to.be.true;
  });

  it('should validate with numbers 2', () => {
    expect(validateInArray('', 0, ['1', '2', '3'])).to.be.false;
  });

  it('should validate with numbers 3', () => {
    expect(validateInArray('', null, ['0', '1', '2', '3'])).to.be.false;
  });

  it('should validate with numbers 4', () => {
    expect(validateInArray('', 0, ['', '1', '2', '3'])).to.be.false;
  });
});
