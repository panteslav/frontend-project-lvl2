import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

describe('nested files tests', () => {
  test.each([[], ['stylish'], ['plain'], ['json']])('format: %s', (format = 'stylish') => {
    const nestedPath1 = getFixturePath('nested1.json');
    const nestedPath2 = getFixturePath('nested2.json');
    const expected = readFile(getFixturePath(`${format}.result`));
    expect(gendiff(nestedPath1, nestedPath2, format).trim()).toEqual(expected);
  });
});
