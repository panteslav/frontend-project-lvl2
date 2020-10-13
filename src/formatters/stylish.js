import _ from 'lodash';

const BASE_INDENT_SIZE = 4;
const SYMBOL_COMPENSATION_INDENT_SIZE = 2;

const getStyledResult = (result, bracketIndent) => `{\n${result.join('\n')}\n${bracketIndent}}`;

const getStyledValue = (value, indentSize) => {
  if (!_.isObject(value)) {
    return `${value.toString()}`;
  }

  const keys = Object.keys(value);
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);
  const textIndent = _.repeat(' ', indentSize);

  const result = keys.map(
    (key) => `${textIndent}${key}: ${getStyledValue(value[key], indentSize + BASE_INDENT_SIZE)}`,
  );
  return getStyledResult(result, bracketIndent);
};

const getStyledTree = (tree, indentSize = BASE_INDENT_SIZE) => {
  const bracketIndent = ' '.repeat(indentSize - BASE_INDENT_SIZE);
  const textIndent = ' '.repeat(indentSize - SYMBOL_COMPENSATION_INDENT_SIZE);

  const result = tree.map((entryData) => {
    const currentIndentSize = indentSize + BASE_INDENT_SIZE;
    const { key, status, children } = entryData;

    const value1 = _.has(entryData, 'value1') ? getStyledValue(entryData.value1, currentIndentSize) : null;
    const value2 = _.has(entryData, 'value2') ? getStyledValue(entryData.value2, currentIndentSize) : null;

    switch (status) {
      case 'complex':
        return `${textIndent}  ${key}: ${getStyledTree(
          children,
          currentIndentSize,
        )}`;
      case 'removed':
        return `${textIndent}- ${key}: ${value1}`;
      case 'added':
        return `${textIndent}+ ${key}: ${value2}`;
      case 'equal':
        return `${textIndent}  ${key}: ${value1}`;
      case 'modified':
        return `${textIndent}- ${key}: ${value1}\n${textIndent}+ ${key}: ${value2}`;
      default:
        throw new Error(`unknown value status: ${status}`);
    }
  });

  return getStyledResult(result, bracketIndent);
};

export default getStyledTree;
