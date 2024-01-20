const API_USER = 'http://localhost:3000/user';
let btnSubmit = document.getElementById('btnSubmit');

// Đoạn mã để thêm dữ liệu từ form vào cơ sở dữ liệu JSON
document.getElementById('btnSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let address = document.getElementById('address').value;
  let password = document.getElementById('pass').value;
  let role = document.getElementById('role').value;

  if (!name || !email || !phone || !address || !password || !role) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  let newData = {
    customer_name: name,
    customer_email: email,
    customer_phone_number: phone,
    customer_address: address,
    password: password,
    role_id: role
  };

  fetch(API_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  .then(response => response.json())
  .then(data => {
    alert('Đăng ký thành công');
    window.location.href = '../../pages/login.html';
    // Thực hiện các hành động khác sau khi thêm dữ liệu thành công
  })
  .catch(error => {
    console.error('Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:', error);
  });
});

var showPass = 0;
$('btn-show-pass').on('click', function(){
    if(showPass == 0) {
        $(this).next('input').attr('type','text');
        $(this).find('i').removeClass('zmdi-eye');
        $(this).find('i').addClass('zmdi-eye-off');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type','password');
        $(this).find('i').addClass('zmdi-eye');
        $(this).find('i').removeClass('zmdi-eye-off');
        showPass = 0;
    } 
});