import * as rules from './rules';
import * as helpers from './helpers';
import * as types from './types';

export default class Gandalf {
  constructor(data, rules) {
    this.data = data;
    this.rules = rules;

    this.rulesFound = {};
    this.errors = this.validate();
  }

  validate() {
    return Object.entries(this.rules).reduce((errors, [attribute, rulesToValidate]) => {
      const ruleParser = /(\w+)(?::([^|]*))?/g;
      let match;
      this.rulesFound[attribute] = {};
      while (match = ruleParser.exec(rulesToValidate)) {
        const [, rule, params = ""] = match;
        const fullRuleName = helpers.snakeToCamel(`validate_${rule}`);
        this.rulesFound[attribute][fullRuleName] = {
          params: params.split(',').map(i => i.trim()),
          originalRuleName: rule,
        };
      }

      Object.entries(this.rulesFound[attribute]).forEach(([rule, extra]) => {
        if (this.isValiditable(extra.originalRuleName, attribute)) {
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

  isValiditable(rule, attribute) {
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
}