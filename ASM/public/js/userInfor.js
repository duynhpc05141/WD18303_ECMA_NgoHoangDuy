let urlParams = new URLSearchParams(window.location.search);
	let id = urlParams.get('id');
	let UserRole = sessionStorage.getItem('role_id');
	let role1 = `<div class="wrap-login100-form-btn my-xl-2 col-lg-6">
	<div class="login100-form-bgbtn"></div>
	<button class="login100-form-btn">
		<a href="./updateUser.html?id=${id}" style="color: black;">Cập nhật tài khoản</a>
	</button>
	</div>
		<div class="wrap-login100-form-btn my-xl-2 col-lg-6">
	<div class="login100-form-bgbtn"></div>
	<button class="login100-form-btn">
		<a href="../../admin/login.html" style="color: black;">Quản trị</a>
	</button>
	</div>`;
	let role2 = `<div class="wrap-login100-form-btn my-xl-2 col-lg-6">
	<div class="login100-form-bgbtn"></div>
	<button class="login100-form-btn">
		<a href="./updateUser.html?id=${id}" style="color: black;">Cập nhật tài khoản</a>
	</button>
	</div>`;
	
	// if (UserRole == 1) {
	// 	return role1;
	// }else{
	// 	return role2;
	// }
	let roleId = (UserRole == 1) ? role1 : role2;

	const API_USER_INFOR = 'http://localhost:3000/user/'+ id;
	console.log(API_USER_INFOR);
fetch(API_USER_INFOR)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let html = document.getElementById('userinfor');
    let userInfor = "";
	userInfor += `<span class="login100-form-title p-b-20" id="invalid">
			<h3>Thông tin</h3>
			${data.customer_name}
		</span>
		<div>
			<p>Email: ${data.customer_email}<br>
			Số điện thoại: ${data.customer_phone_number}<br>
			Địa chỉ: ${data.customer_address}</p>
		</div>
		<div class="m-4" id="roleId">
			${roleId}
		</div>`;
		html.innerHTML = userInfor;
    });