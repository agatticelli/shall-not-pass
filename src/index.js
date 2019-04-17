import * as rules from './rules';
import * as helpers from './helpers';

export default function validate(data, validations) {
  return Object.entries(validations).reduce((errors, [attribute, rulesToValidate]) => {
    const ruleParser = /(\w+)(?::([^|]*))?/g;
    let match;
    while (match = ruleParser.exec(rulesToValidate)) {
      const [, rule, params = ""] = match;
      const fullRuleName = helpers.snakeToCamel(`validate_${rule}`);
      if (!rules[fullRuleName].call(null, attribute, data[attribute], params.split(','))) {
        errors[attribute] || (errors[attribute] = {});
        errors[attribute][rule] = 'Failed';
      }
    }

    return errors;
  }, {});
}
