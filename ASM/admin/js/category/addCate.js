
import {firebaseConfig} from '../../../firebase.js';
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
dbGet(dbChild(dbRef(db), `category/`))
    .then((snapshot) => {
    const category = snapshot.val();
    function addNewUserToDatabase(newUser) {
      // Thực hiện thêm mới dữ liệu vào Firebase Realtime Database
      const newCateRef = push(dbRef(db, 'category')); // Tạo một tham chiếu mới dưới 'users' và nhận về tham chiếu đến nút con mới
      dbSet(newCateRef, newCate); // Đặt dữ liệu người dùng vào tham chiếu mới
    }
    let btnAddCate = document.getElementById('btnAddCate');
    btnAddCate.addEventListener('click', (e) => {
        e.preventDefault();
        let name = document.getElementById('nameCate').value;
        if (!name ) {
          alert('Vui lòng điền đầy đủ thông tin');
          return;
        }
      
        dbGet(dbRef(db, 'category'))
        .then((snapshot) => {
          const cateList = snapshot.val();
          const newId = cateList ? Object.keys(cateList).length + 1 : 1; // Xác định ID mới dựa trên độ dài của danh sách hiện có

          // Tạo một đối tượng người dùng mới với ID mới được xác định
          let newCate = {
            id: newId,
            category_name: name,
          }

          // Thêm dữ liệu người dùng mới vào cơ sở dữ liệu với ID tự tăng
          dbSet(dbRef(db, `category/${newId}`), newCate); // Đặt dữ liệu người dùng vào tham chiếu mới
          alert('Đăng ký thành công');
          window.location.href = '../../../admin/pages/category/cateAdmin.html';
        });
        addNewUserToDatabase(newCate);
    });
});   
