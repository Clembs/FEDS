import fs from 'fs';

// data structure:
// KEY: VALUE

const mainFile = fs.readFileSync('./thing.data', 'utf8');
const lines = mainFile.split('\n');

const cleanLines = lines.filter(line => !line.startsWith('//') && line.length !== 0 && line.match(/[a-zA-Z ]+:[ a-zA-Z]+/gm)).map(line => line.split(':'));

console.log(cleanLines);

const map = cleanLines.reduce((acc, [name, rawValue]) => {
  console.log([name, rawValue]);
  let value;
  if(rawValue.trim() === 'true') value = true;
  else if(rawValue.trim() === 'false') value = false;
  else if(parseInt(rawValue.trim())) value = parseInt(rawValue.trim());
  else value = rawValue.trim();

  acc[name.trim()] = value;
  return acc;
}, {});

console.log(map);