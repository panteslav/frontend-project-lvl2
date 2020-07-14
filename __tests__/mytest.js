#!/usr/bin/env node
import gendiff from '../src/index.js';

describe("testing gendiff", () => {
  test("generating difference", () => {
    const result = `{
            host: hexlet.io
            + timeout: 50
            - timeout: 20
            + proxy: 123.234.53.22
            + follow: false
            - verbose: true
           }`;
    expect(gendiff('after.json', 'before.json')).toEqual(result);
  });
});
