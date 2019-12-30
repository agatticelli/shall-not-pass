import MessageParser from './MessageParser';
import { RuleManager, IMPLICIT_RULES, RuleCallback } from './RuleManager';
import * as typesChecker from './types-checker';
import { RuleMessage, ObjectLiteral } from './types';

export type GandalfOptions = {
  language?: string;
};

type RulesFound = {
  [attribute: string]: {
    [ruleName: string]: {
      params: Array<string>;
    };
  };
};

type RulesToCheck = {
  [attribute: string]: string;
};

type GandalfErrors = {
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

    this.errors = await attributesToCheck.reduce(async (prevErrors, attributesToCheck) => {
      const errors = await prevErrors;
      const rulesFoundEntries = Object.entries(this.rulesFound[attributesToCheck]);

      await Promise.all(
        rulesFoundEntries.map(async ([ruleName, extra]) => {
          const isValidatable = this.isValidatable(ruleName, attributesToCheck);

          if (isValidatable) {
            const passes = await Gandalf.ruleManager
              .getRule(ruleName)
              .call(this, attributesToCheck, this.data[attributesToCheck], extra.params);

            if (!passes) {
              errors[attributesToCheck] || (errors[attributesToCheck] = {});
              errors[attributesToCheck][ruleName] = this.messageParser.parse(ruleName, attributesToCheck, extra.params);
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

  isValidatable(ruleName: string, attribute: string): boolean {
    return this.presentOrRuleIsImplicit(ruleName, attribute) && this.isNotNullIfMarkedAsNullable(ruleName, attribute);
  }

  presentOrRuleIsImplicit(ruleName: string, attribute: string): boolean {
    return this.validatePresent(attribute) || this.isImplicit(ruleName);
  }

  isImplicit(ruleName: string): boolean {
    return IMPLICIT_RULES.includes(ruleName);
  }

  validatePresent(attribute: string): boolean {
    return attribute in this.data;
  }

  isNotNullIfMarkedAsNullable(ruleName: string, attribute: string): boolean {
    if (this.isImplicit(ruleName) || !this.hasRule(attribute, 'nullable')) {
      return true;
    }

    return !typesChecker.isNull(this.data[attribute]);
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
