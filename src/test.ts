import * as BigBrother from './index';
import fs from 'fs';
import { Token } from './token';

const priKey = fs.readFileSync('./keys/pri.key', 'utf8');
const pubKey = fs.readFileSync('./keys/pub.key', 'utf8');

const big = new BigBrother.BigBrother(pubKey);
big.Start();

// console.log((new Token({
//   prj: 'XOcean',
//   ver: '*',
//   name: 'trump',
//   type: 'axios',
//   addr: 'http://172.16.1.194:19841',
// })).Sign(priKey));
