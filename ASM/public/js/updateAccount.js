// const API_USER_UPDATE = 'http://localhost:3000/user';
// let btnSubmit = document.getElementById('btnSubmit');
// let urlParams = new URLSearchParams(window.location.search);
// let id = urlParams.get('id');
// console.log(id);

// // Đoạn mã để thêm dữ liệu từ form vào cơ sở dữ liệu JSON
// document.getElementById('btnSubmit').addEventListener('click', (e) => {
//   e.preventDefault();
//   let name = document.getElementById('name').value;
//   let email = document.getElementById('email').value;
//   let phone = document.getElementById('phone').value;
//   let address = document.getElementById('address').value;
//   let password = document.getElementById('pass').value;
//   let role = document.getElementById('role').value;

//   if (!name || !email || !phone || !address || !password || !role) {
//     alert('Vui lòng điền đầy đủ thông tin');
//     return;
//   }

//   let newData = {
//     customer_name: name,
//     customer_email: email,
//     customer_phone_number: phone,
//     customer_address: address,
//     password: password,
//     role_id: role
//   };

//   fetch(API_USER, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newData),
//   })
//   .then(response => response.json())
//   .then(data => {
//     alert('Đăng ký thành công');
//     window.location.href = '../../pages/login.html';
//     // Thực hiện các hành động khác sau khi thêm dữ liệu thành công
//   })
//   .catch(error => {
//     console.error('Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:', error);
//   });
// });

// Lấy thông tin người dùng từ URL query parameters
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);
const API_USER_UPDATE = 'http://localhost:3000/user/'+ id;
console.log(API_USER_UPDATE);
// Xử lý sự kiện khi người dùng nhấn nút "Submit"
document.getElementById('btnSubmit').addEventListener('click', (e) => {
  e.preventDefault();

  // Lấy thông tin từ các trường input
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let address = document.getElementById('address').value;
  let password = document.getElementById('pass').value;
  let role = document.getElementById('role').value;

  // Kiểm tra xem các trường thông tin có được điền đầy đủ hay không
  if (!name || !email || !phone || !address || !password || !role) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  // Dữ liệu mới cần cập nhật
  let updatedData = {
    customer_name: name,
    customer_email: email,
    customer_phone_number: phone,
    customer_address: address,
    password: password,
    role_id: role
  };

  // Gửi yêu cầu cập nhật thông tin người dùng lên cơ sở dữ liệu
  fetch(API_USER_UPDATE, {
    method: 'PUT', // Sử dụng phương thức PUT để cập nhật dữ liệu
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
  .then(response => response.json())
  .then(data => {
    if (response.ok) {
      sessionStorage.setItem('role_id', role_id);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('email', emailUser);
      sessionStorage.setItem('pass', passUser);
      sessionStorage.setItem('phone', phone);
      sessionStorage.setItem('address', address);
      sessionStorage.setItem('id', id);
      alert('Cập nhật thông tin thành công');
      window.location.href = '../../pages/userInfor.html?id=${id}'; // Chuyển hướng sau khi cập nhật thành công
    }
  })
  .catch(error => {
    console.error('Lỗi khi cập nhật thông tin:', error);
  });
});
