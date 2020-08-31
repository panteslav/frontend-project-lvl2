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

const printTree = (tree, indentSize = BASE_INDENT_SIZE) => {
  let result = '';
  const keys = Object.keys(tree);
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);
  const textIndent = _.repeat(' ', indentSize - symbolCompensationIndent);

  keys.forEach((key) => {
    const currentKey = tree[key];
    const currentIndent = indentSize + BASE_INDENT_SIZE;

    if (_.has(currentKey, 'children')) {
      result += `${textIndent}  ${key}: ${printTree(currentKey.children, currentIndent)}`;
      return;
    }

    switch (currentKey.status) {
      case '-':
        result += `${textIndent}- ${key}: ${printValue(currentKey.value1, currentIndent)}`;
        return;
      case '+':
        result += `${textIndent}+ ${key}: ${printValue(currentKey.value2, currentIndent)}`;
        return;
      case '=':
        result += `${textIndent}  ${key}: ${printValue(currentKey.value1, currentIndent)}`;
        return;
      case '≠':
        result += `${textIndent}- ${key}: ${printValue(currentKey.value1, currentIndent)}`;
        result += `${textIndent}+ ${key}: ${printValue(currentKey.value2, currentIndent)}`;
        return;
      default:
        throw new Error('wrong key status in the diffTree');
    }
  });

  return `{\n${result}${bracketIndent}}\n`;
};

export default printTree;
