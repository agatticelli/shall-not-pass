import * as rules from './rules';
import * as helpers from './helpers';
import * as types from './types';

export default class Gandalf {
  static ruleParser = /(\w+)(?::([^|]*))?/g;
  static addCustomRule(rule, callback) {
    const fullRuleName = helpers.snakeToCamel(`validate_${rule}`);
    rules[fullRuleName] = callback;
  }

  constructor(data, rules) {
    this.data = data;
    this.rules = rules;

    this.rulesFound = {};
    this.errors = this.validate();
  }

  validate() {
    return Object.entries(this.rules).reduce((errors, [attribute, rulesToValidate]) => {
      let match;
      this.rulesFound[attribute] = {};
      while (match = Gandalf.ruleParser.exec(rulesToValidate)) {
        const [, rule, params = ""] = match;
        const fullRuleName = helpers.snakeToCamel(`validate_${rule}`);
        this.rulesFound[attribute][fullRuleName] = {
          params: params.split(',').map(i => i.trim()),
          originalRuleName: rule,
        };
      }

      Object.entries(this.rulesFound[attribute]).forEach(([rule, extra]) => {
        const isValidatable = this.siValidatable(extra.originalRuleName, attribute);
        // const isCustomRule = this.isCustomRule(extra.originalRuleName);

        if (isValidatable) {
          if (!rules[rule].call(null, attribute, this.data[attribute], extra.params)) {
            errors[attribute] || (errors[attribute] = {});
            errors[attribute][extra.originalRuleName] = 'Failed';
          }
        }
      });

      return errors;
    }, {});
  }

  revalidate(changes) {
    changes.data && (this.data = changes.data);
    changes.rules && (this.rules = changes.rules);

    this.rulesFound = {};
    this.errors = this.validate();
  }

  siValidatable(rule, attribute) {
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