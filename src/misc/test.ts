import { resolve } from 'path';
import * as Data from '../index';

const data = Data.parse(resolve(`${__dirname}/../../stuff`));

console.log(data);