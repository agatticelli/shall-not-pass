import { expect } from 'chai';

import { RuleManager } from '../src';

const ruleManager = new RuleManager();

describe('Test RuleManager', () => {
  it('should check getRules method to have alpha rule', () => {
    const rules = ruleManager.getRules();
    expect(rules).to.haveOwnProperty('alpha');
  });

  it('should check getRule method', () => {
    const validateAlpha = ruleManager.getRule('alpha');
    expect(validateAlpha).to.be.a('function');
  });

  it('should add rule and get it', () => {
    ruleManager.addRule('customRule', () => false);
    const validateCustomRule = ruleManager.getRule('customRule');
    expect(validateCustomRule).to.be.a('function');
  });

  it('should throw because of adding an existing rule', () => {
    expect(
      ruleManager.addRule.bind(ruleManager, 'alpha', () => false)
    ).to.throw('Rule already exists');
  });

  it('should throw because of getting a non-existent rule', () => {
    expect(ruleManager.getRule.bind(ruleManager, 'missedRule')).to.throw(`Rule doesn't exist`);
  });
});
