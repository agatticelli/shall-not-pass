import { expect } from 'chai';

import { validateEmail } from '../../src/rules';

describe('Test email rule', () => {
  it('should validate with null', () => {
    expect(validateEmail('', null)).to.be.false;
  });

  it('should validate with number', () => {
    expect(validateEmail('', 1234)).to.be.false;
  });

  it('should validate with empty string', () => {
    expect(validateEmail('', '')).to.be.false;
  });

  it('should validate with random string', () => {
    expect(validateEmail('', 'asdflakjsdf')).to.be.false;
  });

  it('should validate with undefined', () => {
    expect(validateEmail('', undefined)).to.be.false;
  });

  it('should validate with wrong email format', () => {
    expect(validateEmail('', 'testuser@mail')).to.be.false;
  });

  it('should validate with wrong email format 2', () => {
    expect(validateEmail('', 'testuser@mail..com')).to.be.false;
  });

  it('should validate with wrong email format 3', () => {
    expect(validateEmail('', '@mail.com')).to.be.false;
  });

  it('should validate with valid email', () => {
    expect(validateEmail('', 'testuser@example.org')).to.be.true;
  });

  it('should validate with valid email 2', () => {
    expect(validateEmail('', 'test123@example.org')).to.be.true;
  });

  it('should validate with boolean', () => {
    expect(validateEmail('', false)).to.be.false;
  });
});
