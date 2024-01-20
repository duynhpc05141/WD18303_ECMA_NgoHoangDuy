const API_CATEGORY ='http://localhost:3000/category';


fetch(API_CATEGORY)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let html = document.getElementById('categoryList');
    let categoryList = "";
    data.map((item) => {
        categoryList += `<li><a href="#">${item.category_name}</a></li>`;
    });
    html.innerHTML = categoryList;
  });
