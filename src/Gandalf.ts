import { MessageParser, RuleMessage } from './MessageParser';
import { RuleManager, IMPLICIT_RULES, RuleCallback } from './RuleManager';
import * as typesChecker from './types-checker';
import { ObjectUtils } from './utils';
import { ObjectLiteral } from './types';

export type GandalfOptions = {
  language?: string;
};

export type RulesFound = {
  [attribute: string]: {
    [ruleName: string]: {
      params: Array<string>;
    };
  };
};

export type RulesToCheck = {
  [attribute: string]: string;
};

export type GandalfErrors = {
  [attribute: string]: {
    [rule: string]: string;
  };
};

class Gandalf {
  private static ruleParser = /(\w+)(?::([^|]*))?/g;
  private static ruleManager = new RuleManager();

  static addMessages(messages: RuleMessage, language?: string): void {
    MessageParser.addMessages(messages, language);
  }

  private rulesToCheck: RulesToCheck;
  private data: ObjectLiteral;
  private messageParser: MessageParser;
  private rulesFound: RulesFound;
  public errors: GandalfErrors;

  constructor(data: ObjectLiteral, rulesToCheck: RulesToCheck, options: GandalfOptions = {}) {
    this.data = data;
    this.rulesToCheck = rulesToCheck;
    this.errors = {};
    this.rulesFound = {};
    this.messageParser = new MessageParser(options.language);

    this.parseRules();
  }

  public addCustomRule(ruleName: string, callback: RuleCallback): void {
    Gandalf.ruleManager.addRule(ruleName, callback);
  }

  async validate(): Promise<boolean> {
    const attributesToCheck = Object.keys(this.rulesToCheck);

    const initialErrors: GandalfErrors = {};

    this.errors = await attributesToCheck.reduce(async (prevErrors, attribute) => {
      const errors = await prevErrors;
      const rulesFoundEntries = Object.entries(this.rulesFound[attribute]);

      await Promise.all(
        rulesFoundEntries.map(async ([ruleName, extra]) => {
          // check if ruleName should be validated for this attribute
          const isValidatable = this.isValidatable(ruleName, attribute);

          if (isValidatable) {
            const passes = await Gandalf.ruleManager
              .getRule(ruleName)
              .call(this, attribute, ObjectUtils.getValue(this.data, attribute), extra.params);

            if (!passes) {
              errors[attribute] || (errors[attribute] = {});
              errors[attribute][ruleName] = this.messageParser.parse(ruleName, attribute, extra.params);
            }
          }
        }),
      );

      return prevErrors;
    }, Promise.resolve(initialErrors));

    return this.isValid();
  }

  revalidate(changes: { data?: ObjectLiteral; rulesToCheck?: RulesToCheck }): Promise<boolean> {
    changes.data && (this.data = changes.data);
    changes.rulesToCheck && (this.rulesToCheck = changes.rulesToCheck);

    this.parseRules();

    return this.validate();
  }

  // isValidatable checks if ruleName should be validated on specific attribute
  isValidatable(ruleName: string, attribute: string): boolean {
    return this.presentOrRuleIsImplicit(ruleName, attribute) && this.isNotNullIfMarkedAsNullable(ruleName, attribute);
  }

  // presentOrRuleIsImplicit returns true if attribute is present inside input data or if the rule
  // being evaluated is an implicit one
  presentOrRuleIsImplicit(ruleName: string, attribute: string): boolean {
    return this.validatePresent(attribute) || this.isImplicit(ruleName);
  }

  // isImplicit returns true if current ruleName is an implicit rule
  isImplicit(ruleName: string): boolean {
    return IMPLICIT_RULES.includes(ruleName);
  }

  // validatePresent returns true if attribute is present inside data
  validatePresent(attribute: string): boolean {
    return ObjectUtils.keyExists(this.data, attribute);
  }

  // isNotNullIfMarkedAsNullable checks that rule is not implicit and more important if this attribute has a nullable
  // rule. In such case, if value is null it returns false to avoid validation
  isNotNullIfMarkedAsNullable(ruleName: string, attribute: string): boolean {
    if (this.isImplicit(ruleName) || !this.hasRule(attribute, 'nullable')) {
      return true;
    }

    return !typesChecker.isNull(ObjectUtils.getValue(this.data, attribute));
  }

  parseRules(): void {
    this.rulesFound = {};

    Object.entries(this.rulesToCheck).forEach(([attribute, rulesToValidate]) => {
      let match;
      this.rulesFound[attribute] = {};

      while ((match = Gandalf.ruleParser.exec(rulesToValidate))) {
        const [, rule, strParams = ''] = match;
        let params;

        if (strParams && !['regex', 'notRegex'].includes(rule)) {
          params = strParams.split(',').map(param => param.trim());
        } else {
          params = [strParams];
        }

        this.rulesFound[attribute][rule] = { params: params };
      }
    });
  }

  hasRule(attribute: string, sourceRuleName: string): boolean {
    if (!this.rulesFound[attribute]) {
      return false;
    }

    return Object.keys(this.rulesFound[attribute]).some(ruleName => ruleName === sourceRuleName);
  }

  isValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }
}

export { Gandalf };
