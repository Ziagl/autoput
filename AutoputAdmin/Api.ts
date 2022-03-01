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

interface Task {

}

// API class as singleton
export class Api {
    private static _instance: Api;
    private _apiUrl: string;
    private _username: string;
    private _password: string;
    private _token: Token;

    private constructor() {
        this._apiUrl = "https://ziegelwanger-edv.at/autoput/api";
        this._username = "";
        this._password = "";
        this._token = { access_token: "", expires_in: 0, token_type: "" };
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

    // get list of tasks
    public async fetchTasks() {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this._token.access_token);

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        };

        fetch(this._apiUrl + "/task/read.php?pageno=1&pagesize=30", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    // generate new bearer token for api requests
    private async generateToken() {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        var data = JSON.stringify({
            "username": this._username,
            "password": this._password,
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: data,
            redirect: 'follow',
        };

        fetch(this._apiUrl + "/token/generate.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let tokenResult = result as TokenResponse;
                console.log("tokenResult: " + JSON.stringify(tokenResult));
                this._token = tokenResult.document as Token;
                console.log("set token with data: " + JSON.stringify(this._token))
                return this.isLoggedIn();
            })
            .catch(error => console.log('error', error));
    }
}