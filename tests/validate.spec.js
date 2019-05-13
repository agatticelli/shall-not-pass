import { expect } from 'chai';

import Gandalf from '../src';

import customEn from './custom/english';

describe('Test validate function', () => {
  before(() => Gandalf.addMessages(customEn));

  it('should validate required|email with success', async () => {
    const data = { email: 'usertest@example.org' };
    const gandalf = new Gandalf(data, {
      email: 'required|email',
    });

    await gandalf.validate();

    expect(gandalf.errors).to.be.empty;
  });

  it('should checks isValid function', async () => {
    const data = { email: 'usertest@.org' };
    const gandalf = new Gandalf(data, {
      email: 'email',
    });
    await gandalf.validate();

    expect(gandalf.isValid()).to.be.false;

    await gandalf.revalidate({ data: { email: 'usertest@example.org' } });
    expect(gandalf.isValid()).to.be.true;
  });

  it('should validate required|email with fail', async () => {
    const data = { email: 'stringquenoesunmail' };
    const gandalf = new Gandalf(data, {
      email: 'required|email',
    });

    await gandalf.validate();

    expect(gandalf.errors).to.not.be.empty;
    expect(gandalf.errors).to.haveOwnProperty('email');
    expect(gandalf.errors['email']).to.haveOwnProperty('email');
    expect(gandalf.errors['email']).to.not.haveOwnProperty('required');
  });

  it('should validate required|email with double fail', async () => {
    const data = { email: '' };
    const gandalf = new Gandalf(data, {
      email: 'email',
    });

    await gandalf.validate();

    expect(gandalf.errors).to.not.be.empty;
    expect(gandalf.errors).to.haveOwnProperty('email');
    expect(gandalf.errors['email']).to.haveOwnProperty('email');
  });

  it('should validate between', async () => {
    const data = { name: 'Dexter Morgan' };
    const gandalf = new Gandalf(data, {
      name: 'required|between:5,25|string',
    });

    await gandalf.validate();
    expect(gandalf.errors).to.be.empty;

    await gandalf.revalidate({
      rules: {
        name: 'required|between:5,10|string',
      },
    });
    expect(gandalf.errors).to.have.keys(['name']);
    expect(gandalf.errors['name']).to.have.keys(['between']);
  });

  it('should validate numeric', async () => {
    const gandalf = new Gandalf({ userId: 113 }, {
      userId: 'numeric',
    });

    await gandalf.validate();
    expect(gandalf.errors).to.be.empty;

    await gandalf.revalidate({
      data: {}
    });
    expect(gandalf.errors).to.be.empty;

    await gandalf.revalidate({
      data: { userId: null },
    });
    expect(gandalf.errors).to.not.be.empty;
    expect(gandalf.errors).to.haveOwnProperty('userId');

    await gandalf.revalidate({
      rules: {
        userId: 'nullable|numeric',
      }
    });
    expect(gandalf.errors).to.be.empty;
  });

  it('should validate custom rule', async () => {
    Gandalf.addCustomRule('in_list', function(attribute, value, params) {
      expect(attribute).to.be.equal('userId');
      expect(value).to.be.equal(113);
      expect(params).to.eql(['1', '10', '113', '1000']);
    });

    const gandalf = new Gandalf({ userId: 113 }, {
      userId: 'numeric|in_list:1,10,113,1000',
    });

    await gandalf.validate();
  });

  it('should validate custom rule with promise', async () => {
    Gandalf.addCustomRule('is_five', function(attribute, value, params) {
      return new Promise((resolve, reject) => {
        resolve(value === 5);
      });
    });

    const gandalf = new Gandalf({ userId: 113 }, {
      userId: 'is_five',
    });
    await gandalf.validate();
    expect(gandalf.errors).to.not.be.empty;

    await gandalf.revalidate({ data: { userId: 5 } });
    expect(gandalf.errors).to.be.empty;
  });

  it('should validate another language', async () => {
    const data = { description: 3 };
    const gandalf = new Gandalf(data, {
      description: 'string',
    }, {
      language: 'es'
    });

    await gandalf.validate();

    expect(gandalf.errors).to.not.be.empty;
    expect(gandalf.errors.description.string).to.be.equal('El campo description debe ser texto');
  });
});