import AWS from "aws-sdk";
import fs from "fs-extra";
import path from "path";
import assert from "power-assert";
import {S3CsvLoader, S3JsonLoader} from "../src";
import {S3Local} from "./fixture/s3-local";

describe("AWS S3 loaders", () => {
  const s3host = "localhost";
  const s3port = 4569;
  const s3dir = path.resolve(__dirname, "./s3");
  const s3Local = new S3Local(s3host, s3port, s3dir);
  const bucketName = "test";
  // AWS.config.update();
  const s3 = new AWS.S3({
    credentials: new AWS.Credentials({
      accessKeyId: "",
      secretAccessKey: "",
    }),
    endpoint: `http://${s3host}:${s3port}/${bucketName}`,
    s3BucketEndpoint: true,
  });

  before(() => {
    // refresh directory for s3
    fs.removeSync(s3dir);
    fs.mkdirpSync(s3dir);
    // start local s3
    return s3Local.up()
      .then(() => {
        return s3.createBucket({ Bucket: bucketName }).promise();
      });
  });

  after(() => {
    // teardown local s3
    return s3Local.down()
      .then(() => {
        fs.removeSync(s3dir);
      });
  });

  describe("json loader", () => {
    const filename = "targets.json";
    before(() => {
      return s3.putObject({
        Body: fs.readFileSync(path.resolve(__dirname, "fixture", filename)),
        Bucket: bucketName,
        Key: filename,
      }).promise().then();
    });

    it("loads targets from json file on S3", () => {
      const loader = new S3JsonLoader(s3, bucketName, [filename]);
      return loader.load().then((result) => {
        const expected = [{ url: "https://google.com" }];
        assert.deepEqual(expected, result);
      });
    });
  });

  describe("csv loader", () => {
    const filename = "targets.csv";
    before(() => {
      return s3.putObject({
        Body: fs.readFileSync(path.resolve(__dirname, "fixture", filename)),
        Bucket: bucketName,
        Key: filename,
      }).promise().then();
    });

    it("loads targets from csv file on S3", () => {
      const loader = new S3CsvLoader(s3, bucketName, [filename]);
      return loader.load().then((result) => {
        const expected = [{ url: "https://google.com" }];
        assert.deepEqual(expected, result);
      });
    });
  });
});
