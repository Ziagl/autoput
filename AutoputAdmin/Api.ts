import { Examples } from './Examples';

interface Response {
  status: string,
  code: number,
  message: string,
}

interface List {
  pageno: number,
  pagesize: number,
  total_count: number,
}

interface Token {
  access_token: string,
  expires_in: number,
  token_type: string,
}

interface TokenResponse extends Response {
  document: Token,
}

export interface Task {
  id: number,
  name: string,
  startdate: string,
  enddate: string,
  date_recurrency: number,
  time_recurrency: number,
}

interface Tasks extends List {
  records: Task[],
}

interface TasksResponse extends Response {
  document: Tasks,
}

interface TaskResponse extends Response {
  document: Task,
}

export interface Job {
  id: number,
  name: string,
  type: number,
  text: string,
  value: string,
}

interface Jobs extends List {
  records: Job[],
}

interface JobsResponse extends Response {
  document: Jobs,
}

interface JobResponse extends Response {
  document: Job,
}

export interface TaskJob {
  id: number,
  task_id: number,
  job_id: number,
  name: string,
}

interface TaskJobs extends List {
  records: TaskJob[],
}

interface TaskJobsResponse extends Response {
  document: TaskJobs,
}

// API class as singleton
export class Api {
  private static _instance: Api;
  private _apiUrl: string;
  private _username: string;
  private _password: string;
  private _token: Token;
  private _tasks: Tasks;
  private _jobs: Jobs;
  private _job: Job;
  private _task: Task;
  private _taskjobs: TaskJob[];
  private _demo: boolean;
  private _pagesize: number;

  private constructor() {
    this._apiUrl = "";
    this._username = "";
    this._password = "";
    this._token = { access_token: "", expires_in: 0, token_type: "" };
    this._tasks = { pageno: 0, pagesize: 0, total_count: 0, records: [] };
    this._task = { id: 0, name: "", startdate: "2022-01-01 00:00:00", enddate: "2022-01-01 00:00:00", date_recurrency: 0, time_recurrency: 0 };
    this._jobs = { pageno: 0, pagesize: 0, total_count: 0, records: [] };
    this._job = { id: 0, name: "", type: 0, text: "", value: "" };
    this._taskjobs = [];
    this._pagesize = 1000;
    this._demo = false;
  }

  public static getInstance(): Api {
    if (!Api._instance) {
      Api._instance = new Api();
    }
    return Api._instance;
  }

  public setUrl(url: string) {
    this._apiUrl = url;
    this._demo = false;
  }

  public isLoggedIn(): boolean {
    return this._token.access_token != "" && this._token.access_token != undefined ? true : false;
  }

  public demo(): boolean {
    this._demo = true;
    return this._demo;
  }

  public async login(username: string, password: string): Promise<boolean> {
    this._username = username;
    this._password = password;
    await this.generateToken()
    return this.isLoggedIn();
  }

  public async ping(): Promise<boolean> {
    let success = false;
    await fetch(this._apiUrl + "api/")
      .then(response => {
        if (response.status === 200) {
          success = true;
        }
      })
      .catch(error => console.log('error', error));
    return success;
  }

  // get list of jobs
  public async fetchJobs(): Promise<Job[]> {
    if (this._demo) {
      return JSON.parse(Examples.getJobs());
    }
    else {
      await fetch(this._apiUrl + "api/job/read.php?pageno=1&pagesize=" + this._pagesize, this.prepareRequest())
        .then(response => response.json())
        .then(result => {
          let jobResponse = result as JobsResponse;
          this._jobs = jobResponse.document as Jobs;
        })
        .catch(error => console.log('error', error));
      return this._jobs.records;
    }
  }

  // get one job by id
  public async fetchJob(id: number): Promise<Job> {
    await fetch(this._apiUrl + "api/job/read_one.php?id=" + id, this.prepareRequest())
      .then(response => response.json())
      .then(result => {
        let jobResponse = result as JobResponse;
        this._job = jobResponse.document as Job;
      })
      .catch(error => console.log('error', error));
    return this._job;
  }

  // add new job
  public async addJob(job: Job): Promise<void> {
    let data = {
      name: job.name,
      type: "" + job.type,
      text: job.text,
      value: job.value,
    }
    await fetch(this._apiUrl + "api/job/create.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // delete job
  public async deleteJob(id: number): Promise<void> {
    let data = { id: id };
    await fetch(this._apiUrl + "api/job/delete.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // update job
  public async updateJob(job: Job): Promise<void> {
    let data = {
      id: "" + job.id,
      name: job.name,
      type: job.type,
      text: job.text,
    }
    await fetch(this._apiUrl + "api/job/update.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // get list of tasks
  public async fetchTasks(): Promise<Task[]> {
    if (this._demo) {
      return JSON.parse(Examples.getTasks());
    }
    else {
      await fetch(this._apiUrl + "api/task/read.php?pageno=1&pagesize=" + this._pagesize, this.prepareRequest())
        .then(response => response.json())
        .then(result => {
          let taskResponse = result as TasksResponse;
          this._tasks = taskResponse.document as Tasks;
        })
        .catch(error => console.log('error', error));
      return this._tasks.records;
    }
  }

  // get one task by id
  public async fetchTask(id: number): Promise<Task> {
    if (this._demo) {
      return JSON.parse(Examples.getTask());
    }
    else {
      await fetch(this._apiUrl + "api/task/read_one.php?id=" + id, this.prepareRequest())
        .then(response => response.json())
        .then(result => {
          let taskResponse = result as TaskResponse;
          this._task = taskResponse.document as Task;
        })
        .catch(error => console.log('error', error));
      return this._task;
    }
  }

  // add new task
  public async addTask(task: Task): Promise<void> {
    let data = {
      name: task.name,
      duedate: task.startdate,
      enddate: task.enddate,
      date_recurrency: task.date_recurrency,
      time_recurrency: task.time_recurrency,
    }
    await fetch(this._apiUrl + "api/task/create.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // delete task
  public async deleteTask(id: number): Promise<void> {
    let data = { id: id };
    await fetch(this._apiUrl + "api/task/delete.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // update task
  public async updateTask(task: Task): Promise<void> {
    let data = {
      id: "" + task.id,
      name: task.name,
      startdate: task.startdate,
      enddate: task.enddate,
      date_recurrency: "" + task.date_recurrency,
      time_recurrency: "" + task.time_recurrency,
    }
    await fetch(this._apiUrl + "api/task/update.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // fetch TaskJobs
  public async fetchTaskJobs(id: number): Promise<TaskJob[]> {
    if (this._demo) {
      if (id == 1) {
        return JSON.parse(Examples.getTaskJobs());
      }
      else {
        return undefined;
      }
    }
    else {
      await fetch(this._apiUrl + "api/task_job/read_by_task_id.php?task_id=" + id, this.prepareRequest())
        .then(response => response.json())
        .then(result => {
          let taskjobResponse = result as TaskJobsResponse;
          let taskjob = taskjobResponse.document as TaskJobs;
          this._taskjobs = taskjob.records;
        })
        .catch(error => console.log('error', error));
      console.log(this._taskjobs);
      return this._taskjobs;
    }
  }

  // delete TaskJob
  public async deleteTaskJob(id: number): Promise<void> {
    let data = { id: id };
    await fetch(this._apiUrl + "api/task_job/delete.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // add TaskJob
  public async addTaskJob(task_id: number, job_id: number): Promise<void> {
    let data = {
      task_id: task_id,
      job_id: job_id,
    }
    await fetch(this._apiUrl + "api/task_job/create.php", this.prepareRequest(JSON.stringify(data)))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }

  // generate new bearer token for api requests
  private async generateToken() {
    var data = JSON.stringify({
      "username": this._username,
      "password": this._password,
    });

    fetch(this._apiUrl + "api/token/generate.php", this.prepareRequest(data))
      .then(response => response.json())
      .then(result => {
        let tokenResponse = result as TokenResponse;
        this._token = tokenResponse.document as Token;
        return this.isLoggedIn();
      })
      .catch(error => console.log('error', error));
  }

  // prepare RequestInit object with data (GET or POST) and header
  private prepareRequest(data: string = ""): RequestInit {
    var requestOptions: RequestInit;
    if (data.length > 0) {
      requestOptions = {
        method: 'POST',
        headers: this.prepareHeaders(this.isLoggedIn()),
        body: data,
        redirect: 'follow',
      };
    }
    else {
      requestOptions = {
        method: 'GET',
        headers: this.prepareHeaders(this.isLoggedIn()),
        redirect: 'follow',
      };
    }
    return requestOptions;
  }

  // prepare HTTP headers for request
  private prepareHeaders(withToken: boolean): Headers {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (withToken) {
      headers.append("Authorization", "Bearer " + this._token.access_token);
    }
    return headers
  }
}