const API_PRODUCT_LIST = 'http://localhost:3000/product';


fetch(API_PRODUCT_LIST)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let html = document.getElementById('productList');
    let productlist = "";
    data.map((item) => {
      let price = item.product_price;
      let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      productlist += `<div class="col-lg-4 col-md-6 col-sm-6">
      <a href="../../pages/shop-details.html?id=${item.id}&cate_id=${item.cate_id}">
        <div class="product__item sale">
            <div class="product__item__pic">
                <img src="${item.product_image}" alt="">
                  <span class="label">Sale</span>
            </div>
            <div class="product__item__text">
                <h6><b>${item.product_name}</b></h6>
                <h5 style="color:red;">${formattedPrice}</h5>
                <p>${item.product_description}</p>
            </div>
          </div>
          </a>
        </div>
      
      `;
    });
    html.innerHTML = productlist;
  });
