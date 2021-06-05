
/*--------------------------------------------Récupération des éléments dont on doit changer la couleur--------------------*/
const buttonCheckDarkMode = document.getElementById("container-ball-dark-mode");
const navigationBarComputerQuiz = document.getElementById("navigation-bar-computer");
const textSelector = document.getElementsByClassName("text-selector");
const ballDarkMode = document.getElementById("ball-dark-mode");
/*----------------------------------------------Fin de la récuparation des éléments----------------------------------------*/
buttonCheckDarkMode.addEventListener("click", ()=>{

    ballDarkMode.classList.toggle("change-place-ball");
    document.body.classList.toggle("color-dark-mode");

    navigationBarComputerQuiz.classList.toggle("color-navigation-bar-clear-mode");
    navigationBarComputerQuiz.classList.toggle("color-navigation-bar-dark-mode");

    for(let i = 0;i<textSelector.length;i++){
        textSelector[i].classList.toggle("color-text-clear-mode");
        textSelector[i].classList.toggle("color-text-dark-mode");
    }
})