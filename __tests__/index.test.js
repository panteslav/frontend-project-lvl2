import gendiff from '../src/index.js';

const result = `{
    host: hexlet.io
  + timeout: 50
  - timeout: 20
  + proxy: 123.234.53.22
  + follow: false
  - verbose: true
}`;

describe('plain files test', () => {
  test('plain json files comparison', () => {
    expect(gendiff('__fixtures__/plain1.json', '__fixtures__/plain2.json')).toEqual(result);
  });

  test('plain yaml files comparison', () => {
    expect(gendiff('__fixtures__/plain1.yml', '__fixtures__/plain2.yml')).toEqual(result);
  });
});
