import http from 'http';
import SocketIO from 'socket.io';
import { Collector } from './collector';
import { Token, ITokenPayload } from './token';

export class BigBrother {
  constructor(private pubKey: string) { }

  /**
   * 启动老大哥服务
   * 非对称加密采用椭圆曲线加密中的secp256k1算法，安全性很好，和比特币一致
   * 具体参考：https://8gwifi.org/ecsignverify.jsp
   * @param port 服务端口（默认19841）
   */
  public Start(
    port: number = 19841,
  ) {
    // 创建服务，这里取消跨域限制了
    const server = http.createServer();
    const io = new SocketIO.Server(server, {
      cors: {
        origin: '*',
      },
    });
    // Jwt的权限验证
    io.use((socket, next) => {
      const query = socket.handshake.query || { };
      if (query.token) {
        const token = query.token as string;
        const payload = Token.Verify(token, this.pubKey);
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
        Collector.Collect(watcher, data);
      });
      client.on('disconnect', () => {
        console.log(`${watcher.name}: 断开连接`);
      });
    });
    server.listen(port);
    console.log(`老大哥在${port}端口接受情报...`);
  }
}
