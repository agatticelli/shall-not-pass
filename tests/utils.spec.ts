import { expect } from 'chai';

import utils from '../src/utils';

describe('Test utils', () => {
  describe('Test getSize function', () => {
    it('should validate with a primitive number', () => {
      expect(utils.values.getSize(12)).to.be.equal(12);
    });

    it('should validate with a Number instance', () => {
      expect(utils.values.getSize(Number(22))).to.be.equal(22);
    });

    it('should validate with a string', () => {
      expect(utils.values.getSize("Expeliarmus")).to.be.equal(11);
    });

    it('should validate with an array', () => {
      expect(utils.values.getSize(["Ron", "Hermione", "Harry"])).to.be.equal(3);
    });

    it('should validate with a boolean', () => {
      expect(utils.values.getSize(true)).to.be.equal(0);
    });
  });

  describe('Test snakeToCamel function', () => {
    it('should camelize a snaked string', () => {
      expect(utils.string.snakeToCamel("spells_collection")).to.be.equal('spellsCollection');
    });
  });
});
