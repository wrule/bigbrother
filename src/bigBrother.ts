import http from 'http';
import SocketIO from 'socket.io';
import * as SocketIOClient from 'socket.io-client';
import { Token, ITokenPayload } from './token';

/**
 * 创建新的盖世太保
 * @param token 老大哥分发的令牌
 * @param uri 如传入则覆盖令牌中的服务地址
 * @returns 一个新的盖世太保
 */
 export function NewWatcher(token: string, uri?: string) {
  const payload = Token.Decode(token);
  const srvAddr = uri ? uri : payload?.addr;
  if (!srvAddr) {
    throw new Error('服务地址无效');
  }
  let socket: SocketIOClient.Socket;
  return (data: any) => {
    if (!socket) {
      socket = SocketIOClient.io(srvAddr, {
        query: {
          token,
        },
      });
    }
    if (socket.disconnected) {
      socket.connect();
    }
    socket.emit('watch', data);
  };
}

/**
 * 启动老大哥服务
 * 非对称加密采用椭圆曲线加密中的secp256k1算法，安全性很好，和比特币一致
 * 具体参考：https://8gwifi.org/ecsignverify.jsp
 * @param pubKey 公钥证书
 * @param port 服务端口（默认19841）
 */
export function Start(
  pubKey: string,
  port: number = 19841,
) {
  const server = http.createServer();
  const io = new SocketIO.Server(server);
  // Jwt的权限验证
  io.use((socket, next) => {
    const query = socket.handshake.query || { };
    if (query.token) {
      const token = query.token as string;
      const payload = Token.Verify(token, pubKey);
      if (payload) {
        socket.data.watcher = payload;
        next();
      } else {
        next(new Error('Token不合法'));
      }
    } else {
      next(new Error('没有传入Token'));
    }
  });
  // SocketIO服务
  io.on('connection', client => {
    const watcher: ITokenPayload = client.data.watcher;
    console.log(`${watcher.name}: 建立连接`);
    client.on('watch', data => {
      console.log(`${watcher.name}: ${data}`);
    });
    client.on('disconnect', () => {
      console.log(`${watcher.name}: 断开连接`);
    });
  });
  server.listen(port);
  console.log(`老大哥在${port}端口接受情报...`);
}
