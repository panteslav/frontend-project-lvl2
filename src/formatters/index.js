import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const getFormatterFunction = (format) => {
  switch (format) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'JSON':
    case 'json':
      return formatJSON;

    default:
      throw new Error('Unsupported formatFunction option');
  }
};

export default getFormatterFunction;
