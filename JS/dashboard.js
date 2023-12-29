let userName = document.querySelector("#userName") ; 




function getUserName() {
    let user = sessionStorage.getItem("currentUser");
    console.log(user);
    userName.innerHTML = `Welcome ${user}` ; 
}


getUserName();