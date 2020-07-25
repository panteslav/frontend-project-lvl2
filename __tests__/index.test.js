import gendiff from '../src/index.js';

const plainTestsResult = `{
    host: hexlet.io
  + timeout: 50
  - timeout: 20
  + proxy: 123.234.53.22
  + follow: false
  - verbose: true
}`;

describe('plain files tests', () => {
  test.each([
    ['__fixtures__/plain1.json', '__fixtures__/plain2.json'],
    ['__fixtures__/plain1.yml', '__fixtures__/plain2.yml'],
    ['__fixtures__/plain1.ini', '__fixtures__/plain2.ini'],
  ])('plain files test №%#', (plain1, plain2) => {
    expect(gendiff(plain1, plain2)).toEqual(plainTestsResult);
  });
});
