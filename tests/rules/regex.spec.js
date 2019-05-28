import { expect } from 'chai';

import { validateRegex } from '../../src/rules';

describe('Test regex rule', () => {
  it('should pass lowercase regex', () => {
    expect(validateRegex('', 'lumus maxima', ['^[a-z\\s]+$'])).to.be.true;
  });

  it('should validate regex with comma', () => {
    expect(validateRegex('', '1, 2, 3 vera verto', ['[1-9,]+'])).to.be.true;
  });

  it('should fail regex', () => {
    expect(validateRegex('', '1 2 3 vera verto', ['^[1-9]+$'])).to.be.false;
  });
});
