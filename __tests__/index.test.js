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

const nestedStylishResult = `{
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

const nestedPlainResult = `
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const nestedPath1 = '__fixtures__/nested1.json';
const nestedPath2 = '__fixtures__/nested2.json';

describe('plain files tests', () => {
  test.each([
    ['__fixtures__/plain1.json', '__fixtures__/plain2.json'],
    ['__fixtures__/plain1.yml', '__fixtures__/plain2.yml'],
    ['__fixtures__/plain1.ini', '__fixtures__/plain2.ini'],
  ])('plain files test №%#', (plain1Path1, plainPath2) => {
    expect(gendiff(plain1Path1, plainPath2)).toEqual(plainTestsResult);
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
});
