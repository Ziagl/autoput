/*const api = {
    generateToken: async () => {
        const endpoint = "https://ziegelwanger-edv.at/autoput/api/token/generate.php";
        const data = {username: "admin", password: "admin123"};
        return await (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })).json();
    },
    fetchJobs: async () => {
        const endpoint = "https://ziegelwanger-edv.at/autoput/api/job/read.php?pageno=1&pagesize=30";
        return await (await fetch(endpoint)).json();
    }
}

console.log(api.generateToken());
console.log(api.fetchJobs());*/

const endpoint = "https://ziegelwanger-edv.at/autoput/api/token/generate.php";
const data = {username: "admin", password: "admin123"};
console.log(fetch(
    endpoint, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
)).json();