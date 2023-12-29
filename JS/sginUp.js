let btnSignUp = document.querySelector("#signUp");
let txtUserName = document.querySelector("#userName");
let txtEmail = document.querySelector("#email");
let txtPassword = document.querySelector("#password");
let txtRePassword = document.querySelector("#rePassword");
let customAlert = document.querySelector("#customAlert");
let btnEye = document.querySelectorAll(".eye-icon");
let btnEyeHiddin = document.querySelectorAll(".eye-icon-hidding");
let userList = [];
let nameRegex = /^[a-z]{3,}$/;
let emailRegex = /^[a-z]{1,}@[a-z]{2,}\.[a-z]{1,3}$/;
let passwordRegex = /^[a-z 1-9]{6,}$/;
btnSignUp.addEventListener("click", function () {
    let userName = txtUserName.value;
    let email = txtEmail.value;
    let password = txtPassword.value;
    let rePassword = txtRePassword.value;
    if(formValid()){
        if (checkPasswordEqual(password, rePassword)) {
            if (checkDuplicate(email)) {
                let user = {
                    name: userName,
                    email: email,
                    password, password
                }
                customAlert.classList.replace("d-block","d-none");
                saveNewUser(user);
                window.location.href = "index.html";
            }
        }
    }
});
function formValid() {
    let valid = true ;
    let message = "" ; 
    if(!validate(nameRegex,txtUserName)){
        message+=`<p>Name Is Required</p>`;
        valid = false ; 
    }
    if(!validate(emailRegex,txtEmail)){
        message+=`<p>Email Is Required</p>`
        valid = false ; 
    }

    if(!validate(passwordRegex,txtPassword)){
        message+=`<p>Password Is Required</p>`;
        valid = false ; 
    }

    if(!validate(passwordRegex,txtRePassword)){
        message+=`<p>Confirm Is Required</p>`;
        valid = false ; 
    }

    if(!valid){
        error(message);
    }
    return valid ; 
}

function validate(regex, input) {
    let valid ;
    if (regex.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        valid = true ; 
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        valid = false ; 
    }
    return valid ; 
}

function checkPasswordEqual(password, rePassword) {
    if (password === rePassword) {
        return true;
    }
    error("Password Missmatch !" , txtPassword , txtRePassword)
    return false;
}
function error(message,...input) {
    customAlert.classList.replace('d-none' ,"d-block") ; 
    for (const i of input) {
        i.classList.replace("is-valid" ,"is-invalid")
    }
    customAlert.innerHTML = message ; 
}

function checkDuplicate(email) {
    let userList = getUserList();
    if (userList.length > 0) {
        for (const user of userList) {
            if (user.email === email) {
                error("Email is Duplicated !" , txtEmail)
                return false;
            }
        }
    }
    return true;
}
// ! Save In LocalStorage
function saveNewUser(user) {
    userList.push(user);
    localStorage.setItem("userList", JSON.stringify(userList));
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



// ! Start Listners
txtUserName.addEventListener('input', function () {
    validate(nameRegex, txtUserName)
});
txtEmail.addEventListener('input', function () {
    validate(emailRegex, txtEmail)
});
txtPassword.addEventListener('input', function () {
    validate(passwordRegex, txtPassword)
});
txtRePassword.addEventListener('input', function () {
    validate(passwordRegex, txtRePassword)
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