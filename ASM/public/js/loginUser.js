

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
const app = initializeApp(firebaseConfig);
const db = getDb(app);
let userId = sessionStorage.getItem('id');
console.log(userId);
let loginContent ='';
if (userId) {
    dbGet(dbChild(dbRef(db), `user/`+ userId))
    .then((snapshot) => {
    const user = snapshot.val();
        loginContent = `<ul><li class="active "><a href="#">${user.customer_name}</a>
        <ul class="dropdown ">
            <li><a href="./pages/userInfor.html?id=${user.id}">Thông tin</a></li>
            <li><a href="#" id="logoutLink">Đăng xuất</a></li>
        </ul>
        </li></ul>`;
        document.getElementById('loginForm').innerHTML = loginContent;
        document.getElementById('logoutLink').addEventListener('click', logout);
    })
}else {
    loginContent = '<a href="./pages/login.html" style="color: black;">Đăng nhập</a>';
    document.getElementById('loginForm').innerHTML = loginContent;
};

function logout() {
    sessionStorage.removeItem('id');
    window.location.href = '../../index.html';
}
// if (userId) {
//     const API_USER_LOGIN = 'http://localhost:3000/user/' + userId;
//     fetch(API_USER_LOGIN)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
        // loginContent = `<ul><li class="active "><a href="#">${data.customer_name}</a>
        // <ul class="dropdown ">
        //     <li><a href="./pages/userInfor.html?id=${data.id}">Thông tin</a></li>
        //     <li><a href="#" onclick="logout()">Đăng xuất</a></li>
        // </ul>
        // </li></ul>`;
        // document.getElementById('loginForm').innerHTML = loginContent;

//     })
// } else {
    // loginContent = '<a href="./pages/login.html" style="color: black;">Đăng nhập</a>';
    // document.getElementById('loginForm').innerHTML = loginContent;
// }
