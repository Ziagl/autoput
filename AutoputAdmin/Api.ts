import TaskList from "./screen/TaskList";

interface Token {
    access_token: string,
    expires_in: number,
    token_type: string,
}

interface TokenResponse {
    status: string,
    code: number,
    message: string,
    document: Token,
}

export interface Task {
    id: number,
    name: string,
    duedate: string,
    date_recurrency: number,
    time_recurrency: number,
}

interface Tasks {
    pageno: number,
    pagesize: number,
    total_count: number,
    records: Task[],
}

interface TaskResponse {
    status: string,
    code: number,
    message: string,
    document: Tasks,
}

export interface Job {
    id: number,
    name: string,
    type: number,
    text: string,
    value: string,
}

interface Jobs {
    pageno: number,
    pagesize: number,
    total_count: number,
    records: Job[],
}

interface JobResponse {
    status: string,
    code: number,
    message: string,
    document: Jobs,
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

    private constructor() {
        this._apiUrl = "https://ziegelwanger-edv.at/autoput/api";
        this._username = "";
        this._password = "";
        this._token = { access_token: "", expires_in: 0, token_type: "" };
        this._tasks = { pageno: 0, pagesize: 0, total_count: 0, records: [] }
        this._jobs = { pageno: 0, pagesize: 0, total_count: 0, records: [] }
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

    public login(username: string, password: string): boolean {
        this._username = username;
        this._password = password;
        this.generateToken()
        return this.isLoggedIn();
    }

    // get list of jobs
    public async fetchJobs() {
        fetch(this._apiUrl + "/job/read.php?pageno=1&pagesize=30", this.prepareRequest())
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let jobResponse = result as JobResponse;
                this._jobs = jobResponse.document as Jobs;
                console.log("set job with data: " + JSON.stringify(this._jobs))
            })
            .catch(error => console.log('error', error));
    }

    // get list of tasks
    public async fetchTasks(): Promise<Task[]> {
        await fetch(this._apiUrl + "/task/read.php?pageno=1&pagesize=30", this.prepareRequest())
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let taskResponse = result as TaskResponse;
                this._tasks = taskResponse.document as Tasks;
                console.log("set task with data: " + JSON.stringify(this._tasks))

            })
            .catch(error => console.log('error', error));
        return this._tasks.records;
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