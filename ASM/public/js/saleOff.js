// const API_PRODUCT_SALE = 'http://localhost:3000/product';


// fetch(API_PRODUCT_SALE)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     let html = document.getElementById('saleOff');
//     let product_sale = "";
//     data.map((item) => {
//         let price = item.product_price;
//         let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
//         let maxViewProduct = data.reduce((max, current) => (max.view > current.view) ? max : current);
//         if (item.id === maxViewProduct.id) {
//             product_sale += `<div class="container">
//             <div class="row">
//                 <div class="col-lg-4">
//                     <div class="categories__hot__deal">
//                         <img src="${item.product_image}" alt="" height="450px" width="280px">
//                         <div class="hot__deal__sticker">
//                             <span>Sale Of</span>
//                             <h5>${formattedPrice}</h5>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-lg-4 offset-lg-1">
//                     <div class="categories__deal__countdown">
//                         <span>Giảm giá Trong tuần</span>
//                         <h2>${item.product_name}</h2>
//                         <a href="./shop.html" class="primary-btn">Mua ngay</a>
//                     </div>
//                 </div>
//             </div>
//         </div>`;
//         }
        
//     });
//     html.innerHTML = product_sale;
//   });
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
const app = initializeApp(firebaseConfig);

//get ref to database services
const db = getDb(app);
dbGet(dbChild(dbRef(db), `product/`))
    .then((snapshot) => {
        const product = snapshot.val();
        let html = document.getElementById('saleOff');
            let product_sale = "";
            product.map((item) => {
                let price = item.product_price;
                let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                let maxViewProduct = product.reduce((max, current) => (max.view > current.view) ? max : current);
                if (item.id === maxViewProduct.id) {
                    product_sale += `<div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="categories__hot__deal">
                                <img src="${item.product_image}" alt="" height="450px" width="280px">
                                <div class="hot__deal__sticker">
                                    <span>Sale Of</span>
                                    <h5>${formattedPrice}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 offset-lg-1">
                            <div class="categories__deal__countdown">
                                <span>Giảm giá Trong tuần</span>
                                <h2>${item.product_name}</h2>
                                <a href="../../pages/shop-details.html?id=${item.id}&cate_id=${item.cate_id}" class="primary-btn">Mua ngay</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        })
        html.innerHTML = product_sale;
    })
    .catch((error) => {
        console.error(error);
    });