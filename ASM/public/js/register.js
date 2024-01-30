// const API_USER = 'http://localhost:3000/user';
// let btnSubmit = document.getElementById('btnSubmit');

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

// var showPass = 0;
// $('btn-show-pass').on('click', function(){
//     if(showPass == 0) {
//         $(this).next('input').attr('type','text');
//         $(this).find('i').removeClass('zmdi-eye');
//         $(this).find('i').addClass('zmdi-eye-off');
//         showPass = 1;
//     }
//     else {
//         $(this).next('input').attr('type','password');
//         $(this).find('i').addClass('zmdi-eye');
//         $(this).find('i').removeClass('zmdi-eye-off');
//         showPass = 0;
//     } 
// });
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
// let userId = sessionStorage.getItem('id');
// Đoạn mã để thêm dữ liệu từ form vào cơ sở dữ liệu JSON
dbGet(dbChild(dbRef(db), `user/`))
    .then((snapshot) => {
    const user = snapshot.val();
    function addNewUserToDatabase(newUser) {
      // Thực hiện thêm mới dữ liệu vào Firebase Realtime Database
      const newUserRef = push(dbRef(db, 'user')); // Tạo một tham chiếu mới dưới 'users' và nhận về tham chiếu đến nút con mới
      dbSet(newUserRef, newUser); // Đặt dữ liệu người dùng vào tham chiếu mới
      // Log ra ID của người dùng vừa được thêm vào để kiểm tra
      console.log('New user ID:', newUserRef.key);
    }
    
    let btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let address = document.getElementById('address').value;
        let password = document.getElementById('pass').value;
        let role = document.getElementById('role').value;
        
        if (!name || !email || !phone || !address || !password || !role) {
          alert('Vui lòng điền đầy đủ thông tin');
          return;
        }
      
        dbGet(dbRef(db, 'user'))
        .then((snapshot) => {
          const userList = snapshot.val();
          const newId = userList ? Object.keys(userList).length + 1 : 1; // Xác định ID mới dựa trên độ dài của danh sách hiện có

          // Tạo một đối tượng người dùng mới với ID mới được xác định
          let newUser = {
            id: newId,
            customer_name: name,
            customer_email: email,
            customer_phone_number: phone,
            customer_address: address,
            password: password,
            role_id: role
          }

          // Thêm dữ liệu người dùng mới vào cơ sở dữ liệu với ID tự tăng
          dbSet(dbRef(db, `user/${newId}`), newUser); // Đặt dữ liệu người dùng vào tham chiếu mới

          console.log('New user added with ID:', newId);
          alert('Đăng ký thành công');
          window.location.href = '../../pages/login.html';
        });
        addNewUserToDatabase(newUser);
    });
});   
