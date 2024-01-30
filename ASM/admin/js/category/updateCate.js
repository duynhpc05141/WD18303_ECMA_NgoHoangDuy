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
console.log(id);
let nameInput = document.getElementById('nameCate');
// Tải thông tin người dùng từ cơ sở dữ liệu Firebase và điền vào các trường tương ứng trong biểu mẫu
if (id) {
    let cateRef = dbRef(db, 'category/' + id);
    dbGet(cateRef).then((snapshot) => {
      if (snapshot.exists()) {
        let cateData = snapshot.val();
        nameInput.value = cateData.category_name;
      } else {
        console.log("Không tìm thấy thông tin danh mục");
      }
    })
  
    // Thêm sự kiện click cho nút cập nhật
    let btnUpCate = document.getElementById('btnUpCate');
    btnUpCate.addEventListener('click', (e) => {
      e.preventDefault();
      // Lấy giá trị từ các trường trong biểu mẫu
      let name = nameInput.value;
      // Kiểm tra và cập nhật thông tin người dùng trong cơ sở dữ liệu Firebase
      if (!name) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
      }
      let newCate = {
        category_name: name,
      }
      dbUpdate(dbRef(db, 'category/' + id), newCate);
      alert('Cập nhật thành công');
      window.location.href = '../../../admin/pages/category/cateAdmin.html';
    });
  }