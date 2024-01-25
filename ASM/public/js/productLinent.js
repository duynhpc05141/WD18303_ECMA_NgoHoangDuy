const API_PRODUCT = 'http://localhost:3000/product';

fetch(API_PRODUCT)
.then(function(response) {
  return response.json();
})
.then(function(data) {
  let html = document.getElementById('productLient');
  let product_list = "";
  data.map((item) => {
    let price = item.product_price;
    let maxSentences =15; // Số câu tối đa muốn hiển thị
    let content = item.product_description; // Nội dung của bài viết
    // Tách nội dung thành các câu
    let sentences = content.split(' ');

    // Khai báo biến limitedContent ở ngoài để sử dụng sau
    let limitedContent ;
    // Kiểm tra số câu
    if (sentences.length > maxSentences) {
      // Nếu số câu vượt quá giới hạn, chỉ hiển thị số câu đã chọn và thêm dấu '...'
      limitedContent = sentences.slice(0, maxSentences).join(' ') + '...';
    } else {
      // Nếu số câu không vượt quá giới hạn, không thêm dấu '...'
      limitedContent = content;
    };
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
            <p>${limitedContent}</p> 
          </div>
        </div>
      </a>
    </div>`;
  });
  html.innerHTML = product_list;  
});
  
