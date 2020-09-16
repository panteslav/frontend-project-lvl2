import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

describe('nested files tests', () => {
  // all tests use the same nested paths,
  // so to avoid code duplication they should be left on the uppper level
  const nestedPath1 = getFixturePath('nested1.json');
  const nestedPath2 = getFixturePath('nested2.json');

  test('format by default', () => {
    const nestedStylishResult = readFile(getFixturePath('stylish.result')).toString();
    expect(gendiff(nestedPath1, nestedPath2).trim()).toEqual(nestedStylishResult);
  });

  test('stylish format test', () => {
    const nestedStylishResult = readFile(getFixturePath('stylish.result')).toString();
    expect(gendiff(nestedPath1, nestedPath2, 'stylish').trim()).toEqual(nestedStylishResult);
  });

  test('plain format test', () => {
    const nestedPlainResult = readFile(getFixturePath('plain.result')).toString();
    expect(gendiff(nestedPath1, nestedPath2, 'plain').trim()).toEqual(nestedPlainResult);
  });

  test('JSON format test', () => {
    const nestedJSONResult = readFile(getFixturePath('json.result')).toString();
    expect(gendiff(nestedPath1, nestedPath2, 'JSON')).toEqual(nestedJSONResult);
  });
});
