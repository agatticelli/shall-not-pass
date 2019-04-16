import { expect } from 'chai';

import { validateIn } from '../../src/rules';

describe('Test in rule', () => {
  it('should validate with null', () => {
    expect(validateIn('', null, [1, 2, 3])).to.be.false;
  });

  it('should validate with string', () => {
    expect(validateIn('', 'harry', ['harry', 'ron', 'hermione'])).to.be.true;
  });

  it('should validate with string 2', () => {
    expect(validateIn('', 'harry', ['Harry', 'Ron', 'Hermione'])).to.be.false;
  });

  it('should validate with empty array', () => {
    expect(validateIn('', 'dexter', [])).to.be.false;
  });

  it('should validate with numbers', () => {
    expect(validateIn('', 0, [0, 1,2,3])).to.be.true;
  });

  it('should validate with numbers 2', () => {
    expect(validateIn('', 0, [1,2,3])).to.be.false;
  });

  it('should validate with numbers 3', () => {
    expect(validateIn('', null, [0, 1,2,3])).to.be.false;
  });

  it('should validate with numbers 4', () => {
    expect(validateIn('', 0, [null,undefined,'',1,2,3])).to.be.false;
  });

  it('should validate with set', () => {
    expect(validateIn('', 2, new Set([1,2,3]))).to.be.true;
  });
});
