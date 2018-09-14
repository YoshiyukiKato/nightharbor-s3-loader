# nightharbor-s3-loader
[![CircleCI](https://circleci.com/gh/YoshiyukiKato/nightharbor-s3-loader.svg?style=svg)](https://circleci.com/gh/YoshiyukiKato/nightharbor-s3-loader)
[![sonarcloud badge](https://sonarcloud.io/api/project_badges/measure?project=YoshiyukiKato_nightharbor-s3-loader&metric=alert_status)](https://sonarcloud.io/api/project_badges/measure?project=YoshiyukiKato_nightharbor-s3-loader&metric=alert_status)
[![Greenkeeper badge](https://badges.greenkeeper.io/YoshiyukiKato/nightharbor-s3-loader.svg)](https://greenkeeper.io/)

A [nightharbor](https://github.com/YoshiyukiKato/nightharbor) loader for AWS S3.

```sh
$ npm install --save aws-sdk nightharbor nightharbor-s3-loader
```

#### load targets from json and csv

```js
import {S3CsvLoader,S3JsonLoader} from "nightharbor-s3-loader";
import AWS from "aws-sdk";
AWS.config.update({/** your configuration */});
const s3 = new AWS.S3();

export default {
  ...,
  loaders: [
    new S3JsonLoader(s3, "bucket name", ["/path/to/target.json",...]),
    new S3CsvLoader(s3, "bucket name", ["/path/to/target.csv",...])
  ]
  ...
}
```