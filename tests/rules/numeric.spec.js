import { expect } from 'chai';

import { validateNumeric } from '../../src/rules';

describe('Test numeric rule', () => {
  it('should validate with null', () => {
    expect(validateNumeric('', null)).to.be.false;
  });

  it('should validate with string', () => {
    expect(validateNumeric('', 'arraytest')).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateNumeric('', undefined)).to.be.false;
  });

  it('should validate with boolean', () => {
    expect(validateNumeric('', false)).to.be.false;
  });

  it('should validate with number', () => {
    expect(validateNumeric('', 0)).to.be.true;
  });

  it('should validate with number 1', () => {
    expect(validateNumeric('', 10)).to.be.true;
  });

  it('should validate with number 2', () => {
    expect(validateNumeric('', -10)).to.be.true;
  });

  it('should validate with number 3', () => {
    expect(validateNumeric('', 10.5)).to.be.true;
  });

  it('should validate with number string', () => {
    expect(validateNumeric('', '10')).to.be.false;
  });
});
