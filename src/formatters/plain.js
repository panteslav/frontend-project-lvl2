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

const filterEqualEntriesOut = (entry) => entry.status !== 'equal';

const getPlainTree = (tree, previousKeys = '') => {
  const lines = tree.filter(filterEqualEntriesOut).map((entryData) => {
    const {
      key,
      status,
      children,
      value1,
      value2,
    } = entryData;

    switch (status) {
      case 'complex':
        return getPlainTree(children, `${previousKeys + key}.`);

      case 'added':
        return `Property '${previousKeys}${key}' was added with value: ${getPlainValue(
          value2,
        )}`;

      case 'removed':
        return `Property '${previousKeys}${key}' was removed`;

      case 'modified':
        return `Property '${previousKeys}${key}' was updated. From ${getPlainValue(
          value1,
        )} to ${getPlainValue(value2)}`;

      case 'equal':
        break;

      default:
        throw new Error(`unknown key status ${status} of ${key} key!`);
    }

    return null;
  });

  const result = lines.flat(Infinity).join('\n');
  return result;
};

export default getPlainTree;
