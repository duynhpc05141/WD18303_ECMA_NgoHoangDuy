
import {firebaseConfig} from '../../firebase.js';
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

// const firebaseConfig = {
// apiKey: "AIzaSyAqgCaUUa-9lHJt5gXEbFIp-ymP_UpiH7M",
// authDomain: "dybook-d3e8f.firebaseapp.com",
// projectId: "dybook-d3e8f",
// storageBucket: "dybook-d3e8f.appspot.com",
// messagingSenderId: "198638692071",
// appId: "1:198638692071:web:f0c1e660a03dc76b136442"
// };
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);
// id = Number(id)-1;
let cate_id = urlParams.get('cate_id'+id);
const app = initializeApp(firebaseConfig);
const db = getDb(app);
dbGet(dbChild(dbRef(db), `product/`+ id))
    .then((snapshot) => {
        const product = snapshot.val();
        console.log(product);
        let categoryText = "";
        if (product.cate_id === 1) {
        categoryText = "Tiểu thuyết";
        } else if (product.cate_id === 2) {
        categoryText = "Sức khỏe";
        } else if (product.cate_id === 3) {
        categoryText = "Thơ";
        } else if (product.cate_id === 4) {
        categoryText = "Kinh dị";
        } else {
        categoryText = "Không xác định";
        }
        let price = product.product_price;
        let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        let productDetail = "";
        productDetail += `<div class="product__details__pic">
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
                                        <div >
                                            <input type="number" value="1" min="0">
                                        </div>
                                    </div>
                                    <a href="#" onclick="addToCartClicked(${product.id})" class="primary-btn" id="btnCart">Thêm vào giỏ hàng</a>
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
          
    })
    .catch((error) => {
        console.error(error);
    });


  // Hàm được gọi khi người dùng nhấn nút "Thêm vào giỏ hàng"
// function addToCartClicked(id) {
//     let idSp = id;
//     const API_PRODUCT_CART = 'http://localhost:3000/product/' + idSp;
//     fetch(API_PRODUCT_CART)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         localStorage.setItem('idProduct', data.id);
//         window.location.href = '../../pages/shopping-cart.html';
//         let product = { id: idProduct};
//         addToCart(product);
//     });
// }
  
  