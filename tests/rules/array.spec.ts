import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateArray = ruleManager.getRule('array');

describe('Test array rule', () => {
  it('should validate with null', () => {
    expect(validateArray('', null, [])).to.be.false;
  });

  it('should validate with string', () => {
    expect(validateArray('', 'arraytest', [])).to.be.false;
  });

  it('should validate with empty array', () => {
    expect(validateArray('', [], [])).to.be.true;
  });

  it('should validate with array', () => {
    expect(validateArray('', [1, 2, 3], [])).to.be.true;
  });

  it('should validate with undefined', () => {
    expect(validateArray('', undefined, [])).to.be.false;
  });

  it('should validate with set', () => {
    expect(validateArray('', new Set(), [])).to.be.false;
  });

  it('should validate with number object', () => {
    expect(validateArray('', {}, [])).to.be.false;
  });

  it('should validate with boolean', () => {
    expect(validateArray('', false, [])).to.be.false;
  });
});
