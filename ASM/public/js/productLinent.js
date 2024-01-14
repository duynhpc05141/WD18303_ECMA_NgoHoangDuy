const API_PRODUCT = 'http://localhost:3000/product';


fetch(API_PRODUCT)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let html = document.getElementById('productLient');
    let product_list = "";
    data.map((item) => {
      product_list += `<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
        <div class="product__item">
          <div class="product__item__pic " >
            <img src="${item.product_image}" alt="">
            <span class="label">Mới</span>
          </div>
          <div class="product__item__text">
            <h6>${item.product_name}</h6>
            <h5 style="color: red;">${item.product_price}</h5>
            <a href="#" class="add-cart">Thêm vào giỏ hàng</a>
            <p>${item.product_description}</p>
          </div>
        </div>
      </div>`;
    });
    html.innerHTML = product_list;
  });
