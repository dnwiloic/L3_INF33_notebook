
const BACKEND_URL = "http://localhost:8000/"
const headerWithoutToken = {
    'Content-Type': 'application/json'
}

class BackendAPI {

    baseUrl: string

    constructor(uri: string) {
        const regexURL = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(?:\/[^\s]*)?$/;
        // if(BACKEND_URL && BACKEND_URL.match(regexURL)) {
            this.baseUrl =BACKEND_URL + uri;
        // }else{
            // throw new Error('Icorect or missing backend url')
        // }
        
    }

    async get(endpoint = '',) {
        return await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: headerWithoutToken
        });

    }

    async post(data: any, endpoint = '') {
        return await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: headerWithoutToken,
            body: JSON.stringify(data)
        });
    }

    async postSecure(data: any, endpoint = '', headers = {}) {
        return await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
    }

    async put(data: any, endpoint = '') {
        return await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: headerWithoutToken,
            body: JSON.stringify(data)
        });
    }

    async putSecure(data: any, endpoint = '', headers = {}) {
        return await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });
    }

    async delete(data?: any, endpoint = '') {
        const body = data || {}
        return await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            });
    }

}

export default BackendAPI;
  