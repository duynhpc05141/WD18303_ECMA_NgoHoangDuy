import { firebaseConfig } from '../../firebase.js';
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

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

const app = initializeApp(firebaseConfig);
const db = getDb(app);

dbGet(dbChild(dbRef(db), `product/${id}`))
    .then((snapshot) => {
        const product = snapshot.val();

        let categoryText = "";
        switch (product.cate_id) {
            case 0:
                categoryText = "Tiểu thuyết";
                break;
            case 1:
                categoryText = "Sức khỏe";
                break;
            case 2:
                categoryText = "Thơ";
                break;
            case 3:
                categoryText = "Kinh dị";
                break;
            default:
                categoryText = "Không xác định";
                break;
        }

        let price = product.product_price;
        let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

        let productDetail = `
            <div class="product__details__pic">
                <div class="container">
                    <div class="row-cols-xl-1">
                        <div class="col-lg-6 col-md-9 ">
                            <div class="tab-content ">
                                <div class="product__details__pic__item ">
                                    <img src="${product.product_image}" alt="" height="700px">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product__details__content">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <div class="product__details__text">
                                <h2>${product.product_name}</h2>
                                <h4 style="color:red">${formattedPrice}<p>-->${product.sale}%</p></h4>
                                <p>${product.product_description}</p>
                                
                                <div class="product__details__cart__option">
                                    <div class="quantity">
                                        <div>
                                            <input type="number" value="1" min="0">
                                        </div>
                                    </div>
                                    <a href="#" data-product-id="${snapshot.key}" class="primary-btn" id="btnCart">Thêm vào giỏ hàng</a>
                                </div>
                                <div class="product__details__last__option">
                                    <ul>
                                        <li><span>Thể loại:</span> ${categoryText}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-lg-5">
                            <div class="product__details__tab">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <h3>Mô tả</h3>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-5" role="tabpanel">
                                        <div class="product__details__tab__content">
                                            <div class="product__details__tab__content__item">
                                                <p>${product.product_status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        let html = document.getElementById('productDetail');
        html.innerHTML = productDetail;

        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', (e) => {
                var quantity = e.target.value;
                localStorage.setItem('quantity', quantity);
            });
        });

        document.querySelectorAll('.primary-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                let idSP = e.target.getAttribute('data-product-id');
                let userId = sessionStorage.getItem('id');
                if (userId != null) {
                        if (confirm("Thêm vào giỏ hàng!")) {
                            let quantity = document.querySelector('input[type="number"]').value;
                            localStorage.setItem('idProduct', idSP);
                            localStorage.setItem('quantity', quantity);

                            const productSnapshot = await dbGet(dbChild(dbRef(db), `product/${idSP}`));
                            const product = productSnapshot.val();

                            let name = sessionStorage.getItem('userName');
                            let address = sessionStorage.getItem('address');
                            let phone = sessionStorage.getItem('userPhone');
                            let date = new Date().toISOString();
                            let quantilyNumber = parseInt(quantity);

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
                            const newOrder = {
                                id: newId,
                                customer_name: name,
                                product_name: product.product_name,
                                product_price: product.product_price,
                                customer_address:address,
                                customer_phone_number: phone,
                                order_date: date,
                                quantily: quantilyNumber,
                                order_status: 2
                            };
                            dbSet(dbRef(db, `orders/${newId}`), newOrder);

                            alert('Thêm thành công');
                            window.location.href = '../../pages/shopping-cart.html';
                            
                        });
                    }
                }
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });
