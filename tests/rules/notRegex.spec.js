import { expect } from 'chai';

import { validateNotRegex } from '../../src/rules';

describe('Test not regex rule', () => {
  it('should pass lowercase regex', () => {
    expect(validateNotRegex('', 'lumus maxima', ['^[a-z\\s]+$'])).to.be.false;
  });

  it('should validate regex with comma', () => {
    expect(validateNotRegex('', '1, 2, 3 vera verto', ['[1-9,]+'])).to.be.false;
  });

  it('should fail regex', () => {
    expect(validateNotRegex('', '1 2 3 vera verto', ['^[1-9]+$'])).to.be.true;
  });
});
