import * as fs from 'fs';
import * as path from 'path';

export default class MessageParser {
  constructor(language, messagesPath) {
    this.language = language;
    this.messages = this.readMessagesFile(path.join(messagesPath, `${language}.json`));
  }

  load(messagesPath) {
    const newMessages = this.readMessagesFile(
      path.join(messagesPath, `${this.language}.json`)
    );

    this.messages = Object.assign(this.messages, newMessages);
  }

  readMessagesFile(path) {
    let messages;
    try {
      messages = JSON.parse(fs.readFileSync(path));
    } catch {
      messages = {};
    }

    return messages;
  }

  parse(rule, attribute, params, customMessage) {
    let message = customMessage || this.messages[rule];
    message = message.replace(':attribute', attribute);

    const argsRegex = /(:(?:\.\.\.)?\w+)/gm;
    const matches = [];

    let match;
    while(match = argsRegex.exec(message)) {
      matches.push(match);
    }

    if (params.length) {
      matches.forEach(match => {
        if (match[1].startsWith(':...')) {
          message = message.replace(match[1], params.join(','));
        } else {
          const currentParam = params.shift();
          message = message.replace(match[1], currentParam);
        }
      });
    }

    return message;
  }
}