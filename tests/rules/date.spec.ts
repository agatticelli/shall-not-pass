import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateDate = ruleManager.getRule('date');

describe('Test date rule', () => {
  it('should validate with null', () => {
    expect(validateDate('', null, [])).to.be.false;
  });

  it('should validate with random string', () => {
    expect(validateDate('', 'arraytest', [])).to.be.false;
  });

  it('should validate with wrong date format', () => {
    expect(validateDate('', '2020-33-21', [])).to.be.false;
  });

  it('should validate with correct date', () => {
    expect(validateDate('', '2019-04-16T14:00:20', [])).to.be.true;
  });

  it('should validate with undefined', () => {
    expect(validateDate('', undefined, [])).to.be.false;
  });

  it('should validate with Date object', () => {
    expect(validateDate('', new Date(), [])).to.be.true;
  });

  it('should validate with invalid Date object', () => {
    expect(validateDate('', new Date("Nagini"), [])).to.be.false;
  });
});
