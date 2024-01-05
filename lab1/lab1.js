// bai 1.2 lab1

let name1 = "duy";
let birthday = "08/10/1999";
let sayHello = () => {
    console.log(`I'm ${name1}, ${birthday}`);
}
sayHello();

// tinh thoi gian ton tai cua minh
let dateDiff = (date1, date2) => {
    // Chuyển đổi hai đối tượng Date thành số mili giây
    let time1 = date1.getTime();
    let time2 = date2.getTime();
    // Tính sự khác biệt trong số mili giây
    let diff = Math.abs(time2 - time1);
    // Chia cho số mili giây trong một ngày để được số ngày
    let days = diff / (1000 * 60 * 60 * 24);
    // Trả về số ngày làm tròn lên
    return Math.ceil(days);
}

// Tạo một đối tượng Date với ngày sinh của bạn
let birthday2 = new Date("08/10/1999");
// Tạo một đối tượng Date với ngày hiện tại
let today = new Date();
// Gọi hàm dateDiff để tính số ngày tồn tại của bạn
let days = dateDiff(birthday2, today);
// In ra kết quả
console.log(`Bạn đã tồn tại ${days} ngày`);

// bai 1.3 lab1 
fetch('https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students')
    .then(function (respose){
        respose.json().then(function(data){
            console.log(data);
        })
    });


// bai 1.4 lab1
fetch('https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students')
    .then(function (respose){
        respose.json().then(function(data){
            let array = data;
            let html = document.getElementById('pc05141');
            let child_html = `<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Avatar
                        </th>
                        <th scope="col" class="px-6 py-3">
                            id
                        </th>
                    </tr>
                </thead>`;
            array.forEach(element => {
                // console.log(element.name);
                child_html += `<tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${element.name}
                    </th>
                    <td class="px-6 py-4">
                       <img src =" ${element.avatar}">
                    </td>
                    <td class="px-6 py-4">
                        ${element.id}
                    </td>
                </tr>
                `;
            });
            child_html += ` </tr>
            </tbody>
            </table>
            </div>`;
            html.innerHTML = child_html;
        })
    });