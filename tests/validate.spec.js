import { expect } from 'chai';

import validate from '../src';

describe('Test validate function', () => {
  it('should validate required|email with success', () => {
    const data = { email: 'usertest@example.org' };
    const errors = validate(data, {
      'email': 'required|email',
    });

    expect(Object.keys(errors)).to.be.empty;
  });

  it('should validate required|email with fail', () => {
    const data = { email: 'stringquenoesunmail' };
    const errors = validate(data, {
      'email': 'required|email',
    });

    expect(Object.keys(errors)).to.not.be.empty;
    expect(errors).to.haveOwnProperty('email');
    expect(errors['email']).to.haveOwnProperty('email');
    expect(errors['email']).to.not.haveOwnProperty('required');
  });

  it('should validate required|email with double fail', () => {
    const data = { email: '' };
    const errors = validate(data, {
      'email': 'required|email',
    });

    expect(Object.keys(errors)).to.not.be.empty;
    expect(errors).to.haveOwnProperty('email');
    expect(errors['email']).to.haveOwnProperty('email');
    expect(errors['email']).to.haveOwnProperty('required');
  });
});