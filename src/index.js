import _ from 'lodash';
import fs from 'fs';

const gendiff = (path1, path2) => {
  const file1 = fs.readFileSync(path1);
  const file2 = fs.readFileSync(path2);

  const configuration1 = JSON.parse(file1);
  const configuration2 = JSON.parse(file2);

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
