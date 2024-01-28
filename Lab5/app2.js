export class APICaller {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    get(id = "") {
      const API = this.baseURL + this.endpoint;
      fetch(API + id || "")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log('error');
        });
    }
  
    post(data) {
      const API = this.baseURL + this.endpoint;
      fetch(API, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log('error');
        });
    }
  
    put(id, data) {
      const API = this.baseURL + this.endpoint;
      fetch(API + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log('error');
        });
    }
  
    delete(id) {
      const API = this.baseURL + this.endpoint;
      fetch(API + id, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log('error');
        });
    }
}

export class Comments extends APICaller {
constructor(baseURL) {
        super(baseURL);
        this.endpoint = "comments/";
    }

    getAll() {
        return this.get();
    }

    getOne(id) {
        return this.get(id);
    }

    addComment(data) {
        return this.post(data);
    }

    updateComment(id, data) {
        return this.put(id, data);
    }

    removeComment(id) {
        return this.delete(id);
    }
}
  
 export const API_URL = 'https://jsonplaceholder.typicode.com/';
 export let user = new Comments(API_URL);
//   user.getAll();
//   user.getOne(6);
