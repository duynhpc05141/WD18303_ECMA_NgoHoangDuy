let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let UserRole = sessionStorage.getItem('role_id');
let role1 = `<div class="wrap-login100-form-btn my-xl-2 col-lg-6">
<div class="login100-form-bgbtn"></div>
<button class="login100-form-btn">
	<a href="../../pages/updateUser.html?id=${id}" style="color: black;">Cập nhật tài khoản</a>
</button>
</div>
	<div class="wrap-login100-form-btn my-xl-2 col-lg-6">
<div class="login100-form-bgbtn"></div>
<button class="login100-form-btn">
	<a href="../../admin/" style="color: black;">Quản trị</a>
</button>
</div>`;
let role2 = `<div class="wrap-login100-form-btn my-xl-2 col-lg-6">
<div class="login100-form-bgbtn"></div>
<button class="login100-form-btn">
	<a href="../../pages/updateUser.html?id=${id}"  style="color: black;">Cập nhật tài khoản</a>
</button>
</div>`;

// if (UserRole == 1) {
// 	return role1;
// }else{
// 	return role2;
// }
let roleId = (UserRole == 1) ? role1 : role2;

// const API_USER_INFOR = 'http://localhost:3000/user/'+ id;
// console.log(API_USER_INFOR);
// fetch(API_USER_INFOR)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     let html = document.getElementById('userinfor');
//     let userInfor = "";
// 	userInfor += `<span class="login100-form-title p-b-20" id="invalid">
// 			<h3>Thông tin</h3>
// 			${data.customer_name}
// 		</span>
// 		<div>
// 			<p>Email: ${data.customer_email}<br>
// 			Số điện thoại: ${data.customer_phone_number}<br>
// 			Địa chỉ: ${data.customer_address}</p>
// 		</div>
// 		<div class="m-4" id="roleId">
// 			${roleId}
// 		</div>`;
// 		html.innerHTML = userInfor;
//     });

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
dbGet(dbChild(dbRef(db), `user/`+ id))
    .then((snapshot) => {
    const user = snapshot.val();
	let html = document.getElementById('userinfor');
	let userInfor = "";
	userInfor += `<span class="login100-form-title p-b-20" id="invalid">
			<h3>Thông tin</h3>
			${user.customer_name}
		</span>
		<div>
			<p>Email: ${user.customer_email}<br>
			Số điện thoại: ${user.customer_phone_number}<br>
			Địa chỉ: ${user.customer_address}</p>
		</div>
		<div class="m-4" id="roleId">
			${roleId}
		</div>`;
	html.innerHTML = userInfor;
    });