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
// Lấy tham chiếu đến các trường trong biểu mẫu
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let addressInput = document.getElementById('address');
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
        roleInput.value = userData.role_id;
      } else {
        console.log("Không tìm thấy thông tin người dùng");
      }
    })
  
    // Thêm sự kiện click cho nút cập nhật
    let btnUpUser = document.getElementById('btnUpUser');
    btnUpUser.addEventListener('click', (e) => {
      e.preventDefault();
      // Lấy giá trị từ các trường trong biểu mẫu
      let name = nameInput.value;
      let email = emailInput.value;
      let phone = phoneInput.value;
      let address = addressInput.value;
      let role = roleInput.value;
  
      // Kiểm tra và cập nhật thông tin người dùng trong cơ sở dữ liệu Firebase
      if (!name || !email || !phone || !address || !role) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
      }
      let newUser = {
        customer_name: name,
        customer_email: email,
        customer_phone_number: phone,
        customer_address: address,
        role_id: role
      }
      dbUpdate(dbRef(db, 'user/' + id), newUser);
      alert('Cập nhật thành công');
      window.location.href = '../../../admin/pages/userAdmin.html';
    });
  }