import yaml from 'js-yaml';
import ini from 'ini';

export default (extension, data) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);

    case '.yml':
    case '.yaml':
      return yaml.safeLoad(data);

    case '.ini':
      return ini.parse(data);

    default:
      throw new Error(`Unsupported file extension: ${extension}!`);
  }
};
