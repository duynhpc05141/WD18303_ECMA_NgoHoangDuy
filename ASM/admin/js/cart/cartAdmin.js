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
dbGet(dbChild(dbRef(db), 'orders'))
  .then((snapshot) => {
    const orders = snapshot.val();
    let html = document.getElementById('listCart');
    let list = "";
    let stt = 1;
    snapshot.forEach((childSnapshot) => {
      const orders = childSnapshot.val();
      let status = '';
      if (orders.order_status == 1) {
        status = "Đã giao";
      }else if (orders.order_status == 2) {
        status = "Đang xử lý";
      } else {
        status = "Đã hủy";
      }
      list += `<tr>
        <td>${stt}</td>
        <td>${orders.customer_name}</td>
        <td>${orders.product_name}</td>
        <td>${status}</td>
        <td>${orders.order_date}</td>
        <td align="center">
            <a href="../../../admin/pages/cart/cartDetail.html?id=${orders.id}" class="btn btn-dark">chi tiết</a>
            <a href="../../../admin/pages/cart/updateCart.html?id=${orders.id}" class="btn btn-primary">Sửa</a>
            <a class="btn btn-danger" data-cart-id="${childSnapshot.key}" id="btnDelete">Xóa</a>
        </td>
      </tr>`;
      stt++;
    });
    html.innerHTML = list;
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          let ordersId  = e.target.getAttribute('data-cart-id');
          if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này không?")) {
            dbRemove(dbChild(dbRef(db), 'orders/' + ordersId));
            window.location.href = '../../../admin/pages/cart/cartAdmin.html';
          }
        });
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải danh sách hóa đơn: ", error);
  });


