

// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    let cart = getCartFromLocalStorage(); // Lấy thông tin giỏ hàng từ localStorage
    cart.push(product); // Thêm sản phẩm vào giỏ hàng
    saveCartToLocalStorage(cart); // Lưu thông tin giỏ hàng vào localStorage
  }
  
  // Hàm để lưu thông tin giỏ hàng vào localStorage
  function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Hàm để lấy thông tin giỏ hàng từ localStorage
  function getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  let idSp = localStorage.getItem('idProduct');
  const API_PRODUCT_CART = 'http://localhost:3000/product/' + idSp;
  console.log(API_PRODUCT_CART);
  
  fetch(API_PRODUCT_CART)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
    let price = data.product_price;
    let quantity = 1; // Giả sử quantity là 1, bạn có thể cập nhật giá trị này từ người dùng
    let total = quantity * price; // Tính toán tổng tiền
    let html = document.getElementById('show-Cart');   
    let cart = '';
    let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    cart += `<tr>
        <td class="product__cart__item">
            <div class="product__cart__item__text">
                <h5>${data.product_name}</h5>
                <h5 style="color:red">${formattedPrice}</h5>
            </div>
        </td>
        <td class="quantity__item">
            <div class="quantity">
                <div class="pro-qty-2">
                    <input type="number" value="${quantity}" min="1">
                </div>
            </div>
        </td>
        <td class="cart__price">${total}</td>
        <td class="cart__close"><i class="fa fa-close"></i></td>
        </tr>
        <button class="primary-btn">Thanh toán</button>`;
    html.innerHTML += cart; 
    });
  