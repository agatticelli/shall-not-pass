import * as path from 'path';

export default class MessageParser {
  constructor(language, messagesPath) {
    this.language = language;
    try {
      this.messages = require(path.join(messagesPath, language));
    } catch (err) {
      this.messages = {};
    }
  }

  load(messagesPath) {
    this.messages = Object.assign(this.messages, require(path.join(messagesPath, this.language)))
  }

  parse(rule, attribute, params, customMessage) {
    let message = customMessage || this.messages[rule];
    message = message.replace(':attribute', attribute);

    const argsRegex = /(:\w+)/gm;
    const matches = [];

    let match;
    while(match = argsRegex.exec(message)) {
      matches.push(match);
    }

    if (params.length) {
      if (matches.length === params.length) {
        matches.forEach((match, idx) => {
          message = message.replace(match[1], params[idx]);
        });
      } else {
        message = message.replace(matches[0][1], params.join(','));
      }
    }

    return message;
  }
}