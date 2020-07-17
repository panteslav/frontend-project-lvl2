#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index';
import { description, version } from '../../package.json';

program
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .description(description)
  .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2)))
  .parse(process.argv);
