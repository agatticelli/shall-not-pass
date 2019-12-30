import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateRequired = ruleManager.getRule('required');

describe('Test required rule', () => {
  it('should validate with null', () => {
    expect(validateRequired('', null, [])).to.be.false;
  });

  it('should validate with empty string', () => {
    expect(validateRequired('', '', [])).to.be.false;
  });

  it('should validate with spaces-only string', () => {
    expect(validateRequired('', '  ', [])).to.be.false;
  });

  it('should validate with empty array', () => {
    expect(validateRequired('', [], [])).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateRequired('', undefined, [])).to.be.false;
  });

  it('should validate with string', () => {
    expect(validateRequired('', 'test', [])).to.be.true;
  });

  it('should validate with array with items', () => {
    expect(validateRequired('', [1,2,3], [])).to.be.true;
  });

  it('should validate with number', () => {
    expect(validateRequired('', 0, [])).to.be.true;
  });

  it('should validate with false', () => {
    expect(validateRequired('', false, [])).to.be.true;
  });
});
