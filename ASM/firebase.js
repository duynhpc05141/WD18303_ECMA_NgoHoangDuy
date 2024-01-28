// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import {
//     getStorage,
//     ref as sRef,
//     uploadBytesResumable,
//     getDownloadURL,
// } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

// import {
//     getDatabase as getDb,
//     ref as dbRef,
//     set as dbSet,
//     get as dbGet,
//     child as dbChild,
//     push,
//     orderByChild,
//     equalTo,
//     remove as dbRemove,
//     update as dbUpdate,
// } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

export const firebaseConfig = {
apiKey: "AIzaSyAqgCaUUa-9lHJt5gXEbFIp-ymP_UpiH7M",
authDomain: "dybook-d3e8f.firebaseapp.com",
projectId: "dybook-d3e8f",
storageBucket: "dybook-d3e8f.appspot.com",
messagingSenderId: "198638692071",
appId: "1:198638692071:web:f0c1e660a03dc76b136442"
};

// const app = initializeApp(firebaseConfig);
// const db = getDb(app);
// dbGet(dbChild(dbRef(db), `product/`))
//     .then((snapshot) => {
//         const products = snapshot.val();
//         console.log(products);
//         if (products) {
//             console.log(products);
          
//         } else {
//             console.log("No data available");
//         }
//     })
//     .catch((error) => {
//         console.error(error);
//     });