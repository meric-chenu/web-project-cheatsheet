const carousselItem = document.getElementsByClassName("caroussel-item");
const buttonNext = document.getElementById("button-next");
const buttonPrevious = document.getElementById("button-previous");
const buttonCheckDarkMode = document.getElementById("container-ball-dark-mode");
const ballDarkMode = document.getElementById("ball-dark-mode");
let currentPosition = 0;


function refreshCaroussel(){
    for(let position = 0;position < carousselItem.length;position++){
        carousselItem[position].classList.add("hidden");
    }
    carousselItem[currentPosition].classList.remove("hidden");
}


function nextSlide(){
    if(currentPosition == carousselItem.length -1){
        currentPosition = 0;
    }
    else{
        currentPosition = currentPosition + 1;
    }
    refreshCaroussel();
}

function previousSlide(){
    if(currentPosition == 0){
        currentPosition = carousselItem.length-1;
    }
    else{
        currentPosition = currentPosition-1;
    }
    refreshCaroussel();
}

buttonNext.addEventListener("click", ()=>{
    nextSlide();
})
buttonPrevious.addEventListener("click", ()=>{
    previousSlide();
})

/*------------------------------------------------------------Dark mode----------------------------------------------------------*/
           /*-----------------Recuperation de tous les éléments dont on doit changer la couleur-----------------------------*/
const navigationBarComputerTools = document.getElementById("navigation-bar-computer");
const firstContainer = document.getElementById("first-container-with-caroussel");
const mainContainerTools = document.getElementById("main-container");
const blockPicAlgo = document.getElementById("block-pic-algo");
const containerPicBot = document.getElementById("container-pic-bot");
const containerBlockMdn = document.getElementById("container-block-mdn");
const containerInformationW3C = document.getElementById("container-information-W3C");
const toolsClearMode = document.getElementById("image-outil-clear-mode");
const toolsDarkMode = document.getElementById("image-outil-dark-mode");
const textSelector = document.getElementsByClassName("text-selector");
const W3CclearMode = document.getElementById("W3C-logo-clear-mode");
const W3CdarkMode = document.getElementById("W3C-logo-dark-mode");
const textGrey = document.getElementsByClassName("color-text-grey");
           /*--------------------------------------Fin de la récupération---------------------------------------------------*/
/*On peut appliquer l'évènement change puisque l'on est sur un checkbox*/
buttonCheckDarkMode.addEventListener("click", () => {
    ballDarkMode.classList.toggle("change-place-ball");
    navigationBarComputerTools.classList.toggle("color-navigation-bar-clear-mode");
    navigationBarComputerTools.classList.toggle("color-navigation-bar-dark-mode");

    firstContainer.classList.toggle("color-first-container-with-caroussel-clear-mode");
    firstContainer.classList.toggle("color-first-container-with-caroussel-dark-mode");

    for(let i = 0;i<carousselItem.length;i++){
        carousselItem[i].classList.toggle("color-caroussel-item-clear-mode");
        carousselItem[i].classList.toggle("color-caroussel-item-dark-mode");
    }
    for(let i = 0;i<textSelector.length;i++){
        textSelector[i].classList.toggle("color-text-clear-mode");
        textSelector[i].classList.toggle("color-text-black-mode");

    }
    mainContainerTools.classList.toggle("color-main-container-clear-mode");
    mainContainerTools.classList.toggle("color-main-container-dark-mode");

    document.body.classList.toggle("color-body-dark-mode");

    blockPicAlgo.classList.toggle("color-block-pic-algo-clear-mode");
    blockPicAlgo.classList.toggle("color-block-pic-algo-dark-mode");

    containerPicBot.classList.toggle("color-container-pic-bot-clear-mode");
    containerPicBot.classList.toggle("color-container-pic-bot-dark-mode");

    containerBlockMdn.classList.toggle("color-container-block-mdn-clear-mode");
    containerBlockMdn.classList.toggle("color-container-block-mdn-dark-mode");

    containerInformationW3C.classList.toggle("color-container-information-W3C-clear-mode");
    containerInformationW3C.classList.toggle("color-container-information-W3C-dark-mode");

    toolsClearMode.classList.toggle("hidden");
    toolsDarkMode.classList.toggle("hidden");

    for(let i = 0;i<textGrey.length;i++){
        textGrey[i].classList.toggle("color-text-grey-clear-mode");
        textGrey[i].classList.toggle("color-text-grey-dark-mode");
    }
    W3CclearMode.classList.toggle("hidden");
    W3CdarkMode.classList.toggle("hidden");
})