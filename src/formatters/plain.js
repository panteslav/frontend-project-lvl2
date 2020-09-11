import _ from 'lodash';

const getPlainValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;

    case 'object':
      return '[complex value]';

    default:
      return value;
  }
};

const getPlainTree = (tree, previousKeys = '') => {
  let result = '';

  const keys = Object.keys(tree);

  keys.forEach((key) => {
    if (_.has(tree[key], 'children')) {
      result += getPlainTree(tree[key].children, `${previousKeys + key}.`);
      return;
    }

    if (tree[key].status === '+') {
      result += `\nProperty '${previousKeys}${key}' was added with value: ${getPlainValue(
        tree[key].value2,
      )}`;
      return;
    }

    if (tree[key].status === '-') {
      result += `\nProperty '${previousKeys}${key}' was removed`;
      return;
    }

    if (tree[key].status === '≠') {
      result += `\nProperty '${previousKeys}${key}' was updated. From ${getPlainValue(
        tree[key].value1,
      )} to ${getPlainValue(tree[key].value2)}`;
    }
  });

  return result;
};

export default getPlainTree;
