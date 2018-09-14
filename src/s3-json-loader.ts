import S3Loader from "./s3-loader";

export default class S3JsonLoader extends S3Loader {
  public load(): Promise<any> {
    return super.load().then((jsonList) => {
      return jsonList.reduce((acc, json) => {
        const {targets}:any = JSON.parse(json);
        return [...acc, ...targets];
      }, []);
    });
  }
}
