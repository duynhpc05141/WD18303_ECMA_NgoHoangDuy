// lab3 bai 1
let multiply = (num1,num2) => num1 * num2;

let toCelsius =(fahrenheit) => (5/9) * (fahrenheit -32);

let padZero = (num, totallen) => {
    let numStr =num.toString();
    let numZero  = totallen - numStr.length;
    for (let i = 0; i <= numZero; i++) {
        numStr = "0" + numStr;
    }
    return numStr;
}

let power = (base, exponent) => {
    let result =1;
    for (let i = 0; i < exponent; i++) {
        result *= base; 
    }
    return result;
}

let greet = (who) => console.log("hello " + who);

// lab3 bai 2
let arr = [1,2,3,4,5,6,7];
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
console.log(sum(arr)); 
// lab3 bai 3
let Entily = function(name, deplay){
    this.name = name;
    this.deplay = deplay;
}
Entily.prototype.greet = function(){
    setTimeout(function(){
        console.log('hello ' + this.name);
    }.bind(this), this.deplay);
};

let java = new Entily('Java',3000);
let cpp = new Entily('C++',30);
java.greet();
cpp.greet();

// lab3 bai 4
const convertTemperature = (temperature, unit) => {
    if (unit === "C") {
      return temperature * 9/5 + 32;
    } else if (unit === "F") {
      return (temperature - 32) * 5/9;
    }
  };
  console.log(convertTemperature(100, "C")); // Kết quả mong muốn 212
  console.log(convertTemperature(212, "F")); // Kết quả mong muốn 100
  