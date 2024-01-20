// lab4 bai 1

let promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(() => resolve(2),1000);
});
promise.then(alert);
// ket qua hien ra 1

// lab4 bai 2

const axios = require('axios');
//1
async function fetchUrls(urls){
    const results = [];
    for (const url of urls) {
        const res = await axios.get(url);
        results.push(res);
    } 
    return results;
}
//2
async function fetchUrlsParallel(urls){
    const results = await Promise.all(
        urls.map(function(url){
            return axios.get(url);
    })
    );
    return results;
}
//
// điểm khác biệt chính giữa hai đoạn code là cách thức gửi các yêu cầu HTTP. 
// Đoạn code 1 gửi các yêu cầu một cách tuần tự trong khi đoạn code 2 gửi các 
// yêu cầu đồng thời và chờ đợi tất cả chúng hoàn thành trước khi trả về kết quả.

// lab4 bai 3
const fs = require('fs').promises;
const axios = require('axios');

async function fetchData() {
  try {
    const data = await fs.readFile('./data.json', { encoding: 'utf8' });
    console.log('Data loaded from disk', data);
    const response = await axios.get('http://jsonplaceholder.typicode.com/todos/1');
    console.log('Data downloaded from url', response.data);
  } catch (error) {
    console.error('An error occurred', error);
  }
}

fetchData();
