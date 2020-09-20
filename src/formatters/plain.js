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
    const currentKey = tree[key];

    switch (currentKey.status) {
      case 'complex':
        result += getPlainTree(currentKey.children, `${previousKeys + key}.`);
        break;

      case 'added':
        result += `\nProperty '${previousKeys}${key}' was added with value: ${getPlainValue(
          currentKey.value2,
        )}`;
        break;

      case 'removed':
        result += `\nProperty '${previousKeys}${key}' was removed`;
        break;

      case 'modified':
        result += `\nProperty '${previousKeys}${key}' was updated. From ${getPlainValue(
          currentKey.value1,
        )} to ${getPlainValue(currentKey.value2)}`;
        break;

      case 'equal':
        break;

      default:
        throw new Error(`unknown key status ${currentKey.status} of ${currentKey} key!`);
    }
  });

  return result;
};

export default getPlainTree;
