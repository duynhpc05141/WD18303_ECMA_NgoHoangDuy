
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

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);
const app = initializeApp(firebaseConfig);
const db = getDb(app);
dbGet(dbChild(dbRef(db), `product/`+ id))
    .then((snapshot) => {
        const product = snapshot.val();
        console.log(product);
        let categoryText = "";
        if (product.cate_id == 0) {
        categoryText = "Tiểu thuyết";
        } else if (product.cate_id == 1) {
        categoryText = "Sức khỏe";
        } else if (product.cate_id == 2) {
        categoryText = "Thơ";
        } else if (product.cate_id == 3) {
        categoryText = "Kinh dị";
        } else {
        categoryText = "Không xác định";
        }
        let price = product.product_price;
        let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        let productDetail = "";
        productDetail += `<div class="product__details__pic">
            </div>
            <div class="product__details__content">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-4">
                            <div class="product__details__text">
                                <div class="product__details__pic__item mb-4">
                                    <img src="${product.product_image}" alt="" height="400px">
                                </div>
                                <h2><b>${product.product_name}</b></h2>
                                <h4>${formattedPrice}</h4>
                                <p>${product.product_description}</p>
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

