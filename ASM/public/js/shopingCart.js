
import { firebaseConfig } from "../../firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

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
let userName = sessionStorage.getItem('userName');
dbGet(dbChild(dbRef(db), `orders`))
    .then((snapshot) => {
        const orders = snapshot.val();
        let html = document.getElementById('show-Cart');
        let cart = '';
        snapshot.forEach( (childSnapshot) => {
            const orders = childSnapshot.val();
            if (userName == orders.customer_name) {
                let price = orders.product_price;
                let quantity = localStorage.getItem('quantity') || 1; // Giả sử quantity là 1, bạn có thể cập nhật giá trị này từ người dùng
                let total = quantity * price; // Tính toán tổng tiền
                let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                let formattedTotal = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                cart += `<tr>
                <td class="product__cart__item">
                    <div class="product__cart__item__text">
                        <h5>${orders.product_name}</h5>
                        <h5 style="color:red">${formattedPrice}</h5>
                    </div>
                </td>
                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2">
                            <input type="number" value="${quantity}" min="1">
                        </div>
                    </div>
                </td>
                <td class="cart__price">${formattedTotal}</td>
                <td class="cart__close"><button class="btn-delete" order-id="${childSnapshot.key}">Xóa</button></td>
                </tr>`;
                html.innerHTML += cart;
                document.querySelectorAll('.btn-delete').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                      e.preventDefault();
                      let ordersId  = e.target.getAttribute('order-id');
                      if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này không?")) {
                        dbRemove(dbChild(dbRef(db), 'orders/' + ordersId));
                        window.location.href = '../../pages/shopping-cart.html';
                      }
                    });
                });
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });

