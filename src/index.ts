import http from 'http';
import SocketIO from 'socket.io';
import * as SocketIOClient from 'socket.io-client';

async function main() {
  const server = http.createServer();
  const io = new SocketIO.Server(server);
  io.on('connection', client => {
    console.log(`${client.id}: 建立连接`);
    client.on('event', data => {
      console.log(`${client.id}: ${data}`);
    });
    client.on('disconnect', () => {
      console.log(`${client.id}: 断开连接`);
    });
  });
  server.listen(9669);
  console.log('在9669端口监听...');

  setTimeout(() => {
    const socket = SocketIOClient.io('http://127.0.0.1:9669');
    // socket.disconnect();
    setTimeout(() => {
      socket.disconnect();
      // socket.emit('event', '你好，世界');
    }, 2000);
  }, 5000);

  // const rsp = await axios.get('https://github.com/taosdata/TDengine/blob/develop/README-CN.md?gu=1');
  // // console.log(rsp);
  // const rp = new AxiosReport(rsp);
  // console.log(rp.RspData);
  // const privKey = randomBytes(32);
  // const a = secp256k1.privateKeyVerify(privKey);
  // console.log(a);
  // const pubKey = secp256k1.publicKeyCreate(privKey);
  // const sigObj = secp256k1.ecdsaSign([], privKey);
  // secp256k1.ecdsaVerify()
  // secp256k1.signatureNormalize()
}

main();
