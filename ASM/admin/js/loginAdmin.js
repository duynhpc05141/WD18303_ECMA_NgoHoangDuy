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
let btnLogin = document.getElementById('btnAdmin');

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    let emailAdmin = document.getElementById('email').value;
    let passAdmin = document.getElementById('pass').value;
    if (emailAdmin && passAdmin) {
        dbGet(dbChild(dbRef(db), `user`))
        .then((snapshot) => {
            let userFound = null;
                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val();
                    if (emailAdmin == userData.customer_email && passAdmin == userData.password && userData.role_id == 1) {
                        userFound = { id: childSnapshot.key, ...userData };
                    }
                });
            if (userFound) {
                let id = userFound.id;
                let role_id = userFound.role_id;
                sessionStorage.setItem('role_id', role_id);
                sessionStorage.setItem('id', id);
                window.location.href = "../../admin/dash.html";
            } else {
                throw new Error('Email hoặc mật khẩu không chính xác');
            }
        })
        .catch((error) => {
            console.error('Đăng nhập thất bại:', error.message);
            alert('Đăng nhập thất bại. Vui lòng thử lại sau.');
        });
    } else {
        alert('Vui lòng điền đầy đủ thông tin để đăng nhập.');
    }
});