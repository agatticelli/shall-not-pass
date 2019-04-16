import { expect } from 'chai';

import { validateNotIn } from '../../src/rules';

describe('Test notIn rule', () => {
  it('should validate with null', () => {
    expect(validateNotIn('', null, [1, 2, 3])).to.be.true;
  });

  it('should validate with string', () => {
    expect(validateNotIn('', 'harry', ['harry', 'ron', 'hermione'])).to.be.false;
  });

  it('should validate with string 2', () => {
    expect(validateNotIn('', 'harry', ['Harry', 'Ron', 'Hermione'])).to.be.true;
  });

  it('should validate with empty array', () => {
    expect(validateNotIn('', 'dexter', [])).to.be.true;
  });

  it('should validate with numbers', () => {
    expect(validateNotIn('', 0, [0, 1,2,3])).to.be.false;
  });

  it('should validate with numbers 2', () => {
    expect(validateNotIn('', 0, [1,2,3])).to.be.true;
  });

  it('should validate with numbers 3', () => {
    expect(validateNotIn('', null, [0, 1,2,3])).to.be.true;
  });

  it('should validate with numbers 4', () => {
    expect(validateNotIn('', 0, [null,undefined,'',1,2,3])).to.be.true;
  });

  it('should validate with set', () => {
    expect(validateNotIn('', 2, new Set([1,2,3]))).to.be.false;
  });
});
