import _ from 'lodash';

const createDiffTree = (obj1, obj2) => {
  const sortedUniqueKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const result = {};

  sortedUniqueKeys.forEach((key) => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      result[key] = {
        status: '=',
        children: createDiffTree(obj1[key], obj2[key]),
      };
      return;
    }

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
      return;
    }

    throw new Error('error while parsing objects');
  });

  return result;
};

export default createDiffTree;
