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
  const strings = tree.filter(filterEqualEntriesOut).map((entryData) => {
    switch (entryData.status) {
      case 'complex':
        return getPlainTree(entryData.children, `${previousKeys + entryData.key}.`);

      case 'added':
        return `Property '${previousKeys}${entryData.key}' was added with value: ${getPlainValue(
          entryData.value2,
        )}`;

      case 'removed':
        return `Property '${previousKeys}${entryData.key}' was removed`;

      case 'modified':
        return `Property '${previousKeys}${entryData.key}' was updated. From ${getPlainValue(
          entryData.value1,
        )} to ${getPlainValue(entryData.value2)}`;

      case 'equal':
        break;

      default:
        throw new Error(`unknown key status ${entryData.status} of ${entryData.key} key!`);
    }

    return null;
  });

  const result = _.flattenDeep(strings).join('\n');
  return result;
};

export default getPlainTree;
