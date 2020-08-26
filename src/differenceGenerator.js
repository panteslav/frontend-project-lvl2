import _ from 'lodash';

const createSetOfAllKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allUniqueKeys = new Set();
  keys1.forEach((key) => allUniqueKeys.add(key));
  keys2.forEach((key) => allUniqueKeys.add(key));

  return allUniqueKeys;
};

const createDiffTree = (obj1, obj2) => {
  const uniqueKeys = Array.from(createSetOfAllKeys(obj1, obj2));
  const result = {};

  uniqueKeys.forEach((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      result[key] = {
        status: '-',
        value1: obj1[key],
      };
      return;
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      result[key] = {
        status: '+',
        value2: obj2[key],
      };
      return;
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      result[key] = {
        status: '=',
        children: createDiffTree(obj1[key], obj2[key]),
      };
      return;
    }

    if (obj1[key] === obj2[key]) {
      result[key] = {
        status: '=',
        value1: obj1[key],
      };
      return;
    }

    if (obj1[key] !== obj2[key]) {
      result[key] = {
        status: '≠',
        value1: obj1[key],
        value2: obj2[key],
      };
    }
  });

  return result;
};

export default createDiffTree;
