import { firebaseConfig } from '../../../firebase.js';
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
    update as dbUpdate,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDb(app);
const storage = getStorage(app);
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let nameInput = document.getElementById('nameUp');
let priceInput = document.getElementById('priceUp');
let descriptionInput = document.getElementById('descriptionUp');
let statusInput = document.getElementById('statusUp');
let saleInput = document.getElementById('saleUp');
let viewInput = document.getElementById('viewUp');
let cateInput = document.getElementById('cateUp');
const imgInput = document.getElementById('imgUp');

if (id) {
    let productRef = dbRef(db, 'product/' + id);
    dbGet(productRef).then((snapshot) => {
        if (snapshot.exists()) {
            let productData = snapshot.val();
            nameInput.value = productData.product_name;
            priceInput.value = productData.product_price;
            descriptionInput.value = productData.product_description;
            statusInput.value = productData.product_status;
            viewInput.value = productData.view;
            saleInput.value = productData.sale;
            cateInput.value = productData.cate_id;
            // imgInput.value = productData.product_image;
        } else {
            console.log("Không tìm thấy thông tin sản phẩm");
        }
    });

    let btnUpdateProduct = document.getElementById('btnUpdateProduct');
    btnUpdateProduct.addEventListener('click', (e) => {
        e.preventDefault();
        let name = nameInput.value;
        let price = priceInput.value;
        let description = descriptionInput.value;
        let status = statusInput.value;
        let sale = saleInput.value;
        let view = viewInput.value;
        let cate = cateInput.value;
        let img = document.getElementById('imgUp').files[0];
        let priceNumber = parseInt(price, 10);
        let viewNumber = parseInt(view, 10);
        let saleNumber = parseInt(sale, 10);
        let cate_id = parseInt(cate, 10);

        if (!name || !price || !description || !status || !sale || !view || !img || !cate) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const storageRef = sRef(storage, 'images/' + imgInput.files[0].name);
        const uploadTask = uploadBytesResumable(storageRef, imgInput.files[0]);

        uploadTask.then((snapshot) => {
            console.log('Tải lên thành công');

            getDownloadURL(storageRef).then((downloadURL) => {
                const newProduct = {
                    product_name: name,
                    product_price: priceNumber,
                    product_description: description,
                    product_status: status,
                    sale: saleNumber,
                    view: viewNumber,
                    cate_id: cate_id,
                    product_image: downloadURL
                };
                dbUpdate(dbRef(db, 'product/' + id), newProduct);
                alert('Cập nhật sản phẩm thành công');
                window.location.href = '../../../admin/pages/product/productAdmin.html';
            }).catch((error) => {
                console.error('Lỗi khi tải lên hình ảnh: ', error);
            });
        });
    });
}
