/*-----------------------------------------Création de l'animation à l'ouverture de la page d'accueil---------------------------------*/
// Animation d'affichage du titre à l'arrivé sur le site

let i = 0;

const intro = document.getElementById("start-animation-container");
const body = document.getElementById("body-container");

const title = "Cheatsheet";
let lettre = ""
let y = setInterval(display_letter,180);


function display_letter() {
    lettre += title[i]
    intro.innerHTML = "<p>" + lettre + "</p>"
    i++;

    if(i >= title.length) {
        clearInterval(y);
        setTimeout(() => {
            body.classList.remove("hidden");
            intro.classList.add("hidden");
        }, 1000);

    }
}
/*--------------------------------------------Fin de l'élaboration de l'animation---------------------------------------------------------*/

/*Elaboration du Caroussel de la page d'accueil */
const carousselElement = document.getElementsByClassName("caroussel-item");
let currentElement = 0;
const nextButton = document.getElementById("button-next");
const previousButton = document.getElementById("button-previous");

function loadNewElement(){
    console.log(currentElement);
    for(const element of carousselElement){
        element.classList.remove("caroussel-item-visible");
        element.classList.add("caroussel-item-hidden");
    }
    carousselElement[currentElement].classList.remove("caroussel-item-hidden");
    carousselElement[currentElement].classList.add("caroussel-item-visible");
}

function nextSlide(){

    currentElement+=1;
    if(currentElement >= carousselElement.length){
        currentElement = 0;
    }
    loadNewElement();
}

function previousSlide(){
    currentElement -=1;
    if(currentElement < 0){
        currentElement = carousselElement.length -1;
    }
    loadNewElement();
}

nextButton.addEventListener("click",()=>{
    nextSlide();
})

previousButton.addEventListener("click", ()=>{
    previousSlide();
})

/* Fin de l'élaboration du Caroussel */
