import uuid from 'react-native-uuid';

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
  private _pagesize: number;

  private constructor() {
    this._apiUrl = "";
    this._pagesize = 1000;
  }

  public static getInstance(): Api {
    if (!Api._instance) {
      Api._instance = new Api();
    }
    return Api._instance;
  }

  public setUrl(url: string) {
    this._apiUrl = url;
  }

  /*
   * gets data from server and stores it in local variable
   */
  private async getData(): Promise<any> {
    let data = undefined;
    await fetch(this._apiUrl + "api/data/read.php?pageno=1&pagesize=" + this._pagesize, this.prepareRequest())
      .then(response => response.json())
      .then(result => {
        if (result.document === "") {
          data = [];
        } else {
          data = result.document.records;
        }
      })
      .catch(error => console.log('error', error));
    return data;
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
      //.then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  /*
   * converts raw data into task object array
   */
  public async getTasks(): Promise<Task[]> {
    // get data if not already there
    let response = await this.getData();
    if (response === undefined) {
      return response;
    }
    let tasks: Task[] = [];
    let lastTask: Task = null;
    response.map((element) => {
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

  public async uploadPhoto(image: any): Promise<string> {
    let filename = uuid.v4() + ".jpg";
    let ret = "";

    await fetch(this._apiUrl + 'scripts/upload.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: filename,
        image: image.base64,
      }),
    })
      .then((response) => {
        ret = filename;
      })
      .catch((error) => {
        console.log('error', error);
      });

    return ret;
  };

  // prepare RequestInit object with data (GET or POST) and header
  private prepareRequest(data: string = ""): RequestInit {
    var requestOptions: RequestInit;
    if (data.length > 0) {
      console.log(data);
      requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
      };
    }
    else {
      requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
    }
    return requestOptions;
  }
}