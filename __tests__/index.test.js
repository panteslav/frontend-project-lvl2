import gendiff from '../src/index.js';
import flatResult from '../__fixtures__/test_results/flatStylish.js';
import nestedPlainResult from '../__fixtures__/test_results/nestedPlain.js';
import nestedStylishResult from '../__fixtures__/test_results/nestedStylish.js';
import nestedJSONResult from '../__fixtures__/test_results/nestedJSON.js';

const nestedPath1 = '__fixtures__/nested1.json';
const nestedPath2 = '__fixtures__/nested2.json';

describe('flat files tests', () => {
  test.each([
    ['__fixtures__/flat1.json', '__fixtures__/flat2.json'],
    ['__fixtures__/flat1.yml', '__fixtures__/flat2.yml'],
    ['__fixtures__/flat1.ini', '__fixtures__/flat2.ini'],
  ])('flat files test №%#', (flatPath1, flatPath2) => {
    expect(gendiff(flatPath1, flatPath2)).toEqual(flatResult);
  });
});

describe('nested files tests', () => {
  test('format by default', () => {
    expect(gendiff(nestedPath1, nestedPath2)).toEqual(nestedStylishResult);
  });

  test('stylish format test', () => {
    expect(gendiff(nestedPath1, nestedPath2)).toEqual(nestedStylishResult);
  });

  test('plain format test', () => {
    expect(gendiff(nestedPath1, nestedPath2, 'plain')).toEqual(nestedPlainResult);
  });

  test('JSON format test', () => {
    // equal JSON objects would make the same strings
    expect(JSON.stringify(gendiff(nestedPath1, nestedPath2, 'JSON'))).toEqual(
      JSON.stringify(nestedJSONResult),
    );
  });
});
