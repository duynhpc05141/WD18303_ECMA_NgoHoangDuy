import {firebaseConfig} from '../../../firebase.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

import {
    getDatabase as getDb,
    ref as dbRef,
    set as dbSet,
    get as dbGet,
    child as dbChild,
    push,
    orderByChild,
    equalTo,
    remove as dbRemove,
    update as dbUpdate,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDb(app);
const storage = getStorage(app);

// Lắng nghe sự kiện click của nút thêm sản phẩm
// Lắng nghe sự kiện click của nút thêm sản phẩm
let btnAddProduct = document.getElementById('btnAddProduct');
btnAddProduct.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let status = document.getElementById('status').value;
    let sale = document.getElementById('sale').value;
    let view = document.getElementById('view').value;
    let cate = document.getElementById('cate').value;
    const img = document.getElementById('img').files[0];
    let cate_id = parseInt(cate, 10);
    let priceNumber = parseInt(price, 10);
    let viewNumber = parseInt(view, 10);
    let saleNumber = parseInt(sale, 10);
    if (!name || !price || !description || !status || !sale || !view || !img || !cate) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
    }
    // Tạo tham chiếu đến vị trí lưu trữ trên Firebase Storage
    const storageRef = sRef(storage, 'images/' + img.name);

    // Tải tệp hình ảnh lên Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, img);
    

    // Theo dõi quá trình tải lên
    uploadTask.then((snapshot) => {
        console.log('Tải lên thành công');

        // Lấy URL tải về của hình ảnh
        getDownloadURL(storageRef).then((downloadURL) => {
            dbGet(dbRef(db, 'product')).then((snapshot) => {
                // Lưu downloadURL và các thông tin khác vào cơ sở dữ liệu Firebase
                const newProduct = {
                    product_name: name,
                    product_price: priceNumber,
                    product_description: description,
                    product_status: status,
                    sale: saleNumber,
                    view: viewNumber,
                    cate_id: cate_id,
                    product_image: downloadURL // Lưu URL tải về của hình ảnh
                };
                dbSet(dbRef(db, `product/`+id), newProduct);
                alert('Thêm sản phẩm thành công');
                window.location.href = '../../../admin/pages/product/productAdmin.html';
            });
        }).catch((error) => {
            console.error('Lỗi khi tải lên hình ảnh: ', error);
        });
    });
});

