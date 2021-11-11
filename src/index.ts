interface DataStructure {
  [key: string]: string;
}

import { readFileSync } from 'fs';

export function parse(file: string): DataStructure {

  // data structure:
  // KEY: VALUE

  const mainFile = readFileSync(file.endsWith('.data') ? file : `${file}.data`, 'utf8');
  const lines = mainFile.split('\n');

  const filteredLines = lines.filter(line => !line.startsWith('//') && line.length !== 0);
  
  const mappedLines = filteredLines.map(line => {
    // console.log(line);
    // console.log(lines.indexOf(line));
    // console.log(lines);
    if(!line.match(/[a-zA-Z ]+:[a-zA-Z ]+/gm)) {
      throw TokenError(`Missing value: ${line} at position ${lines.indexOf(line)}`);
    } else {
      const split = line.split(':');
      const key = split[0].trim();
      const rawValue = split.slice(1).join(':').trim();

      // console.log(key, rawValue);
      const value = rawValue.includes(',') ? rawValue.split(',') : rawValue

      return [ key, value ];
    }
  });

  // console.log(cleanLines);

  return mappedLines.reduce((acc, [key, rawValue]) => {
    // console.log([name, rawValue]);
    let value = null;
    let values = [];
  
    if(typeof rawValue === 'string') {
      if(rawValue.trim() === 'true') value = true;
      else if(rawValue.trim() === 'false') value = false;
      else if(parseInt(rawValue.trim())) value = (parseInt(rawValue.trim()));
      else value = rawValue.trim();

    } else {
      for(const value of rawValue) {

        if(value.trim() === 'true') values.push(true);
        else if(value.trim() === 'false') values.push(false);
        else if(parseInt(value.trim())) values.push(parseInt(value.trim()));
        else values.push(value.trim());
  
      }
    }

    return { 
      ...acc, [key.toString().trim()]: value ?? values 
    };
  }, {});
};

function TokenError(message: string) {
  return new Error(`${message}`);
}
// class TokenError {
//   constructor(message: string) {
//     console.error(message);
//   }
// }