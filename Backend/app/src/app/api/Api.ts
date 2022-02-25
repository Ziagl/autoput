export type Token = {
    access_token: string;
    expires_in: number;
    token_type: string;
};

export type Job = {
    id: number;
    name: string;
    type: number;
    text: string;
    value: string;
};

export type Jobs = {
    pageno: number;
    pagesize: number;
    total_count: number;
    records: Job[];
};

// API endpoint code
export default {
    generateToken: async (username = 'admin', password = 'admin123'): Promise<Token> => {
        const endpoint = 'https://ziegelwanger-edv.at/autoput/api/' + 'token/generate.php';
        const data = { username: username, password: password };
        return await (await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })).json();
    },
    fetchData: async (url: string, jwt: Token, page = 1, count = 30): Promise<Jobs> => {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + jwt.access_token);
        headers.append('Content-Type', 'application/json');
        return await (await fetch(
            'https://ziegelwanger-edv.at/autoput/api/' + url + '?pageno=' + page + '&pagesize=' + count, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        })).json();
    },
};