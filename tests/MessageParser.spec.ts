import { expect } from 'chai';

import { MessageParser } from '../src';

const messageParser = new MessageParser();

describe('Test MessageParser', () => {
  it('should check spread params', () => {
    const message = messageParser.parse('inArray', 'status', ["open", "assigned"], "You must choose one of the following: :...options.");
    expect(message).to.be.eql('You must choose one of the following: open,assigned.');
  });

  it('should check single params', () => {
    const message = messageParser.parse('min', 'age', ["18"], "You must be at least :min years old.");
    expect(message).to.be.eql('You must be at least 18 years old.');
  });

  it('should check multiple params', () => {
    const message = messageParser.parse('between', 'optsQuantity', ["3", "8"], "You must provide between :min and :max options.");
    expect(message).to.be.eql('You must provide between 3 and 8 options.');
  });
});
