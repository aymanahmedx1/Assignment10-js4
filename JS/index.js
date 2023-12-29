let btnSignIn = document.querySelector("#login");
let txtEmail = document.querySelector("#email");
let txtPassword = document.querySelector("#password");
let customAlert = document.querySelector("#customAlert");
let btnEye = document.querySelectorAll(".eye-icon");
let btnEyeHiddin = document.querySelectorAll(".eye-icon-hidding");
let emailRegex = /^[a-z]{1,}@[a-z]{2,}\.[a-z]{1,3}$/;
let passwordRegex = /^[a-z 1-9]{6,}$/;
btnSignIn.addEventListener("click", function () {
    let user = {
        email: txtEmail.value,
        password: txtPassword.value,
    }
    if (checkDataLogin(user)) {
        console.log(user);
        customAlert.classList.replace("d-block", "d-none");
        
        window.location.href = "dashboard.html";
    }else{
        console.log("no");
        error("Email Or Password Incorrect" ,txtEmail , txtPassword);
    }
});
function error(message,...input) {
    customAlert.classList.replace('d-none' ,"d-block") ; 
    for (const i of input) {
        i.classList.replace("is-valid" ,"is-invalid")
    }
    customAlert.innerHTML = message ; 
}

function validate(regex, input) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
}


function checkDataLogin(logged) {
    let allUser = getUserList();
    for (const user of allUser) {
        if(user.email === logged.email && user.password === logged.password ){
            saveUserInSesstion(user) ; 
            return true ; 
        }
    }
    return false ; 
}
//! Get Data From LocalStorage
function getUserList() {
    var listData = localStorage.getItem("userList");
    var data = JSON.parse(listData);
    if (data) {
        userList = data;
        return data;
    }
    return []
}


function saveUserInSesstion(user) {
    sessionStorage.setItem("currentUser" , user.name);
}
// ! Start Listners

txtEmail.addEventListener('input', function () {
    validate(emailRegex, txtEmail)
});
txtPassword.addEventListener('input', function () {
    validate(passwordRegex, txtPassword)
});



// ^ EYE Listner 
for (const e of btnEye) {
    e.addEventListener("click", function (btn) {
        txtPassword.setAttribute("type", "text");
        txtRePassword.setAttribute("type", "text");
        btnEye[0].classList.add("d-none");
        btnEye[1].classList.add("d-none");
        btnEyeHiddin[0].classList.remove("d-none")
        btnEyeHiddin[1].classList.remove("d-none")
        btnEyeHiddin[0].classList.add("d-block");
        btnEyeHiddin[1].classList.add("d-block");
    });
}

for (const e of btnEyeHiddin) {
    e.addEventListener("click", function (btn) {
        txtPassword.setAttribute("type", "password");
        txtRePassword.setAttribute("type", "password");
        btnEye[0].classList.remove("d-none")
        btnEye[1].classList.remove("d-none")
        btnEye[0].classList.add("d-block");
        btnEye[1].classList.add("d-block");
        btnEyeHiddin[0].classList.add("d-none");
        btnEyeHiddin[1].classList.add("d-none");
    });
}