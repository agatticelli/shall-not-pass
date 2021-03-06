import { expect } from 'chai';

import { RuleManager } from '../../src';

const ruleManager = new RuleManager();
const validateBoolean = ruleManager.getRule('boolean');

describe('Test boolean rule', () => {
  it('should validate with null', () => {
    expect(validateBoolean('', null, [])).to.be.false;
  });

  it('should validate with string', () => {
    expect(validateBoolean('', 'arraytest', [])).to.be.false;
  });

  it('should validate with empty array', () => {
    expect(validateBoolean('', [], [])).to.be.false;
  });

  it('should validate with emtpy string', () => {
    expect(validateBoolean('', '', [])).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateBoolean('', undefined, [])).to.be.false;
  });

  it('should validate with true', () => {
    expect(validateBoolean('', true, [])).to.be.true;
  });

  it('should validate with false', () => {
    expect(validateBoolean('', false, [])).to.be.true;
  });

  it('should validate with string true', () => {
    expect(validateBoolean('', 'true', [])).to.be.true;
  });

  it('should validate with string false', () => {
    expect(validateBoolean('', 'false', [])).to.be.true;
  });

  it('should validate with any number', () => {
    expect(validateBoolean('', 10, [])).to.be.false;
  });

  it('should validate with 0', () => {
    expect(validateBoolean('', 0, [])).to.be.true;
  });

  it('should validate with 1', () => {
    expect(validateBoolean('', 1, [])).to.be.true;
  });
});
