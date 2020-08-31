export default {
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
