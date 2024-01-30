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
dbGet(dbChild(dbRef(db), 'category'))
  .then((snapshot) => {
    const cateList = snapshot.val();
    let html = document.getElementById('listCate');
    let list = "";
    let stt = 1;
    snapshot.forEach((childSnapshot) => {
      const category = childSnapshot.val();
      list += `<tr>
        <td>${stt}</td>
        <td>${category.category_name}</td>
        <td align="center">
            <a href="../../../admin/pages/category/updateCate.html?id=${category.id}" class="btn btn-primary">Sửa</a>
            <a class="btn btn-danger" data-cate-id="${childSnapshot.key}" id="btnDelete">Xóa</a>
        </td>
      </tr>`;
      stt++;
    });
    html.innerHTML = list;
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          let cateId  = e.target.getAttribute('data-cate-id');
          if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
            dbRemove(dbChild(dbRef(db), 'category/' + cateId));
            window.location.href = '../../../admin/pages/category/cateAdmin.html';
          }
        });
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải danh sách danh mục: ", error);
  });


