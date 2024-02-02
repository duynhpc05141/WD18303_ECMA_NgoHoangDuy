
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
dbGet(dbChild(dbRef(db), `orders/`))
    .then((snapshot) => {
    const orders = snapshot.val();
    function addNewOrderToDatabase(newOrder) {
      // Thực hiện thêm mới dữ liệu vào Firebase Realtime Database
      const newOrderRef = push(dbRef(db, 'orders')); // Tạo một tham chiếu mới dưới 'users' và nhận về tham chiếu đến nút con mới
      dbSet(newOrderRef, newOrder); // Đặt dữ liệu người dùng vào tham chiếu mới
    }
    
    let btnAddOrder = document.getElementById('btnAddOrder');
    btnAddOrder.addEventListener('click', (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let product = document.getElementById('product').value;
        let price = document.getElementById('price').value;
        let address = document.getElementById('address').value;
        let date = document.getElementById('date').value;
        let quatily = document.getElementById('quatily').value;
        let status = document.getElementById('status').value;
        let quantilyNumber = parseInt(quatily, 10);
        let statusNumber = parseInt(status, 10);
        let priceNumber = parseInt(price, 10);
        if (!name || !address || !date || !quatily || !status || !product || !price) {
          alert('Vui lòng điền đầy đủ thông tin');
          return;
        }
      
        dbGet(dbRef(db, 'orders'))
        .then((snapshot) => {
          const orderList = snapshot.val();
          let newId = 0; // Xác định ID mới dựa trên độ dài của danh sách hiện có
          if (orderList) {
            Object.keys(orderList).forEach((key) => {
              const order = orderList[key];
              if (order.id && order.id > newId) {
                newId = order.id;
              }
            });
            newId++;
          }
          // Tạo một đối tượng người dùng mới với ID mới được xác định
          let newOrder = {
            id: newId,
            customer_name: name,
            product_name: product,
            product_price: priceNumber,
            customer_address: address,
            order_date: date,
            quantily: quantilyNumber,
            order_status: statusNumber
          }

          // Thêm dữ liệu người dùng mới vào cơ sở dữ liệu với ID tự tăng
          dbSet(dbRef(db, `orders/${newId}`), newOrder); // Đặt dữ liệu người dùng vào tham chiếu mới
          alert('Thêm thành công');
          window.location.href = '../../../admin/pages/cart/cartAdmin.html';
        });
        addNewOrderToDatabase(newOrder);
    });
});   
