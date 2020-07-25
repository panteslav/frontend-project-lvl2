import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

export default (filePath) => {
  const extension = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');

  switch (extension) {
    case '.json':
      return JSON.parse(data);

    case '.yml':
    case '.yaml':
      return yaml.safeLoad(data);

    case '.ini':
      return ini.parse(data);

    default:
      throw new Error('Unsupported file extension');
  }
};
