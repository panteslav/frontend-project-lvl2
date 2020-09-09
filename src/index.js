import parse from './parsers.js';
import createDiffTree from './differenceGenerator';
import getFormatter from './formatters/index.js';

const gendiff = (path1, path2, format = 'stylish') => {
  const formattedTree = getFormatter(format);

  const configuration1 = parse(path1);
  const configuration2 = parse(path2);

  const diffTree = createDiffTree(configuration1, configuration2);

  return formattedTree(diffTree);
};

export default gendiff;
