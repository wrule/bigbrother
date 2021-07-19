
import * as BigBrother from './index';
import { Token } from './token';
import fs from 'fs';

const priKey = fs.readFileSync('./keys/pri.key', 'utf8');
const pubKey = fs.readFileSync('./keys/pub.key', 'utf8');

BigBrother.Start(pubKey);
// const token1 = new Token({
//   prj: 'XSea',
//   ver: '*',
//   name: 'jimao',
//   type: 'axios',
//   addr: 'http://172.16.1.194:19841',
// }).Sign(priKey);
// console.log(token1);
// const watcher = BigBrother.NewWatcher(token1);
// setInterval(() => {
//   watcher('你好，世界');
// }, 2000);
