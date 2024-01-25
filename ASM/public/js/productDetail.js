let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let cate_id = urlParams.get('cate_id');

const API_PRODUCT_DETAIL = 'http://localhost:3000/product/' + id;
console.log(API_PRODUCT_DETAIL);
fetch(API_PRODUCT_DETAIL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let categoryText = "";
    if (data.cate_id === 1) {
    categoryText = "Tiểu thuyết";
    } else if (data.cate_id === 2) {
    categoryText = "Sức khỏe";
    } else if (data.cate_id === 3) {
    categoryText = "Thơ";
    } else if (data.cate_id === 4) {
    categoryText = "Kinh dị";
    } else {
    categoryText = "Không xác định";
    }
    let price = data.product_price;
    let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        let productDetail = "";
        productDetail += `<div class="product__details__pic">
                <div class="container">
                    <div class="row-cols-xl-1">
                        <div class="col-lg-6 col-md-9 ">
                            <div class="tab-content ">
                                <div class="product__details__pic__item ">
                                    <img src="${data.product_image}" alt="" height="700px">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product__details__content">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <div class="product__details__text">
                                <h2>${data.product_name}</h2>
                                <h4 style="color:red">${formattedPrice}<p>-->${data.sale}%</p></h4>
                                <p>${data.product_description}</p>
                                
                                <div class="product__details__cart__option">
                                    <div class="quantity">
                                        <div >
                                            <input type="number" value="1" min="0">
                                        </div>
                                    </div>
                                    <a href="#" onclick="addToCartClicked(${data.id})" class="primary-btn" id="btnCart">Thêm vào giỏ hàng</a>
                                </div>
                                <div class="product__details__last__option">
                                    <ul>
                                        <li><span>Thể loại:</span> ${categoryText}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-lg-5">
                            <div class="product__details__tab">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <h3>Mô tả</h3>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-5" role="tabpanel">
                                        <div class="product__details__tab__content">
                                            <div class="product__details__tab__content__item">
                                                <p>${data.product_status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;   
        let html = document.getElementById('productDetail');
        html.innerHTML = productDetail;
    })
  .catch(function (err) {
        console.log("error");
  });



  // Hàm được gọi khi người dùng nhấn nút "Thêm vào giỏ hàng"
function addToCartClicked(id) {
    let idSp = id;
    const API_PRODUCT_CART = 'http://localhost:3000/product/' + idSp;
    fetch(API_PRODUCT_CART)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        localStorage.setItem('idProduct', data.id);
        window.location.href = '../../pages/shopping-cart.html';
        let product = { id: idProduct};
        addToCart(product);
    });
}
  
  