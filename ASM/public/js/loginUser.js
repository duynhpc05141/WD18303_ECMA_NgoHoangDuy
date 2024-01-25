function logout() {
    sessionStorage.removeItem('id');
    window.location.href = './index.html';
}

let userId = sessionStorage.getItem('id');

    // .catch(function(error) {
    //     console.log('Fetch error:', error);
    // });

if (userId) {
    const API_USER_LOGIN = 'http://localhost:3000/user/' + userId;
    fetch(API_USER_LOGIN)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        loginContent = `<ul><li class="active "><a href="#">${data.customer_name}</a>
        <ul class="dropdown ">
            <li><a href="./pages/userInfor.html?id=${data.id}">Thông tin</a></li>
            <li><a href="#" onclick="logout()">Đăng xuất</a></li>
        </ul>
        </li></ul>`;
        document.getElementById('loginForm').innerHTML = loginContent;

    })
} else {
    loginContent = '<a href="./pages/login.html" style="color: black;">Đăng nhập</a>';
    document.getElementById('loginForm').innerHTML = loginContent;
}
