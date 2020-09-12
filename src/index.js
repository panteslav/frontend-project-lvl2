import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import createDiffTree from './differenceGenerator';
import getFormatter from './formatters/index.js';

const gendiff = (path1, path2, format = 'stylish') => {
  const data1 = fs.readFileSync(path1, 'utf-8');
  const extension1 = path.extname(path1);

  const data2 = fs.readFileSync(path2, 'utf-8');
  const extension2 = path.extname(path2);

  const formatTree = getFormatter(format);

  const configuration1 = parse(extension1, data1);
  const configuration2 = parse(extension2, data2);

  const diffTree = createDiffTree(configuration1, configuration2);

  return formatTree(diffTree);
};

export default gendiff;
