// const API_USER_UPDATE = 'http://localhost:3000/user';
// let btnSubmit = document.getElementById('btnSubmit');
// let urlParams = new URLSearchParams(window.location.search);
// let id = urlParams.get('id');
// console.log(id);

// // Đoạn mã để thêm dữ liệu từ form vào cơ sở dữ liệu JSON
// document.getElementById('btnSubmit').addEventListener('click', (e) => {
//   e.preventDefault();
//   let name = document.getElementById('name').value;
//   let email = document.getElementById('email').value;
//   let phone = document.getElementById('phone').value;
//   let address = document.getElementById('address').value;
//   let password = document.getElementById('pass').value;
//   let role = document.getElementById('role').value;

//   if (!name || !email || !phone || !address || !password || !role) {
//     alert('Vui lòng điền đầy đủ thông tin');
//     return;
//   }

//   let newData = {
//     customer_name: name,
//     customer_email: email,
//     customer_phone_number: phone,
//     customer_address: address,
//     password: password,
//     role_id: role
//   };

//   fetch(API_USER, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newData),
//   })
//   .then(response => response.json())
//   .then(data => {
//     alert('Đăng ký thành công');
//     window.location.href = '../../pages/login.html';
//     // Thực hiện các hành động khác sau khi thêm dữ liệu thành công
//   })
//   .catch(error => {
//     console.error('Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:', error);
//   });
// });

// Lấy thông tin người dùng từ URL query parameters
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);
import {firebaseConfig} from '../../firebase.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

import {
    getDatabase as getDb,
    ref as dbRef,
    set as dbSet,
    get as dbGet,
    child as dbChild,
    push,
    orderByChild,
    equalTo,
    remove as dbRemove,
    update as dbUpdate,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDb(app);
// Lấy tham chiếu đến các trường trong biểu mẫu
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let addressInput = document.getElementById('address');
let passInput = document.getElementById('pass');
let roleInput = document.getElementById('role');

// Tải thông tin người dùng từ cơ sở dữ liệu Firebase và điền vào các trường tương ứng trong biểu mẫu
if (id) {
  let userRef = dbRef(db, 'user/' + id);
  dbGet(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      let userData = snapshot.val();
      nameInput.value = userData.customer_name;
      emailInput.value = userData.customer_email;
      phoneInput.value = userData.customer_phone_number;
      addressInput.value = userData.customer_address;
      passInput.value = userData.password;
      roleInput.value = userData.role_id;
    } else {
      console.log("Không tìm thấy thông tin người dùng");
    }
  }).catch((error) => {
    console.error("Lỗi khi tải thông tin người dùng: ", error);
  });

  // Thêm sự kiện click cho nút cập nhật
  let btnUpdate = document.getElementById('btnUpdate');
  btnUpdate.addEventListener('click', (e) => {
    e.preventDefault();
    // Lấy giá trị từ các trường trong biểu mẫu
    let name = nameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;
    let address = addressInput.value;
    let password = passInput.value;
    let role = roleInput.value;

    // Kiểm tra và cập nhật thông tin người dùng trong cơ sở dữ liệu Firebase
    if (!name || !email || !phone || !address || !password || !role) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    let newUser = {
      customer_name: name,
      customer_email: email,
      customer_phone_number: phone,
      customer_address: address,
      password: password,
      role_id: role
    }
    dbUpdate(dbRef(db, 'user/' + id), newUser);
    alert('Cập nhật thành công');
    window.location.href = '../../pages/userInfor.html';
  });
}


   