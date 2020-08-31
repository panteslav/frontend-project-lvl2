import _ from 'lodash';

const BASE_INDENT_SIZE = 4;
const symbolCompensationIndent = 2;

const printValue = (value, indentSize) => {
  if (typeof value !== 'object') {
    return `${value.toString()}\n`;
  }

  const keys = Object.keys(value);
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);
  const textIndent = _.repeat(' ', indentSize);

  let result = '';

  keys.forEach((key) => {
    result += `${textIndent}${key}: ${printValue(value[key], indentSize + BASE_INDENT_SIZE)}`;
  });
  return `{\n${result}${bracketIndent}}\n`;
};

const printEntry = (tree, key, textIndent, indentSize) => {
  const currentKey = tree[key];
  const value1 = _.has(currentKey, 'value1') ? printValue(currentKey.value1, indentSize) : null;
  const value2 = _.has(currentKey, 'value2') ? printValue(currentKey.value2, indentSize) : null;
  switch (currentKey.status) {
    case '-':
      return `${textIndent}- ${key}: ${value1}`;
    case '+':
      return `${textIndent}+ ${key}: ${value2}`;
    case '=':
      return `${textIndent}  ${key}: ${value1}`;
    default:
      return `${textIndent}- ${key}: ${value1}${textIndent}+ ${key}: ${value2}`;
  }
};

const printTree = (tree, indentSize = BASE_INDENT_SIZE) => {
  let result = '';
  const keys = Object.keys(tree);
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);
  const textIndent = _.repeat(' ', indentSize - symbolCompensationIndent);

  keys.forEach((key) => {
    const currentKey = tree[key];
    const currentIndentSize = indentSize + BASE_INDENT_SIZE;

    if (_.has(currentKey, 'children')) {
      result += `${textIndent}  ${key}: ${printTree(currentKey.children, currentIndentSize)}`;
    } else result += printEntry(tree, key, textIndent, currentIndentSize);
  });

  return `{\n${result}${bracketIndent}}\n`;
};

export default printTree;
