import { forEach, get, isEmpty as lodashIsEmpty, keys } from "lodash";
import { BOOLEAN_STR_VALUES } from './constant';

export const isEmpty = (value: any) => {
  const type = typeof value;

  switch (type) {
    case "object":
      return lodashIsEmpty(value);
    case "string":
      return (value ?? "").length <= 0;
    case "number":
    case "bigint":
    case "boolean":
    case "symbol":
      return false;
    case "undefined":
      return true;
    default:
      return (value ?? "").length <= 0;
  }
};

export const required = (expression: boolean | string, value: any) => {
    if (!!expression && (true === expression || expression.toString().toLowerCase() === BOOLEAN_STR_VALUES.TRUE)) {
        return !isEmpty(value);
    } else {
        return true;
    }
}

export const minLength = (expression: string, value: any) => {
    if (isEmpty(expression) || isEmpty(value)) {
        return false;
    }

    const minNum = parseInt(expression, 10);
    const valueLength = !!value && !!value.length ? value.lenght : 0;

    return valueLength >= minNum;
}

export const length = (expression: string, value: any) => {
    if (isEmpty(expression) || isEmpty(value)) {
        return false;
    }

    const lengthNum = parseInt(expression, 10);
    const valueLength = !!value && !!value.length ? value.length : 0;

    return valueLength === lengthNum;
}

export const predefined = {
  required,
  minLength,
  length
};

export const validateComp = (compValidation: any, runtimeParam: any): string => {
  let result = '';
  let isValid = true;
  const rulesNames = keys(compValidation);

  forEach(rulesNames, rule => {
    const predefinedValidateFunc = get(predefined, rule, '');
    const expression = compValidation[rule].expression;

    if (predefinedValidateFunc) {
      // get dynamic value
      const expVal = typeof expression === 'function' ? expression(runtimeParam) : expression;
      isValid = predefinedValidateFunc(expVal, runtimeParam?.compValue ?? '');
    } else {
      try {
        // try to perform custom validation
        isValid = expression(runtimeParam);
      } catch (e) {
        // if can't validate -> return true so not block users
        isValid = true;
      }
    }

    // if there is an error then break the loop
    if (!isValid) {
      const message = compValidation[rule].message;
      if ( typeof message === 'string') {
        result = message;
      } else if (typeof message === 'function') {
        try {
          result = message(runtimeParam);
        } catch (e) {
          result = 'Invalid error message'
        }
      } else {
        result = 'Something went wrong'
      }
    }

    return isValid;
  });

  return result;
}