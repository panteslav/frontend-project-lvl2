import gendiff from '../src/index.js';

const plainTestsResult = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}
`;

const nestedTestResult = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
            doge: {
              - wow: too much
              + wow: so much
            }
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}
`;

describe('plain files tests', () => {
  test.each([
    ['__fixtures__/plain1.json', '__fixtures__/plain2.json'],
    ['__fixtures__/plain1.yml', '__fixtures__/plain2.yml'],
    ['__fixtures__/plain1.ini', '__fixtures__/plain2.ini'],
  ])('plain files test №%#', (plain1, plain2) => {
    expect(gendiff(plain1, plain2)).toEqual(plainTestsResult);
  });
});

describe('nested files tests', () => {
  test.each([['__fixtures__/nested1.json', '__fixtures__/nested2.json']])(
    'nested files test №%#',
    (nested1, nested2) => {
      expect(gendiff(nested1, nested2)).toEqual(nestedTestResult);
    },
  );
});
