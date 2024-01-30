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
dbGet(dbChild(dbRef(db), 'user'))
  .then((snapshot) => {
    const userList = snapshot.val();
    let html = document.getElementById('listUser');
    let list = "";
    let stt = 1;
    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      let role = (user.role_id === 1) ? 'Admin' : 'User';
      list += `<tr>
        <td>${stt}</td>
        <td>${user.customer_name}</td>
        <td>${user.customer_email}</td>
        <td>${user.customer_phone_number}</td>
        <td>${user.customer_address}</td>
        <td>${role}</td>
        <td>
            <a href="../../../admin/pages/updateUserAdmin.html?id=${user.id}" class="btn btn-primary">Sửa</a>
            <a class="btn btn-danger" data-user-id="${childSnapshot.key}" id="btnDelete">Xóa</a>
        </td>
      </tr>`;
      stt++;
    });
    html.innerHTML = list;
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          let userId = e.target.getAttribute('data-user-id');
          if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            dbRemove(dbChild(dbRef(db), 'user/' + userId));
            window.location.href = '../../../admin/pages/userAdmin.html';
          }
        });
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải danh sách người dùng: ", error);
  });


