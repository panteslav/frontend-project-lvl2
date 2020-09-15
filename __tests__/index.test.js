import path from 'path';
import gendiff from '../src/index.js';

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
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}
`;
const nestedJSONResult = {
  common: {
    status: '=',
    children: {
      follow: {
        status: '+',
        value2: false,
      },
      setting1: {
        status: '=',
        value1: 'Value 1',
      },
      setting2: {
        status: '-',
        value1: 200,
      },
      setting3: {
        status: '≠',
        value1: true,
        value2: {
          key: 'value',
        },
      },
      setting4: {
        status: '+',
        value2: 'blah blah',
      },
      setting5: {
        status: '+',
        value2: {
          key5: 'value5',
        },
      },
      setting6: {
        status: '=',
        children: {
          doge: {
            status: '=',
            children: {
              wow: {
                status: '≠',
                value1: 'too much',
                value2: 'so much',
              },
            },
          },
          key: {
            status: '=',
            value1: 'value',
          },
          ops: {
            status: '+',
            value2: 'vops',
          },
        },
      },
    },
  },
  group1: {
    status: '=',
    children: {
      baz: {
        status: '≠',
        value1: 'bas',
        value2: 'bars',
      },
      foo: {
        status: '=',
        value1: 'bar',
      },
      nest: {
        status: '≠',
        value1: {
          key: 'value',
        },
        value2: 'str',
      },
    },
  },
  group2: {
    status: '-',
    value1: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  group3: {
    status: '+',
    value2: {
      fee: 100500,
      deep: {
        id: {
          number: 45,
        },
      },
    },
  },
};

const getFilePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('nested files tests', () => {
  const nestedPath1 = getFilePath('nested1.json');
  const nestedPath2 = getFilePath('nested2.json');

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
    // equal JSON objects would make equal strings
    expect(JSON.stringify(gendiff(nestedPath1, nestedPath2, 'JSON'))).toEqual(
      JSON.stringify(nestedJSONResult),
    );
  });
});
