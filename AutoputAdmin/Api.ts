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
    duedate: string,
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

    private constructor() {
        this._apiUrl = "https://ziegelwanger-edv.at/autoput/api";
        this._username = "";
        this._password = "";
        this._token = { access_token: "", expires_in: 0, token_type: "" };
        this._tasks = { pageno: 0, pagesize: 0, total_count: 0, records: [] }
        this._task = { id: 0, name: "", duedate: "2022-01-01 00:00:00", enddate: "2022-01-01 00:00:00", date_recurrency: 0, time_recurrency: 0 }
        this._jobs = { pageno: 0, pagesize: 0, total_count: 0, records: [] }
        this._job = { id: 0, name: "", type: 0, text: "", value: "" }
    }

    public static getInstance(): Api {
        if (!Api._instance) {
            Api._instance = new Api();
        }
        return Api._instance;
    }

    public isLoggedIn(): boolean {
        return this._token.access_token != "" ? true : false;
    }

    public async login(username: string, password: string): Promise<boolean> {
        this._username = username;
        this._password = password;
        await this.generateToken()
        return this.isLoggedIn();
    }

    // get list of jobs
    public async fetchJobs(): Promise<Job[]> {
        await fetch(this._apiUrl + "/job/read.php?pageno=1&pagesize=30", this.prepareRequest())
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let jobResponse = result as JobsResponse;
                this._jobs = jobResponse.document as Jobs;
                console.log("set jobs with data: " + JSON.stringify(this._jobs))
            })
            .catch(error => console.log('error', error));
        return this._jobs.records;
    }

    // get one job by id
    public async fetchJob(id: number): Promise<Job> {
        await fetch(this._apiUrl + "/job/read_one.php?id=" + id, this.prepareRequest())
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let jobResponse = result as JobResponse;
                this._job = jobResponse.document as Job;
                console.log("set job with data: " + JSON.stringify(this._job))
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
        await fetch(this._apiUrl + "/job/create.php", this.prepareRequest(JSON.stringify(data)))
            .then(response => console.log(response))
            .catch(error => console.log('error', error));
    }

    // delete job
    public async deleteJob(id: number): Promise<void> {
        let data = { id: id };
        await fetch(this._apiUrl + "/job/delete.php", this.prepareRequest(JSON.stringify(data)))
            .then(response => console.log(response))
            .catch(error => console.log('error', error));
    }

    // get list of tasks
    public async fetchTasks(): Promise<Task[]> {
        await fetch(this._apiUrl + "/task/read.php?pageno=1&pagesize=30", this.prepareRequest())
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let taskResponse = result as TasksResponse;
                this._tasks = taskResponse.document as Tasks;
                console.log("set tasks with data: " + JSON.stringify(this._tasks))
            })
            .catch(error => console.log('error', error));
        return this._tasks.records;
    }

    // get one task by id
    public async fetchTask(id: number): Promise<Task> {
        await fetch(this._apiUrl + "/task/read_one.php?id=" + id, this.prepareRequest())
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let taskResponse = result as TaskResponse;
                this._task = taskResponse.document as Task;
                console.log("set task with data: " + JSON.stringify(this._task))
            })
            .catch(error => console.log('error', error));
        return this._task;
    }

    // add new task
    public async addTask(task: Task): Promise<void> {
        let data = {
            name: task.name,
            duedate: task.duedate,
            enddate: task.enddate,
            date_recurrency: task.date_recurrency,
            time_recurrency: task.time_recurrency,
        }
        await fetch(this._apiUrl + "/task/create.php", this.prepareRequest(JSON.stringify(data)))
            .then(response => console.log(response))
            .catch(error => console.log('error', error));
    }

    // delete task
    public async deleteTask(id: number): Promise<void> {
        let data = { id: id };
        await fetch(this._apiUrl + "/task/delete.php", this.prepareRequest(JSON.stringify(data)))
            .then(response => console.log(response))
            .catch(error => console.log('error', error));
    }

    // generate new bearer token for api requests
    private async generateToken() {
        var data = JSON.stringify({
            "username": this._username,
            "password": this._password,
        });

        fetch(this._apiUrl + "/token/generate.php", this.prepareRequest(data))
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let tokenResponse = result as TokenResponse;
                console.log("tokenResult: " + JSON.stringify(tokenResponse));
                this._token = tokenResponse.document as Token;
                console.log("set token with data: " + JSON.stringify(this._token))
                return this.isLoggedIn();
            })
            .catch(error => console.log('error', error));
    }

    // prepare RequestInit object with data (GET or POST) and header
    private prepareRequest(data: string = ""): RequestInit {
        var requestOptions: RequestInit;
        if (data.length > 0) {
            console.log(data);
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