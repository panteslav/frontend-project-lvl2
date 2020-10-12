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

const getStyledEntry = (entryData, textIndent, indentSize) => {
  const { key, status } = entryData;

  const value1 = _.has(entryData, 'value1') ? getStyledValue(entryData.value1, indentSize) : null;
  const value2 = _.has(entryData, 'value2') ? getStyledValue(entryData.value2, indentSize) : null;

  switch (status) {
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
};

const getStyledTree = (tree, indentSize = BASE_INDENT_SIZE) => {
  const bracketIndent = ' '.repeat(indentSize - BASE_INDENT_SIZE);
  const textIndent = ' '.repeat(indentSize - SYMBOL_COMPENSATION_INDENT_SIZE);

  const result = tree.map((entryData) => {
    const currentIndentSize = indentSize + BASE_INDENT_SIZE;
    if (entryData.status === 'complex') {
      return `${textIndent}  ${entryData.key}: ${getStyledTree(
        entryData.children,
        currentIndentSize,
      )}`;
    }
    return getStyledEntry(entryData, textIndent, currentIndentSize);
  });

  return getStyledResult(result, bracketIndent);
};

export default getStyledTree;
