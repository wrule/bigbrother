
import * as BigBrother from './index';
import { Token } from './token';
import fs from 'fs';

const priKey = fs.readFileSync('./keys/pri.key', 'utf8');
const pubKey = fs.readFileSync('./keys/pub.key', 'utf8');

import ESClient from '@elastic/elasticsearch';

async function main() {
  const client = new ESClient.Client({ node: 'http://localhost:9200' });
  await client.index({
    index: 'pck',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.',
      times: 0
    }
  })

  // await client.update({
  //   index: 'game-of-thrones',
  //   id: '1',
  //   body: {
  //     script: {
  //       lang: 'painless',
  //       source: 'ctx._source.times++'
  //       // you can also use parameters
  //       // source: 'ctx._source.times += params.count',
  //       // params: { count: 1 }
  //     }
  //   }
  // })

  // const { body } = await client.get({
  //   index: 'game-of-thrones',
  //   id: '1'
  // })

  // console.log(body)
}

// main();


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
