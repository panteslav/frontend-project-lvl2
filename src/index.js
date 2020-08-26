import parse from './parsers.js';
import createDiffTree from './differenceGenerator';
import formatStylish from './formatters/stylish.js';

const gendiff = (path1, path2, format = 'stylish') => {
  let printTree;

  switch (format) {
    case 'stylish':
      printTree = formatStylish;
      break;

    default:
      throw new Error('Unsupported format option');
  }

  const configuration1 = parse(path1);
  const configuration2 = parse(path2);

  const diffTree = createDiffTree(configuration1, configuration2);

  return printTree(diffTree);
};

export default gendiff;
