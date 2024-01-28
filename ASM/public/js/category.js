// const API_CATEGORY ='http://localhost:3000/category';
// fetch(API_CATEGORY)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     let html = document.getElementById('categoryList');
//     let categoryList = "";
//     data.map((item) => {
//         categoryList += `<li><a href="../../pages/productCategory.html?id=${item.id}">${item.category_name}</a></li>`;
//     });
//     html.innerHTML = categoryList;
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
const db = getDb(app);
dbGet(dbChild(dbRef(db), `category/`))
    .then((snapshot) => {
        const category = snapshot.val();
        if (category) {
          let html = document.getElementById('categoryList');
          let categoryList = "";
          category.map((item) => {
              categoryList += `<li><a href="../../pages/productCategory.html?id=${item.id}">${item.category_name}</a></li>`;
          });
          html.innerHTML = categoryList; 
      
        }
    })
    .catch((error) => {
        console.error(error);
    });