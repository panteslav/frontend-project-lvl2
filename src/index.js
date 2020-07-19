import _ from 'lodash';
import parse from './parsers.js';

const gendiff = (path1, path2) => {
  const configuration1 = parse(path1);
  const configuration2 = parse(path2);

  const allKeys = { ...configuration1, ...configuration2 };

  const entries = Object.entries(allKeys);

  const reducer = (accumulator, [key, value]) => {
    if (!_.has(configuration1, key)) {
      accumulator.push(`- ${key}: ${value}`);
      return accumulator;
    }

    if (!_.has(configuration2, key)) {
      accumulator.push(`+ ${key}: ${value}`);
      return accumulator;
    }

    if (configuration1[key] === value && configuration2[key] === value) {
      accumulator.push(`  ${key}: ${value}`);
      return accumulator;
    }

    accumulator.push(`+ ${key}: ${configuration1[key]}`);
    accumulator.push(`- ${key}: ${value}`);
    return accumulator;
  };

  return `{\n  ${entries.reduce(reducer, []).join('\n  ')}\n}`;
};

export default gendiff;
