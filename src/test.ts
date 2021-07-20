import * as BigBrother from './index';
import fs from 'fs';

const priKey = fs.readFileSync('./keys/pri.key', 'utf8');
const pubKey = fs.readFileSync('./keys/pub.key', 'utf8');

const big = new BigBrother.BigBrother(pubKey);
big.Start();
