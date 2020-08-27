import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const selectFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;

    default:
      throw new Error('Unsupported formatFunction option');
  }
};

export default selectFormatter;
