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
let productInput = document.getElementById('product');
let priceInput = document.getElementById('price');
let addressInput = document.getElementById('address');
let dateInput = document.getElementById('date');
let quatilyInput = document.getElementById('quatily');
let statusInput = document.getElementById('status');
// Tải thông tin người dùng từ cơ sở dữ liệu Firebase và điền vào các trường tương ứng trong biểu mẫu
if (id) {
    let orderRef = dbRef(db, 'orders/' + id);
    dbGet(orderRef).then((snapshot) => {
      if (snapshot.exists()) {
        let orderUpdate = snapshot.val();
        nameInput.value = orderUpdate.customer_name;
        productInput.value = orderUpdate.product_name;
        priceInput.value = orderUpdate.product_price;
        addressInput.value = orderUpdate.customer_address;
        dateInput.value = orderUpdate.order_date;
        quatilyInput.value = orderUpdate.quantily;
        statusInput.value = orderUpdate.order_status;
      } else {
        console.log("Không tìm thấy thông tin hóa đơn");
      }
    })
  
    // Thêm sự kiện click cho nút cập nhật
    let btnUpOrder = document.getElementById('btnUpOrder');
    btnUpOrder.addEventListener('click', (e) => {
      e.preventDefault();
      // Lấy giá trị từ các trường trong biểu mẫu
      let name = nameInput.value;
      let product = productInput.value;
      let price = priceInput.value;
      let address = addressInput.value;
      let date = dateInput.value;
      let quatily = quatilyInput.value;
      let status = statusInput.value;
  
      // Kiểm tra và cập nhật thông tin người dùng trong cơ sở dữ liệu Firebase
      if (!name || !product || !price || !address || !date || !quatily || !status ) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
      }
      let newOrder = {
        customer_name: name,
        product_name: product,
        product_price: price,
        customer_address: address,
        order_date: date,
        quantily: quatily,
        order_status: status
      }
      dbUpdate(dbRef(db, 'orders/' + id), newOrder);
      alert('Cập nhật thành công');
      window.location.href = '../../../admin/pages/cart/cartAdmin.html';
    });
  }