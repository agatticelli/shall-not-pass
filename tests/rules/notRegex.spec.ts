import { expect } from 'chai';

import { RuleManager } from '../../src/RuleManager';

const ruleManager = new RuleManager();
const validateNotRegex = ruleManager.getRule('notRegex');

describe('Test not regex rule', () => {
  it('should pass lowercase regex', () => {
    expect(validateNotRegex('', 'lumus maxima', ['^[a-z\\s]+$'])).to.be.false;
  });

  it('should validate regex with comma', () => {
    expect(validateNotRegex('', '1, 2, 3 vera verto', ['[1-9,]+'])).to.be.false;
  });

  it('should fail regex', () => {
    expect(validateNotRegex('', '1 2 3 vera verto', ['^[1-9]+$'])).to.be.true;
  });
});
