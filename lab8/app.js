// class Person {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
// };

// class Student extends Person {
//     constructor(name, age, major){
//         super(name,age);
//         this.major = major;
//     }
// };

// let LonHon10 = (arr) => {
//     arr.forEach(element => {
//         if (element > 10) {
//             console.log(element);
//         }
//     });
// };

// let arr = [1,11,22,4,6,12];
// LonHon10(arr);


const API = "https://fir-8ee6e-default-rtdb.asia-southeast1.firebasedatabase.app/";
let list = async () => {
    let repose = await fetch(API + "Subjects.json");
    return await repose.json();
}
list()
.then(function(data){
        let html= document.getElementById('data');
        let list = `<tr>
        <th>stt</th>
        <th>Name</th>
        <th>Chức năng</th>
        </tr>`;
        Object.entries(data).forEach(([key, data]) => {
        list += `<tr>
        <td>${data.id}</td>
        <td>${data.Name}</td>
        <td>
            <button class="btn btn-danger" id="${data.id}">Xóa</button>
        </td>
        </tr>
        `;
        });
        html.innerHTML = list;
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              let id = e.target.getAttribute('id');
              id= id -1;
              console.log(id);
              if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
                fetch(API + "Subjects/" + id + ".json" , { method: 'DELETE' }).then((res) => window.location.href = "./index.html")
              }
            });
        });
    }) 



// let btn = document.getElementByida('add');
// btn.addEventListener('lick', (e) => {
//     e.preventDefault();
//     let name = document.getElementById('name').value;
//     fetch(API, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             id: null,
//             Name: name,
//             Logo: null
//         })
//     })
//     .then((repose) => { console.log('them thanh cong');})
// })
// ======================= AXIOS =======================================
// const API = "http://localhost:3000/Subjects";
// axios.get(API)
//   .then((response) => {
//     const data = response.data;
//     let html = document.getElementById('data');
//     let list = `<tr>
//       <th>stt</th>
//       <th>Name</th>
//       <th>logo</th>
//       <th>Chức năng</th>
//       </tr>`;
//     for (let item of data) {
//       list += `<tr>
//         <td>${item.id}</td>
//         <td>${item.Name}</td>
//         <td><img src="${item.Logo}"></td>
//         <td>
//           <button class="btn-danger" id="${item.id}">Xóa</button>
//         </td>
//       </tr>`;
//     }
//     html.innerHTML = list;
//     document.querySelectorAll('.btn-danger').forEach(btn => {
//       btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         let id = e.target.getAttribute('id');
//         if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
//           axios.delete(API + `/${id}`)
//             .then((res) => console.log('ok'))
//             .catch((error) => console.error('Lỗi xóa:', error));
//         }
//       });
//     });
//   })
//   .catch((error) => {
//     console.error('Lỗi yêu cầu:', error);
//   });
