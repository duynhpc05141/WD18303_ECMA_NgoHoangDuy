const API_PRODUCT_SALE = 'http://localhost:3000/product';


fetch(API_PRODUCT_SALE)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let html = document.getElementById('saleOff');
    let product_sale = "";
    data.map((item) => {
        let price = item.product_price;
        let formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        let maxViewProduct = data.reduce((max, current) => (max.view > current.view) ? max : current);
        if (item.id === maxViewProduct.id) {
            product_sale += `<div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="categories__hot__deal">
                        <img src="${item.product_image}" alt="" height="450px" width="280px">
                        <div class="hot__deal__sticker">
                            <span>Sale Of</span>
                            <h5>${formattedPrice}</h5>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-1">
                    <div class="categories__deal__countdown">
                        <span>Giảm giá Trong tuần</span>
                        <h2>${item.product_name}</h2>
                        <a href="./shop.html" class="primary-btn">Mua ngay</a>
                    </div>
                </div>
            </div>
        </div>`;
        }
        
    });
    html.innerHTML = product_sale;
  });
