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
dbGet(dbChild(dbRef(db), 'product'))
  .then((snapshot) => {
    const productList = snapshot.val();
    let html = document.getElementById('listProduct');
    let list = "";
    let stt = 1;
    snapshot.forEach((childSnapshot) => {
      const product = childSnapshot.val();
      let price = product.product_price;
      let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      let categoryText = "";
      if (product.cate_id === 0) {
        categoryText = "Tiểu thuyết";
        } else if (product.cate_id === 1) {
        categoryText = "Sức khỏe";
        } else if (product.cate_id === 2) {
        categoryText = "Thơ";
        } else if (product.cate_id === 3) {
        categoryText = "Kinh dị";
        } else {
        categoryText = "Không xác định";
        }
      list += `<tr>
        <td>${stt}</td>
        <td>${product.product_name}</td>
        <td> <img src="${product.product_image}" height="50px"></td>
        <td>${formattedPrice}</td>
        <td>${categoryText}</td>
        <td>
            <a href="../../../admin/pages/product/productDetail.html?id=${product.id}" class="btn btn-dark">chi tiết</a>
            <a href="../../../admin/pages/product/updateProduct.html?id=${product.id}" class="btn btn-primary">Sửa</a>
            <a class="btn btn-danger" data-product-id="${childSnapshot.key}" id="btnDelete">Xóa</a>
        </td>
      </tr>`;
      stt++;
    });
    html.innerHTML = list;
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          let productId = e.target.getAttribute('data-product-id');
          if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            dbRemove(dbChild(dbRef(db), 'product/' + productId));
            window.location.href = '../../../admin/pages/product/productAdmin.html';
          }
        });
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải danh sách sản phẩm: ", error);
  });


