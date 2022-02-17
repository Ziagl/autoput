
/*const api = {
    fetchJobs: async () => {
        const endpoint = "https://ziegelwanger-edv.at/autoput/api/job/read.php?pageno=1&pagesize=30";
        return await (await fetch(endpoint)).json();
    }
}

console.log(api.fetchJobs());*/

const endpoint = "https://ziegelwanger-edv.at/autoput/api/job/read.php?pageno=1&pagesize=30";
console.log((await fetch(endpoint)).json());