import S3Loader from "./s3-loader";
import csvtojson from "csvtojson";

export default class S3CsvLoader extends S3Loader {
  public load(): Promise<any> {
    return super.load().then((csvList) => {
      const promises = csvList.map((csv) => {
        return csvtojson().fromString(csv);
      });
      return Promise.all(promises).then((jsonLists: any[]) => {
        return jsonLists.reduce((acc: any[], jsonList: any[]) => {
          return [...acc, ...jsonList];
        }, []);
      });
    });
  }
}
