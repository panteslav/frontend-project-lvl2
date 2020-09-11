import _ from 'lodash';

const isKeyRemoved = (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key);
const isKeyAdded = (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key);
const isValueEqual = (key, obj1, obj2) => obj1[key] === obj2[key];

const getKeyStatus = (key, obj1, obj2) => {
  if (isKeyRemoved(key, obj1, obj2)) {
    return '-';
  }

  if (isKeyAdded(key, obj1, obj2)) {
    return '+';
  }

  if (isValueEqual(key, obj1, obj2)) {
    return '=';
  }

  return '≠';
};

const getKeyStatusWithValue = (obj1, obj2, key) => {
  const keyStatus = getKeyStatus(key, obj1, obj2);

  switch (keyStatus) {
    case '-':
      return {
        status: keyStatus,
        value1: obj1[key],
      };
    case '+':
      return {
        status: keyStatus,
        value2: obj2[key],
      };
    case '=':
      return {
        status: keyStatus,
        value1: obj1[key],
      };
    case '≠':
      return {
        status: keyStatus,
        value1: obj1[key],
        value2: obj2[key],
      };
    default:
      throw new Error('error while mapping');
  }
};

const createDiffTree = (obj1, obj2) => {
  const uniqueKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedUniqueKeys = uniqueKeys.sort();

  const getKeyDescription = (accumulator, key) => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      accumulator[key] = {
        status: '=',
        children: createDiffTree(obj1[key], obj2[key]),
      };
    } else {
      accumulator[key] = getKeyStatusWithValue(obj1, obj2, key);
    }

    return accumulator;
  };

  return sortedUniqueKeys.reduce(getKeyDescription, {});
};

export default createDiffTree;
