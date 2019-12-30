export type ObjectLiteral = {
  [key: string]: any;
};

export type RuleMessage = {
  [key: string]: string;
};

export type RuleMessageBag = {
  [countryCode: string]: RuleMessage;
};

export type ValidationValue =
  | object
  | string
  | number
  | undefined
  | null
  | Date
  | string
  | number
  | boolean
  | Array<ValidationValue>
  | Set<ValidationValue>;
