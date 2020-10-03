import _ from 'lodash';

const createDiffTree = (obj1, obj2) => {
  const sortedUniqueKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  const result = sortedUniqueKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        status: 'added',
        value2: obj2[key],
      };
    }

    if (!_.has(obj2, key)) {
      return {
        key,
        status: 'removed',
        value1: obj1[key],
      };
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        status: 'complex',
        children: createDiffTree(obj1[key], obj2[key]),
      };
    }

    if (value1 === value2) {
      return {
        key,
        status: 'equal',
        value1: obj1[key],
      };
    }

    if (value1 !== value2) {
      return {
        key,
        status: 'modified',
        value1: obj1[key],
        value2: obj2[key],
      };
    }

    throw new Error('error while parsing objects');
  });

  return result;
};

export default createDiffTree;
