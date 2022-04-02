import { format } from 'date-fns';

export interface ListElement {
  id: number;
  task_id: number;
  task_name: string;
  job_id: number;
  job_name: string;
  text: string;
  time: Date;
  type: number;
  value: string;
};

export interface List {
  data: ListElement[];
};

// API class as singleton
export class Api {
  private static _instance: Api;
  private _apiUrl: string;
  private _json: any;
  private _timestamp: Date;

  private constructor() {
    this._apiUrl = "https://ziegelwanger-edv.at/autoput/data.json";
    this._json = null;
    this._timestamp = new Date("1900-01-01");
  }

  public static getInstance(): Api {
    if (!Api._instance) {
      Api._instance = new Api();
    }
    return Api._instance;
  }

  public async getJson(): Promise<boolean> {
    let now = new Date();
    let success = false;
    if (this._json === null || format(this._timestamp, 'dddd-mm-yy') != format(now, 'dddd-mm-yy')) {
      await fetch(this._apiUrl)
        .then(response => response.json())
        .then(result => {
          this._json = result;
          this._timestamp = now;
          success = true;
        })
        .catch(error => console.log('error', error));
    }
    return success;
  }

  public async getData(): Promise<any> {
    // get json data if not already there
    await this.getJson();
    return this._json;
  }
}