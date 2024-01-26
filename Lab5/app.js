//lab5 bai 1
//Trong JavaScript, từ khóa "this" thường được sử dụng để tham chiếu đến đối tượng hiện tại mà một phương thức được gọi trên.
//Giá trị của "this" thay đổi tùy thuộc vào cách phương thức được gọi.
//Ví dụ, trong đoạn code sau:
let person = {
    firstName: "ngo",
    lastName: "duy",
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
};
console.log(person.fullName()); 
// lab5 bai 2
class Shape {
    move(x, y) {
      this.x = x;
      this.y = y;
    }
  }
// lab5 bai 3
class Clock {
    constructor({ template }) {
      this.template = template;
    }
  
    render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    stop() {
      clearInterval(this.timer);
    }
  
    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    }
  }
  
  let clock = new Clock({ template: 'h:m:s' });
  clock.start();
// lab5 bai 4
var persons = {
    _firstName: "ngo",
    _lastName: "duy",
    set lastName(lastName) {
      this._lastName = lastName;
    },
    set firstName(firstName) {
      this._firstName = firstName;
    },
    get fullName() {
      return this._firstName + " " + this._lastName;
    }
  };
  
  persons.lastName = 'Newton';
  persons.firstName = 'Isaac';
  console.log(persons.fullName()); 
  

// lab5 bai 5
class APICaller {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    get(id ="" ){
        const API = this.baseURL + this.endpoint;
        fetch(API+id || "")
        .then((response) => response.json()
        .then((data) =>{ return console.log(data);})
        .catch((error) =>{ console.log('error');}));
}
}

class Comments extends APICaller {
    constructor(baseURL) {
        super(baseURL);
        this.endpoint = "comments/";
    }
    getAll(){
       return this.get();
    }

    getOne(id){
        return this.get(id);
    }
};
const API_URL = 'https://jsonplaceholder.typicode.com/';
let user = new Comments(API_URL);
user.getAll();
user.getOne(5);