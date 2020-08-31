import _ from 'lodash';

const createSetOfAllKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allUniqueKeys = new Set();
  keys1.forEach((key) => allUniqueKeys.add(key));
  keys2.forEach((key) => allUniqueKeys.add(key));

  return allUniqueKeys;
};

const map = (obj1, obj2, key) => {
  if (_.has(obj1, key) && !_.has(obj2, key)) {
    return {
      status: '-',
      value1: obj1[key],
    };
  }

  if (!_.has(obj1, key) && _.has(obj2, key)) {
    return {
      status: '+',
      value2: obj2[key],
    };
  }

  if (obj1[key] === obj2[key]) {
    return {
      status: '=',
      value1: obj1[key],
    };
  }

  if (obj1[key] !== obj2[key]) {
    return {
      status: '≠',
      value1: obj1[key],
      value2: obj2[key],
    };
  }

  throw new Error('error while parsing objects');
};

const createDiffTree = (obj1, obj2) => {
  const uniqueKeys = Array.from(createSetOfAllKeys(obj1, obj2)).sort();
  const result = {};

  uniqueKeys.forEach((key) => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      result[key] = {
        status: '=',
        children: createDiffTree(obj1[key], obj2[key]),
      };
      return;
    }

    result[key] = map(obj1, obj2, key);
  });

  return result;
};

export default createDiffTree;
