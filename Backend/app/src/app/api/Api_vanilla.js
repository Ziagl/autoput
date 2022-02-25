/*
API_BASE_URL = 'https://ziegelwanger-edv.at'
API_PATH = '/autoput/api/'
API_USERNAME = 'admin'
API_PASSWORD = 'admin123'

// API endpoint code
const api = {
    generateToken: async (username, password) => {
        const endpoint = API_BASE_URL + API_PATH + 'token/generate.php';
        const data = { username: username, password: password };
        return await (await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })).json();
    },
    fetchData: async (url, jwt, page = 1, count = 30) => {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + jwt.access_token);
        headers.append('Content-Type', 'application/json');
        return await (await fetch(
            API_BASE_URL + API_PATH + url + '?pageno=' + page + '&pagesize=' + count, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })).json();
    },
    fetchJobs: async () => {
        const json = await api.generateToken(API_USERNAME, API_PASSWORD);
        const jwt = json.document;
        return await api.fetchData('job/read.php', jwt);
    },
    fetchTasks: async () => {
        const json = await api.generateToken(API_USERNAME, API_PASSWORD);
        const jwt = json.document;
        return await api.fetchData('task/read.php', jwt);
    }
}

// API endpoint usage example
const fetchApiData = async () => {
    const json = await api.generateToken(API_USERNAME, API_PASSWORD);
    const jwt = json.document;
    console.log(jwt);
    const jobs = await api.fetchData('job/read.php', jwt);
    console.log(jobs);
    const tasks = await api.fetchData('task/read.php', jwt);
    console.log(tasks);
}

fetchApiData();
*/