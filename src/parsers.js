import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

export default (filePath) => {
  const extension = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');

  if (extension === '.json') {
    return JSON.parse(data);
  }

  if (extension === '.yml' || extension === '.yaml') {
    return yaml.safeLoad(data);
  }

  throw new Error('Unsupported file extension.');
};
