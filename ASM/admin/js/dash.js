import { firebaseConfig } from '../../firebase.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Lấy dữ liệu từ Firebase
const ordersRef = ref(db, 'orders');
const usersRef = ref(db, 'user'); // Assuming 'user' is the correct path
const productsRef = ref(db, 'product'); // Assuming 'product' is the correct path
const categoriesRef = ref(db, 'category'); // Assuming 'category' is the correct path

let ordersCount = 0, usersCount = 0, productsCount = 0, categoriesCount = 0;

// ...

onValue(ordersRef, (snapshot) => {
    ordersCount = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
    updateChart();
});

onValue(usersRef, (snapshot) => {
    usersCount = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
    updateChart();
});

onValue(productsRef, (snapshot) => {
    productsCount = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
    updateChart();
});

onValue(categoriesRef, (snapshot) => {
    categoriesCount = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
    updateChart();
});

// ...


// Cập nhật biểu đồ khi đã có đủ dữ liệu
function updateChart() {
    if (ordersCount !== 0 && usersCount !== 0 && productsCount !== 0 && categoriesCount !== 0) {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['user', 'product', 'category', 'orders'],
                datasets: [{
                    label: 'Count',
                    data: [usersCount, productsCount, categoriesCount, ordersCount],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }};