import { expect } from 'chai';

import * as typesChecker from '../src/types-checker';

describe('Test types-checker', () => {
  it('should check isArray with valid array', () => {
    expect(typesChecker.isArray(['Ron', 'Hermione'])).to.be.equal(true);
  });

  it('should check isArray with number', () => {
    expect(typesChecker.isArray(7)).to.be.equal(false);
  });

  it('should check isArray with string', () => {
    expect(typesChecker.isArray('Stone')).to.be.equal(false);
  });

  it('should check isBoolean with valid boolean', () => {
    expect(typesChecker.isBoolean(true)).to.be.equal(true);
  });

  it('should check isBoolean with boolean number', () => {
    expect(typesChecker.isBoolean(1)).to.be.equal(false);
  });

  it('should check isBoolean with boolean string', () => {
    expect(typesChecker.isBoolean('true')).to.be.equal(false);
  });

  it('should check isBoolean with non boolean number', () => {
    expect(typesChecker.isBoolean(7)).to.be.equal(false);
  });

  it('should check isBoolean with non boolean string', () => {
    expect(typesChecker.isBoolean('Dumbledore')).to.be.equal(false);
  });

  it('should check isDate with real date object', () => {
    expect(typesChecker.isDate(new Date())).to.be.equal(true);
  });

  it('should check isDate with string date', () => {
    expect(typesChecker.isDate('2019/30/12')).to.be.equal(false);
  });

  it('should check isNull with null value', () => {
    const a = null;
    expect(typesChecker.isNull(a)).to.be.equal(true);
  });

  it('should check isNull with undefined value', () => {
    let a;
    expect(typesChecker.isNull(a)).to.be.equal(true);
  });

  it('should check isNull with empty string', () => {
    expect(typesChecker.isNull('')).to.be.equal(false);
  });

  it('should check isNull with 0', () => {
    expect(typesChecker.isNull(0)).to.be.equal(false);
  });

  it('should check isNull with null string', () => {
    expect(typesChecker.isNull('null')).to.be.equal(false);
  });

  it('should check isNumeric with number', () => {
    expect(typesChecker.isNumeric(7)).to.be.equal(true);
  });

  it('should check isNumeric with stringified number', () => {
    expect(typesChecker.isNumeric('7')).to.be.equal(true);
  });

  it('should check isNumeric with decimal number', () => {
    expect(typesChecker.isNumeric(1.2)).to.be.equal(true);
  });

  it('should check isNumeric with stringified decimal number', () => {
    expect(typesChecker.isNumeric('1.2')).to.be.equal(true);
  });

  it('should check isNumeric with malformed stringified decimal number', () => {
    expect(typesChecker.isNumeric('1.2.3')).to.be.equal(false);
  });

  it('should check isNumeric with boolean', () => {
    expect(typesChecker.isNumeric(false)).to.be.equal(false);
  });

  it('should check isNumeric with array', () => {
    expect(typesChecker.isNumeric([1, 2, 3, 4, 5, 6, 7])).to.be.equal(false);
  });

  it('should check isString with a string', () => {
    expect(typesChecker.isString('Hello')).to.be.equal(true);
  });

  it('should check isString with a string object', () => {
    expect(typesChecker.isString(new String('World'))).to.be.equal(true);
  });

  it('should check isString with number', () => {
    expect(typesChecker.isString(7)).to.be.equal(false);
  });
});
