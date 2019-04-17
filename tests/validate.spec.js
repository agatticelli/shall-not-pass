import { expect } from 'chai';

import Gandalf from '../src';

describe('Test validate function', () => {
  it('should validate required|email with success', () => {
    const data = { email: 'usertest@example.org' };
    const gandalf = new Gandalf(data, {
      email: 'required|email',
    });

    expect(gandalf.errors).to.be.empty;
  });

  it('should validate required|email with fail', () => {
    const data = { email: 'stringquenoesunmail' };
    const gandalf = new Gandalf(data, {
      email: 'required|email',
    });

    expect(gandalf.errors).to.not.be.empty;
    expect(gandalf.errors).to.haveOwnProperty('email');
    expect(gandalf.errors['email']).to.haveOwnProperty('email');
    expect(gandalf.errors['email']).to.not.haveOwnProperty('required');
  });

  it('should validate required|email with double fail', () => {
    const data = { email: '' };
    const gandalf = new Gandalf(data, {
      email: 'email',
    });

    expect(gandalf.errors).to.not.be.empty;
    expect(gandalf.errors).to.haveOwnProperty('email');
    expect(gandalf.errors['email']).to.haveOwnProperty('email');
  });

  it('should validate between', () => {
    const data = { name: 'Dexter Morgan' };
    const gandalf = new Gandalf(data, {
      name: 'required|between:5,25|string',
    });
    expect(gandalf.errors).to.be.empty;

    gandalf.revalidate({
      rules: {
        name: 'required|between:5,10|string',
      },
    });
    expect(gandalf.errors).to.have.keys(['name']);
    expect(gandalf.errors['name']).to.have.keys(['between']);
  });

  it('should validate numeric', () => {
    const gandalf = new Gandalf({ userId: 113 }, {
      userId: 'numeric',
    });
    expect(gandalf.errors).to.be.empty;

    gandalf.revalidate({
      data: {}
    });
    expect(gandalf.errors).to.be.empty;

    gandalf.revalidate({
      data: { userId: null },
    });
    expect(gandalf.errors).to.not.be.empty;
    expect(gandalf.errors).to.haveOwnProperty('userId');

    gandalf.revalidate({
      rules: {
        userId: 'nullable|numeric',
      }
    });
    expect(gandalf.errors).to.be.empty;
  });
});