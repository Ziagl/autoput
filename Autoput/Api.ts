import { format } from 'date-fns';

export class Job {
  public id: number;
  public job_id: number;
  public name: string;
  public type: number;
  public text: string;
  public value: string;

  constructor() {
    this.id = 0;
    this.job_id = 0;
    this.name = "";
    this.type = 0;
    this.text = "";
    this.value = "";
  }
}

export class Task {
  public task_id: number;
  public name: string;
  public time: string;
  public jobs: Job[];

  constructor() {
    this.task_id = 0;
    this.name = "";
    this.time = "";
    this.jobs = [];
  }
}

// API class as singleton
export class Api {
  private static _instance: Api;
  private _apiUrl: string;
  private _json: any;
  private _timestamp: Date;

  private constructor() {
    this._apiUrl = "https://ziegelwanger-edv.at/autoput/";
    this._json = null;
    this._timestamp = new Date("1900-01-01");
  }

  public static getInstance(): Api {
    if (!Api._instance) {
      Api._instance = new Api();
    }
    return Api._instance;
  }

  /*
   * gets json from server and stores it in local variable
   */
  private async getJson(): Promise<boolean> {
    let now = new Date();
    let success = false;
    if (this._json === null || format(this._timestamp, 'dddd-mm-yy') != format(now, 'dddd-mm-yy')) {
      await fetch(this._apiUrl + "data.json")
        .then(response => response.json())
        .then(result => {
          this._json = result;
          this._timestamp = now;
          success = true;
        })
        .catch(error => console.log('error', error));
    }
    else {
      success = true;
    }
    return success;
  }

  /*
   * saves value to server
   */
  public async saveJob(id: number, value: string): Promise<void> {
    let data = {
      id: "" + id,
      value: value,
    }
    await fetch(this._apiUrl + "api/data/update.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  /*
   * converts raw json data into task object array
   */
  public async getTasks(): Promise<Task[]> {
    // get json data if not already there
    let success = await this.getJson();
    if (!success) {
      return undefined;
    }
    let tasks: Task[] = [];
    let lastTask: Task = null;
    this._json.data.map((element) => {
      // create new task if needed
      if (lastTask === null ||
        (element.task_id != lastTask.task_id || (
          element.task_id === lastTask.task_id &&
          element.time != lastTask.time))) {
        if (lastTask != null) {
          tasks.push(lastTask);
        }
        lastTask = new Task();
        lastTask.task_id = element.task_id;
        lastTask.name = element.task_name;
        lastTask.time = element.time;
        lastTask.jobs = [];
      }
      // add job
      let job = new Job();
      job.id = element.id;
      job.job_id = element.job_id;
      job.name = element.job_name;
      job.text = element.text;
      job.type = parseInt(element.type);
      job.value = null;
      lastTask.jobs.push(job);
    });
    if (lastTask != null) {
      tasks.push(lastTask);
    }
    return tasks;
  }

  // prepare RequestInit object with data (GET or POST) and header
  private prepareRequest(data: string = ""): RequestInit {
    var requestOptions: RequestInit;
    requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
    };
    return requestOptions;
  }
}