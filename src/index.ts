import http from 'http';
import SocketIO from 'socket.io';
import * as SocketIOClient from 'socket.io-client';
import Jwt from 'jsonwebtoken';

export function NewWatcher(token: string, uri?: string) {
  const payload: any = Jwt.decode(token);
  const srvAddr = uri ? uri : payload?.addr;
  if (!srvAddr) {
    throw new Error('服务地址无效');
  }
  let socket: SocketIOClient.Socket;
  return (data: any) => {
    if (!socket) {
      socket = SocketIOClient.io(srvAddr);
    }
    if (socket.disconnected) {
      socket.connect();
    }
    socket.emit('watch', { token, data });
  };
}

export function Start(port: number = 19841) {
  const server = http.createServer();
  const io = new SocketIO.Server(server);
  io.on('connection', client => {
    console.log(`${client.id}: 建立连接`);
    client.on('watch', data => {
      console.log(`${client.id}: ${data.data}`);
    });
    client.on('disconnect', () => {
      console.log(`${client.id}: 断开连接`);
    });
  });
  server.listen(port);
  console.log(`老大哥在${port}端口接受情报...`);
}

function main() {
  const priKey = `
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIKsUhsj7i/ORdPjhsJDvBoZxjqtFd+Je/pUXegbhfBW6oAcGBSuBBAAK
oUQDQgAEYrgvD0Wpx4LtVq4zctcbznpd4+ce8KPQ99EzgAOJPRtuJeZELEEhjPL+
0zHK6g0M/RbOSapXNe60qYrin4kUxQ==
-----END EC PRIVATE KEY-----
  `.trim();

  const pubKey = `
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEYrgvD0Wpx4LtVq4zctcbznpd4+ce8KPQ
99EzgAOJPRtuJeZELEEhjPL+0zHK6g0M/RbOSapXNe60qYrin4kUxQ==
-----END PUBLIC KEY-----
  `.trim();

  const token1 = Jwt.sign({
    prj: 'XSea',
    ver: '*',
    name: 'jimao',
    addr: 'http://127.0.0.1:19841',
  }, priKey, { algorithm: 'ES256' });
  

  const token2 = Jwt.sign({
    prj: 'XSea',
    ver: '*',
    name: 'niubi',
    addr: 'http://127.0.0.1:19841',
  }, priKey, { algorithm: 'ES256' });
  // const rst = JWT.decode(token);
  // console.log(token);
  // console.log(rst);
  // const aa = JWT.decode(token);
  // console.log(token);
  // console.log(aa);

  Start();
  const watcher1 = NewWatcher(token1);
  setInterval(() => {
    watcher1('你好，世界');
  }, 2000);
  const watcher2 = NewWatcher(token2);
  setInterval(() => {
    watcher2('大胸妹');
  }, 2000);
}

main();
