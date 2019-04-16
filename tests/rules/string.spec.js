import { expect } from 'chai';

import { validateString } from '../../src/rules';

describe('Test string rule', () => {
  it('should validate with null', () => {
    expect(validateString('', null)).to.be.false;
  });

  it('should validate with string', () => {
    expect(validateString('', 'teststring')).to.be.true;
  });

  it('should validate with string object', () => {
    expect(validateString('', new String('test string'))).to.be.true;
  });

  it('should validate with string containing symbols', () => {
    expect(validateString('', 'asdf_*!234')).to.be.true;
  });

  it('should validate with string of numbers', () => {
    expect(validateString('', 'asdfsdf')).to.be.true;
  });

  it('should validate with number', () => {
    expect(validateString('', 10)).to.be.false;
  });

  it('should validate with boolean', () => {
    expect(validateString('', false)).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateString('', undefined)).to.be.false;
  });
});
