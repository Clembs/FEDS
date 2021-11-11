interface DataStructure {
  [key: string]: string;
}

import { readFileSync } from 'fs';

export function parse(file: string): DataStructure {

  // data structure:
  // KEY: VALUE

  const mainFile = readFileSync(file.endsWith('.data') ? file : `${file}.data`, 'utf8');
  const lines = mainFile.split('\n');

  const cleanLines = lines
    .filter(line => !line.startsWith('//') && line.length !== 0 && line.match(/[a-zA-Z ]+:[ a-zA-Z]+/gm))
    .map(line => line.split(':'));

  console.log(cleanLines);

  return cleanLines.reduce((acc, [name, rawValue]) => {
    console.log([name, rawValue]);
    let value: boolean | string | number;
    if(rawValue.trim() === 'true') value = true;
    else if(rawValue.trim() === 'false') value = false;
    else if(parseInt(rawValue.trim())) value = parseInt(rawValue.trim());
    else value = rawValue.trim();
    // @ts-ignore
    acc[name.trim()] = value;
    return acc;
  }, {});
};