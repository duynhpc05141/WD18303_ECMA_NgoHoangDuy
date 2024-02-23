
// const API = "http://localhost:3000/Subjects";
// let btn = document.getElementById('add');
// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     let name = document.getElementById('name').value;

//     fetch(API, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify()
//     })
//     .then((snapshot) => { 
//         const sub = snapshot.val();
//         const newId = cateList ? Object.keys(sub).length + 1 : 1;
//         const subNew = {
//             id: newId,
//             Name: name,
//             Logo: null
//         };
//     })
// })

const API = "https://fir-8ee6e-default-rtdb.asia-southeast1.firebasedatabase.app/";

let addUser = async (form) => {
    let data = new FormData(form);
    let idData = await fetch(API + "Subjects.json");
    let idNew = await idData.json();
    let nextId = Object.keys(idNew).length + 1;
    let object = {
        id: nextId,
        Name: data.get("name"),
        Logo: null 
    }
    fetch(API + "Subjects.json",{
        method: "POST",
        body: JSON.stringify(object)
    })
    window.location.href="./index.html";
}


let btn = document.getElementById('add');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let formAdd = document.getElementById('addForm');
    addUser(formAdd);

});
