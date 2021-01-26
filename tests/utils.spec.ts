import { expect } from 'chai';

import {ValuesUtils, StringUtils, ObjectUtils} from '../src/utils';

const wizard = {
  firstName: 'Harry',
  lastName: 'Potter',
  address: {
    streetName: 'Privet Drive',
    streetNumber: 4,
    city: 'Little Whinging',
    references: {
      'between.1': 'street-1',
      'between.2': 'street-2',
    },
  },
};

describe('Test utils', () => {
  describe('Test getSize function', () => {
    it('should validate with a primitive number', () => {
      expect(ValuesUtils.getSize(12)).to.be.equal(12);
    });

    it('should validate with a Number instance', () => {
      expect(ValuesUtils.getSize(Number(22))).to.be.equal(22);
    });

    it('should validate with a string', () => {
      expect(ValuesUtils.getSize('Expeliarmus')).to.be.equal(11);
    });

    it('should validate with an array', () => {
      expect(ValuesUtils.getSize(['Ron', 'Hermione', 'Harry'])).to.be.equal(3);
    });

    it('should validate with a boolean', () => {
      expect(ValuesUtils.getSize(true)).to.be.equal(0);
    });
  });

  describe('Test snakeToCamel function', () => {
    it('should camelize a snaked string', () => {
      expect(StringUtils.snakeToCamel('spells_collection')).to.be.equal('spellsCollection');
    });
  });

  describe('Test getValue function', () => {
    it('should get simple-key value', () => {
      expect(ObjectUtils.getValue(wizard, 'firstName')).to.be.equal(wizard.firstName);
      expect(ObjectUtils.getValue(wizard, 'lastName')).to.be.equal(wizard.lastName);
    });

    it('should get nested-key value', () => {
      expect(ObjectUtils.getValue(wizard, 'address.streetName')).to.be.equal(wizard.address.streetName);
      expect(ObjectUtils.getValue(wizard, 'address.streetNumber')).to.be.equal(wizard.address.streetNumber);
    });

    it('should get escaped-key value', () => {
      expect(ObjectUtils.getValue(wizard, 'address.references.between\\.1')).to.be.equal(wizard.address.references["between.1"]);
      expect(ObjectUtils.getValue(wizard, 'address.references.between\\.2')).to.be.equal(wizard.address.references["between.2"]);
    });
  });

  describe('Test keyExists function', () => {
    it('should has simple-key', () => {
      expect(ObjectUtils.keyExists(wizard, 'firstName')).to.be.equal(true);
      expect(ObjectUtils.keyExists(wizard, 'lastName')).to.be.equal(true);
    });

    it('should has nested-key', () => {
      expect(ObjectUtils.keyExists(wizard, 'address.streetName')).to.be.equal(true);
      expect(ObjectUtils.keyExists(wizard, 'address.streetNumber')).to.be.equal(true);
    });

    it('should has escaped-key', () => {
      expect(ObjectUtils.keyExists(wizard, 'address.references.between\\.1')).to.be.equal(true);
      expect(ObjectUtils.keyExists(wizard, 'address.references.between\\.2')).to.be.equal(true);
      expect(ObjectUtils.keyExists(wizard, 'address.references.between.2')).to.be.equal(false);
    });

    it('should return false with empty key-path', () => {
      expect(ObjectUtils.keyExists(wizard, '')).to.be.equal(false);
    });

    it('should return false with not existing nested path', () => {
      expect(ObjectUtils.keyExists(wizard, 'some.strange.path')).to.be.equal(false);
    });
  });
});
