import gendiff from '../src/index.js';

const plainTestsResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`;

const nestedTestResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
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
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
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
