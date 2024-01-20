const API_PRODUCT = 'http://localhost:3000/product';
const productsPerPage = 8; // Số sản phẩm trên mỗi trang
let currentPage = 1; // Trang hiện tại
let totalPages; // Tổng số trang
// fetch(API_PRODUCT)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     let html = document.getElementById('productLient');
//     let product_list = "";
//     data.map((item) => {
//       let price = item.product_price;
//       let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
//       product_list += `<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
//       <a href="../../pages/shop-details.html?id=${item.id}&cate_id=${item.cate_id}">
//         <div class="product__item">
//           <div class="product__item__pic " >
//             <img src="${item.product_image}" alt="">
//             <span class="label">Mới</span>
//           </div>
//           <div class="product__item__text">
//             <h6><b>${item.product_name}</b></h6>
//             <h5 style="color: red;">${formattedPrice}</h5>
//             <p>${item.product_description}</p>
//           </div>
//         </div>
//       </a>
//       </div>`;
//     });
//     html.innerHTML = product_list;
//   });
  function displayProducts(page) {
  fetch(`${API_PRODUCT}?_page=${page}&_limit=${productsPerPage}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let html = document.getElementById('productLient');
    let product_list = "";
    data.map((item) => {
      let price = item.product_price;
      let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      product_list += `<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
      <a href="../../pages/shop-details.html?id=${item.id}&cate_id=${item.cate_id}">
        <div class="product__item">
          <div class="product__item__pic " >
            <img src="${item.product_image}" alt="">
            <span class="label">Mới</span>
          </div>
          <div class="product__item__text">
            <h6><b>${item.product_name}</b></h6>
            <h5 style="color: red;">${formattedPrice}</h5>
            <p>${item.product_description}</p>
          </div>
        </div>
      </a>
      </div>`;
    });
    html.innerHTML = product_list;
  });
  }
  function displayPagination() {
    // Hiển thị nút phân trang và gắn sự kiện click để chuyển đổi giữa các trang
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
  
    fetch(API_PRODUCT)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      totalPages = Math.ceil(data.length / productsPerPage);
      for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement('button');
        button.innerText = i;
        button.className = 'pagination-button'; // Thêm class cho nút button
        button.addEventListener('click', function() {
          currentPage = i; // Cập nhật trang hiện tại khi người dùng nhấn nút
          displayProducts(currentPage); // Hiển thị sản phẩm cho trang mới
        });
        pagination.appendChild(button);
      }
    });
  }
  
  
  
displayProducts(currentPage);
displayPagination();