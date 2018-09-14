import {S3} from "aws-sdk";

export default class S3Reporter {
  private s3: S3;
  private bucketName: string;
  private keys: string[];

  constructor(s3: S3, bucketName: string , keys: string[]) {
    this.s3 = s3;
    this.bucketName = bucketName;
    this.keys = keys;
  }

  public load(): Promise<any> {
    const promises = this.keys.map((key) => {
      return this.s3.getObject({
        Bucket: this.bucketName,
        Key: key
      }).promise().then(({Body}: any) => Body.toString());
    });
    return Promise.all(promises);
  }
}
