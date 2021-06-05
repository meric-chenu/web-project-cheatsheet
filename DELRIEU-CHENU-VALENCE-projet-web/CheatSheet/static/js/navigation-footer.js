const buttonHamburgerMenu = document.getElementById("toggle-button-hamburger-menu");
const closeButtonHamburgerMenu = document.getElementById("toggle-button-close-menu");
const navigationBarComputer = document.getElementById("navigation-bar-computer");
const mainContainer = document.getElementById("main-container");
const  navigationBarPhone = document.getElementById("navigation-bar-phone");


buttonHamburgerMenu.addEventListener("click",()=>{
    navigationBarComputer.classList.add("hidden");
    mainContainer.classList.add("hidden");
    navigationBarPhone.classList.remove("hidden");
    navigationBarPhone.classList.add("printMenuHamburger");
})

closeButtonHamburgerMenu.addEventListener("click", ()=>{
     navigationBarPhone.classList.remove("printMenuHamburger");
     navigationBarPhone.classList.add("closeMenuHamburger");
     setTimeout(closeMenu,500);
})

function closeMenu(){
    navigationBarComputer.classList.remove("hidden");
    mainContainer.classList.remove("hidden");
    navigationBarPhone.classList.add("hidden");
    navigationBarPhone.classList.remove("printMenuHamburger");
}