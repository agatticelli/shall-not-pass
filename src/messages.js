export default class MessageParser {
  static defaultLanguage = 'en';
  static messages = {};

  static addMessages(messages, language) {
    const lang = language || MessageParser.defaultLanguage;

    MessageParser.messages[lang] || (MessageParser.messages[lang] = {});
    Object.assign(MessageParser.messages[lang], messages);
  }

  constructor(language) {
    this.language = language || MessageParser.defaultLanguage;
  }

  parse(rule, attribute, params, customMessage) {
    let message = customMessage || MessageParser.messages[this.language][rule];
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

import defaultMessages from '../resources';
Object.entries(defaultMessages).forEach(([language, messages]) => {
  MessageParser.addMessages(messages, language);
});