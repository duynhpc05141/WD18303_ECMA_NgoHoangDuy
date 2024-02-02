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
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);
dbGet(dbChild(dbRef(db), 'orders/'+ id))
  .then((snapshot) => {
    const orders = snapshot.val();
    let price = orders.product_price;
    let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    let html = document.getElementById('cartDetail');
    console.log(orders.quantily);
    let list = "";
    list += `<tr>
        <td>${orders.customer_name}</td>
        <td>${orders.customer_address}</td>
        <td>${orders.customer_phone_number}</td>
        <td>${orders.product_name}</td>
        <td>${formattedPrice}</td>
        <td>${orders.quantily}</td>
        <td>${orders.product_price * orders.quantily}</td>
      </tr>`;
    html.innerHTML = list;
  })
  .catch((error) => {
    console.error("Lỗi khi tải danh sách hóa đơn: ", error);
  });


