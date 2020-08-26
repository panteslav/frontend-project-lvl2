import _ from 'lodash';

const BASE_INDENT_SIZE = 4;

const printValue = (value, indentSize) => {
  if (typeof value !== 'object') {
    return `${value.toString()}\n`;
  }

  const keys = Object.keys(value);
  const textIndent = _.repeat(' ', indentSize);
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);

  let result = '';

  keys.forEach((key) => {
    result += `${textIndent}${key}: ${printValue(value[key], indentSize + BASE_INDENT_SIZE)}`;
  });
  return `{\n${result}${bracketIndent}}\n`;
};

const printTree = (tree, indentSize = BASE_INDENT_SIZE) => {
  let result = '';
  const keys = Object.keys(tree);
  const textIndent = _.repeat(' ', indentSize - 2);
  const bracketIndent = _.repeat(' ', indentSize - BASE_INDENT_SIZE);

  keys.forEach((key) => {
    const currentKey = tree[key];

    if (_.has(currentKey, 'children')) {
      result += `${textIndent}  ${key}: ${printTree(
        currentKey.children,
        indentSize + BASE_INDENT_SIZE,
      )}`;
      return;
    }

    if (currentKey.status === '-') {
      result += `${textIndent}- ${key}: ${printValue(
        currentKey.value1,
        indentSize + BASE_INDENT_SIZE,
      )}`;
      return;
    }

    if (currentKey.status === '+') {
      result += `${textIndent}+ ${key}: ${printValue(
        currentKey.value2,
        indentSize + BASE_INDENT_SIZE,
      )}`;
      return;
    }

    if (currentKey.status === '=') {
      result += `${textIndent}  ${key}: ${printValue(
        currentKey.value1,
        indentSize + BASE_INDENT_SIZE,
      )}`;
      return;
    }

    if (currentKey.status === '≠') {
      result += `${textIndent}- ${key}: ${printValue(
        currentKey.value1,
        indentSize + BASE_INDENT_SIZE,
      )}`;
      result += `${textIndent}+ ${key}: ${printValue(
        currentKey.value2,
        indentSize + BASE_INDENT_SIZE,
      )}`;
    }
  });

  return `{\n${result}${bracketIndent}}\n`;
};

export default printTree;
