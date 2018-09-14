import {Server} from "http";
import S3rver from "s3rver";

export class S3Local{
  private process?: Server;
  private s3rver: S3rver;

  constructor(s3host, s3port, s3dir){
    this.s3rver = new S3rver({
      directory: s3dir,
      hostname: s3host,
      port: s3port,
      silent: true,
    });
  }

  public up() {
    return new Promise((resolve, reject) => {
      this.process = this.s3rver.run((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  public down() {
    return new Promise((resolve, reject) => {
      if (this.process) {
        this.process.close();
        resolve();
      } else {
        reject(new Error("process is not activated"));
      }
    });
  }
}
