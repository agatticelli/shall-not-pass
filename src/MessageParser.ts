import defaultMessages from '../resources';

type RuleMessage = {
  [key: string]: string;
};

type RuleMessageBag = {
  [countryCode: string]: RuleMessage;
};

class MessageParser {
  static defaultLanguage = 'en';
  static messages: RuleMessageBag = {};

  static addMessages(messages: RuleMessage, language?: string): void {
    const lang = language || MessageParser.defaultLanguage;

    MessageParser.messages[lang] || (MessageParser.messages[lang] = {});
    Object.assign(MessageParser.messages[lang], messages);
  }

  private language: string;

  constructor(language?: string) {
    this.language = language || MessageParser.defaultLanguage;
  }

  parse(ruleName: string, attribute: string, params: Array<string>, customMessage?: string): string {
    let message = customMessage || MessageParser.messages[this.language][ruleName];
    message = message.replace(':attribute', attribute);

    const argsRegex = /(:(?:\.\.\.)?\w+)/gm;
    const matches: Array<RegExpExecArray> = [];

    let match: RegExpExecArray | null;
    while ((match = argsRegex.exec(message))) {
      matches.push(match);
    }

    matches.forEach((match, index) => {
      if (match[1].startsWith(':...')) {
        message = message.replace(match[1], params.join(','));
      } else {
        message = message.replace(match[1], params[index]);
      }
    });

    return message;
  }
}

Object.entries(defaultMessages).forEach(([language, messages]) => {
  MessageParser.addMessages(messages as RuleMessage, language);
});

export { MessageParser, RuleMessage, RuleMessageBag };
