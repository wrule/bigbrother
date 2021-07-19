import Jwt from 'jsonwebtoken';

export interface ITokenPayload {
  prj: string;
  ver: string;
  name: string;
  type: string;
  addr: string;
}

export class Token {
  constructor(
    private payload: ITokenPayload,
  ) { }

  public static Decode(token: string): ITokenPayload | null {
    let result: ITokenPayload | null = null;
    try {
      result = Jwt.decode(token) as ITokenPayload | null;
      if (!result) {
        result = null;
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  }

  public static Verify(token: string, pubKey: string): ITokenPayload | null {
    let result: ITokenPayload | null = null;
    try {
      result = Jwt.verify(token, pubKey) as ITokenPayload | null;
      if (!result) {
        result = null;
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  }

  public Sign(priKey: string): string {
    return Jwt.sign(this.payload, priKey, { algorithm: 'ES256' });
  }

  public get PrjName() {
    return this.payload.prj;
  }

  public get PrjVersion() {
    return this.payload.ver;
  }

  public get WatcherName() {
    return this.payload.name;
  }

  public get WatcherType() {
    return this.payload.type;
  }

  public get ReportAddress() {
    return this.payload.addr;
  }
}
