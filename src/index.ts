import axios from "axios";
import { AxiosReport } from "./report/axiosReport";

console.log('你好，世界');

async function main() {
  const rsp = await axios.get('https://github.com/taosdata/TDengine/blob/develop/README-CN.md?gu=1');
  console.log(rsp);
  const rp = new AxiosReport(rsp);
  console.log(rp.RspData);
}

main();
