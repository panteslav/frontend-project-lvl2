#!/usr/bin/env node

// const program = require('commander');
// const _ = require('lodash');
// const fs = require('fs');
// const { description, version } = require('./package.json');

// import program from 'commander';
import _ from 'lodash';
import fs from 'fs';
// import { description, version } from './package.json';

// const options = process.argv.slice(2);

const gendiff = (path1, path2) => {
  const configuration1 = JSON.parse(fs.readFileSync(path1));
  const configuration2 = JSON.parse(fs.readFileSync(path2));

  const allKeys = { ...configuration1, ...configuration2 };

  const entries = Object.entries(allKeys);

  const reducer = (accumulator, [key, value]) => {
    if (!_.has(configuration1, key)) {
      return `${accumulator} - ${key}: ${value}\n`;
    }

    if (!_.has(configuration2, key)) {
      return `${accumulator} + ${key}: ${value}\n`;
    }

    if (configuration1[key] === value && configuration2[key] === value) {
      return `${accumulator} ${key}: ${value}\n`;
    }

    return `${accumulator} + ${key}: ${configuration1[key]}\n - ${key}: ${value}\n`;
  };

  // console.log(`{${entries.reduce(reducer, '\n')}}`);
  return `{${entries.reduce(reducer, '\n')}}`;
};

export default gendiff;

// const [path1, path2] = options;

// module.exports = gendiff;
