import _ from 'lodash';

const printValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;

    case 'object':
      return '[complex value]';

    default:
      return value;
  }
};

const printTreeInPlain = (tree, previousKeys = '') => {
  let result = '';

  const keys = Object.keys(tree);

  keys.forEach((key) => {
    if (_.has(tree[key], 'children')) {
      result += printTreeInPlain(tree[key].children, `${previousKeys + key}.`);
      return;
    }

    if (tree[key].status === '+') {
      result += `\nProperty '${previousKeys}${key}' was added with value: ${printValue(
        tree[key].value2,
      )}`;
      return;
    }

    if (tree[key].status === '-') {
      result += `\nProperty '${previousKeys}${key}' was removed`;
      return;
    }

    if (tree[key].status === '≠') {
      result += `\nProperty '${previousKeys}${key}' was updated. From ${printValue(
        tree[key].value1,
      )} to ${printValue(tree[key].value2)}`;
    }
  });

  return result;
};

export default printTreeInPlain;
