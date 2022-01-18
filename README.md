# .FEDS
Fairly Easy Data System

files for handling very simple data, mostly as training for myself
has a parser to return a JS object

## how to use
data file:
```
// example of a structure
fruit: apple
number: 29
thisCodeIsSexy: false
```
javascript file to use the data:
```js
import Data from 'whateverINameThisProject';
// or const Data = require('theThing');

const data = Data.parse('pathToDataFile'); // you can omit the .data if you want

console.log(data)
```
logs:
```js
{
  fruit: 'apple',
  number: 29,
  thisCodeIsSexy: false
}
```
structure:
```
name: value
// a comment
array: yes, no, why not
```
