
import * as BigBrother from './index';
import { Token } from './token';

const priKey = `
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIGtaBNn2rl7jHYO6GizijG8ASWd0pkutv6LA4RHjY97JoAcGBSuBBAAK
oUQDQgAEMRZbsrnXprqJ8eeoat2Zedvej4EXufJVagH1fVkJeeKgw0DW6qQex7cK
JtMJCsOmOK2xnbkEdLg2NopR1JdUmg==
-----END EC PRIVATE KEY-----
`;
const pubKey = `
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEMRZbsrnXprqJ8eeoat2Zedvej4EXufJV
agH1fVkJeeKgw0DW6qQex7cKJtMJCsOmOK2xnbkEdLg2NopR1JdUmg==
-----END PUBLIC KEY-----
`;

BigBrother.Start(pubKey);
const token1 = new Token({
  prj: 'XSea',
  ver: '*',
  name: 'jimao',
  type: 'axios',
  addr: 'http://172.16.1.194:19841',
}).Sign(priKey);
const watcher = BigBrother.NewWatcher(token1);
setInterval(() => {
  watcher('你好，世界');
}, 2000);
