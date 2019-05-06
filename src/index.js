import * as helpers from './helpers';
import MessageParser from './messages';
import * as rules from './rules';
import * as types from './types';

export default class Gandalf {
  static ruleParser = /(\w+)(?::([^|]*))?/g;
  static fallbackLanguage = 'en';
  static fallbackMessagesPath = './resources';
  static messagesPaths = [];

  static addCustomRule(rule, callback) {
    const fullRuleName = helpers.snakeToCamel(`validate_${rule}`);
    rules[fullRuleName] = callback;
  }

  static addMessagesPath(messagesPath) {
    Gandalf.messagesPaths.push(messagesPath);
  }

  constructor(data, rules, options = {}) {
    this.data = data;
    this.rules = rules;

    const language = options.language || Gandalf.fallbackLanguage;

    this.messageParser = new MessageParser(language, Gandalf.fallbackMessagesPath);

    Gandalf.messagesPaths.forEach(messagesPath => {
      this.messageParser.load(messagesPath);
    })
  }

  async validate() {
    this.rulesFound = {};
    const rulesEntries = Object.entries(this.rules);
    this.errors = await rulesEntries.reduce(async (prevErrors, [attribute, rulesToValidate]) => {
      const errors = await prevErrors;
      let match;
      this.rulesFound[attribute] = {};
      while (match = Gandalf.ruleParser.exec(rulesToValidate)) {
        let [, rule, params] = match;
        if (params) {
          params = params.split(',').map(i => i.trim());
        } else {
          params = [];
        }
        const fullRuleName = helpers.snakeToCamel(`validate_${rule}`);
        this.rulesFound[attribute][fullRuleName] = {
          params: params,
          originalRuleName: rule,
        };
      }

      const rulesFoundEntries = Object.entries(this.rulesFound[attribute]);

      await Promise.all(rulesFoundEntries.map(async ([rule, extra]) => {
        const isValidatable = this.isValidatable(extra.originalRuleName, attribute);

        if (isValidatable) {
          const passes = await rules[rule].call(
            this, attribute, this.data[attribute], extra.params
          );

          if (!passes) {
            errors[attribute] || (errors[attribute] = {});
            errors[attribute][extra.originalRuleName] = this.messageParser.parse(
              extra.originalRuleName,
              attribute,
              extra.params,
            );
          }
        }
      }));

      return errors;
    }, Promise.resolve({}));

    return this.isValid();
  }

  revalidate(changes) {
    changes.data && (this.data = changes.data);
    changes.rules && (this.rules = changes.rules);

    return this.validate();
  }

  isValidatable(rule, attribute) {
    return (
      this.presentOrRuleIsImplicit(rule, attribute)
      && this.isNotNullIfMarkedAsNullable(rule, attribute)
    );
  }
  
  presentOrRuleIsImplicit(rule, attribute) {
    return this.validatePresent(attribute) || this.isImplicit(rule);
  }

  isImplicit(rule) {
    return rules.IMPLICIT_RULES.includes(rule);
  }

  validatePresent(attribute) {
    return attribute in this.data;
  }

  isNotNullIfMarkedAsNullable(rule, attribute) {
    if (this.isImplicit(rule) || !this.hasRule(attribute, 'nullable')) {
      return true;
    }

    return !types.isNull(this.data[attribute]);
  }

  hasRule(attribute, rule) {
    if (!this.rulesFound[attribute]) {
      return false;
    }

    return Object.entries(
      this.rulesFound[attribute]
    ).some(
      ([, extra]) => rule === extra.originalRuleName
    );
  }

  isValid() {
    return Object.keys(this.errors).length === 0;
  }
}