const program = require('commander');
const fs = require('fs');
const { description, version } = require('./package.json');

const options = process.argv.slice(2);

program
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .description(description)
  .parse(process.argv);

const path1 = options[0];
const path2 = options[1];

// console.log(typeof path1);
// const file1 = fs.readFile(path1, (err, data) => {
//   if (err) throw err;
//   const json = JSON.parse(data);
//   return json;
// });

const configuration1 = JSON.parse(fs.readFileSync(path1));
const configuration2 = JSON.parse(fs.readFileSync(path2));

const allKeys = {...obj1, ...obj2};
// console.log(allKeys);

const entries = Object.entries(allKeys);

const reducer = (accumulator, [key, value]) => {
  if (!obj1.hasOwnProperty(key)) {
    return accumulator + `- ${key}:${value}\n`;
  }
  
  if (!obj2.hasOwnProperty(key)) {
    return accumulator + `+ ${key}:${value}\n`;
  }
  
  if (obj1[key] === value && obj2[key] === value) {
    return accumulator + `  ${key}:${value}\n`;
  }
     
  return accumulator + `+ ${key}:${obj1[key]}\n` + `- ${key}:${value}\n`;
}

const result = '{' + entries.reduce(reducer, '\n') + '}';

console.log(configuration1);
console.log(configuration2);
