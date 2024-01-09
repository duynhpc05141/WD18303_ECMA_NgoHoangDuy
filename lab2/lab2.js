// lab2 bai 2.1
const result = {
    sucssec: ["max-length", "no-amd", "prefer-arrow-fuction"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["no-extra-semi", "no-dup-keys"]
};
function makeList(arr) {
    const failureItem = [];
    arr.map(function(item) {failureItem.push( `<li class="text-warning">${item}</li>`)});
    let list = document.getElementById('list');
    list.innerHTML = failureItem.join("");
    return failureItem;  
};
const failuresList = makeList(result.failure);
console.log(failuresList);

// lab2 bai 2.2
const source = [1,2,3,4,5,6,7,8,9,10];
function removeFirstTwo(list) {
    const [a,b,...arr] = list;
    return arr;
};
const arr = removeFirstTwo(source);
console.log(arr);
console.log("--------------------------------");
console.log(source);

// lab 2 bai 2.3
const arr1 = ["JAN","FEB","MAR","APR","MAY"];
let arr2;
arr2 = [...arr1];
console.log(arr2);

// lab 2 bai 2.4
spreadOut = () => {
    let fragment = ['to', 'code'];
    let sentence = ['learning', ...fragment,'is','fun'];
    return sentence;
};
console.log(spreadOut());

// lab 2 bai 2.5
const API_URL = 'https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students';



let generateTableHeader = (headerTitle) => {
    if (!headerTitle || headerTitle.length === 0){
        return "";
    };
    const headerHtml = headerTitle.map((title) => `<th>${title}</th>`);
    return `<thead><tr>${headerHtml}</tr></thead>`;
};

let generateTableRow = (rowData, index) => {
    if (!rowData || rowData.length === 0) {
        return "";
    }
    return `
        <tr>
            <td>${index +1}</td>
            <td><img src="${rowData.avatar}" height="50px" ></td>
            <td>${rowData.name}</td>
            <td>${rowData.createdAt}</td>
        </tr>
    `;
};

let generateTable = (headers, data) => {
    if (!headers || !data || headers.length === 0 || data.length === 0) {
        return "";
    }
    const headerRow = generateTableHeader(headers);
    const dataRow = data.map((row, index) => generateTableRow(row, index)).join("");
    return `<table>${headerRow}<tbody>${dataRow}</tbody></table>`;
};


fetch(API_URL)
.then( function (respose) {
    respose.json().then(function (data) {
        const headers = ["STT", "avatar","name", "date"];
        const tableHtml = generateTable(headers,data);
        let app = document.getElementById("app");
        app.innerHTML = tableHtml;
    })
})
.catch(function(error){
    return console.log('error: ' + error);
});




