import _ from 'lodash';

const BASE_INDENT_SIZE = 4;
const symbolCompensationIndent = 2;

const getStyledValue = (value, indentSize) => {
  if (!_.isObject(value)) {
    return `${value.toString()}\n`;
  }

  const keys = Object.keys(value);
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);
  const textIndent = _.repeat(' ', indentSize);

  let result = '';

  keys.forEach((key) => {
    result += `${textIndent}${key}: ${getStyledValue(value[key], indentSize + BASE_INDENT_SIZE)}`;
  });
  return `{\n${result}${bracketIndent}}\n`;
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
    default:
      return `${textIndent}- ${key}: ${value1}${textIndent}+ ${key}: ${value2}`;
  }
};

const getStyledTree = (tree, indentSize = BASE_INDENT_SIZE) => {
  let result = '';
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);
  const textIndent = _.repeat(' ', indentSize - symbolCompensationIndent);

  tree.forEach((entryData) => {
    const currentIndentSize = indentSize + BASE_INDENT_SIZE;
    if (entryData.status === 'complex') {
      result += `${textIndent}  ${entryData.key}: ${getStyledTree(
        entryData.children,
        currentIndentSize,
      )}`;
    } else result += getStyledEntry(entryData, textIndent, currentIndentSize);
  });

  return `{\n${result}${bracketIndent}}\n`;
};

export default getStyledTree;
