// Initialization of elements

const level = document.getElementById("level"); // 1 or 2 or 3
const bt_niv1 = document.getElementById("bt-niv1");
const bt_niv2 = document.getElementById("bt-niv2");
const bt_niv3 = document.getElementById("bt-niv3");

const quiz_presentation = document.getElementById("quiz-presentation"); // element encompassing the presentation elements of the quiz
const quiz = document.getElementById("quiz"); // element encompassing the whole quiz

btn_validate = document.getElementById("validate-answer"); // question validation button

const questions = document.getElementById("question"); // question display area
const answer = document.getElementById("answer"); // answer dispaly area

const score = document.getElementById("score"); // score display area

const langue = document.getElementById("language");
const la = langue.innerHTML; // JS or CSS or HTML


const qr_table = document.getElementById("qr-table"); // table of previous questions

// Event
bt_niv1.addEventListener("click", () => {
    display_quiz(1);
});

bt_niv2.addEventListener("click", () => {
    display_quiz(2);
});

bt_niv3.addEventListener("click", () => {
    display_quiz(3);
});



// Quiz management function
function display_quiz(level_nb) {

    // creation of a new validate button to delete all of these current events
    // (to fix a bug)
    const clone = btn_validate.cloneNode(true); // creation of a clone button
    btn_validate.parentNode.replaceChild(clone, btn_validate); // button replacement
    btn_validate = document.getElementById("validate-answer"); // button recovery


    // removal of the quiz presentation page and display of questions
    quiz.classList.remove("remove");
    removeTable(qr_table); // delete all rows from the table



    // highlighting of the current level button
    bt_niv1.classList.remove("btn-current-level");
    bt_niv2.classList.remove("btn-current-level");
    bt_niv3.classList.remove("btn-current-level");
    bt_niv1.classList.remove("button-choiced");
    bt_niv2.classList.remove("button-choiced");
    bt_niv3.classList.remove("button-choiced");
    if (level_nb === 1) {
        bt_niv1.classList.add("button-choiced");
        bt_niv1.classList.add("btn-current-level");
    } else if (level_nb === 2) {
        bt_niv2.classList.add("button-choiced");
        bt_niv2.classList.add("btn-current-level");
    } else if (level_nb === 3) {
        bt_niv3.classList.add("button-choiced");
        bt_niv3.classList.add("btn-current-level");
    }

    btn_validate.classList.remove("remove"); // display validation buttom


    getQR(la).then((data) => { // retrieving quiz data from json files
        let x = 0; // number of the question of the data
        let nb_current_answer = 0; // number of the current question corresponding to the level
        let right_answer = 0;
        score.innerHTML = "<p>" + right_answer + " / " + nb_current_answer + "</p>"; // display score

        // retrieving the index of the first level question == level_nb
        while((x<data.length) && (data[x].level !== level_nb)){
            x++;
        }
        display_question(data[x]); // display question and suggestions

        // Event
        btn_validate.addEventListener("click", () => {
            if(x<data.length) {
                const answers = get_answers(data[x]); // retrieving a data table containing the answers chosen by the user

                // checking the validity of the response
                if(validate_answers(answers, data[x])) {
                    right_answer++;
                }


                display_correction(answers, data[x]); // add information from the question to the table
                nb_current_answer++;
                score.innerHTML = "<p>" + right_answer + " / " + nb_current_answer + "</p>"; // score update
            }

            // retrieving the index of the next question of level == level_nb
            x++;
            while((x<data.length) && (data[x].level !== level_nb)){
                x++;
            }

            if(x<data.length) { // display next question
                display_question(data[x]);
            }else { // if the quiz is finished, display a quiz summary page
                score.innerHTML = "<p>" + right_answer + " / " + nb_current_answer + "</p>";
                btn_validate.classList.add("remove");
                questions.innerHTML = "Vous avez fini le quiz."
                answer.innerHTML = "";
                x = 0;
            }
        });
    });

}

// retrieving all the elements of each question in a table
function getQR(language) {
    return fetch('../static/json/QR-' + language + '.json').then(response => response.json());
}

// diplay question and language
function display_question(query) {
    questions.innerHTML = query.question; // display question

    // display answer
    if (query.type === "QCM") {
        let suggestion = "";
        for(let i = 0; i<query.suggestions.length; i++) {
            suggestion+= "<input class='checkboxes' type='checkbox' id='answer" + i + "' name='answer-qcm' value='" + query.suggestions[i] +"'>" + "<label for='answer" + i + "'>" + query.suggestions[i] + "</label><br>";
        }
        answer.innerHTML = "<p>Réponse :<br></p>" + suggestion;
    } else if (query.type === "VF") {
        answer.innerHTML = "<p>Réponse :<br></p>" +
            "<input type='radio' id='answer-true' name='answer-vf' value='true'>" + "<label for='answer-true'>Vrai</label><br>" +
            "<input type='radio' id='answer-false' name='answer-vf' value='false'>" + "<label for='answer-false'>Faux</label><br>";
    }
}

// retrieval of all the answers checked by the user in a table
function get_answers(query) {
    let answers = [];

    if (query.type === "QCM") {
        let checkboxes = document.getElementsByClassName("checkboxes");
        for(let i = 0; i<checkboxes.length; i++) {
            if(checkboxes[i].checked) {
                answers.push(checkboxes[i].defaultValue);
            }
        }
    } else if (query.type === "VF") {
        const radio_true = document.getElementById("answer-true");
        const radio_false = document.getElementById("answer-false");
        if (radio_true.checked) {
            answers.push("vrai");
        }
        else if (radio_false.checked) {
            answers.push("faux");
        }
    }

    return answers;
}

// returns true if the answers are correct and false otherwise
function validate_answers(answer, query) {
    if ((query.type === "QCM") && (query.answers.length !== answer.length)) {
        return false;
    }

    let validate = [];
    for(let i=0; i<answer.length; i++) {
        for(let j=0; j<query.answers.length; j++) {
            if(query.answers[j].indexOf(answer[i]) !== -1) {
                validate.push(true);
            }
        }
    }

    if(query.type === "QCM") {
        return query.answers.length <= validate.length;
    } else if(validate.length !== 0) {
        return true
    }

    return false;
}


// display correction in the table
function display_correction(answer, query){
    const qr_table = document.getElementById("qr-table");

    const firstLine = document.createElement('tr');

    const firstCell = document.createElement('td');
    firstCell.textContent = query.question;

    const secondCell = document.createElement('td');
    let aws = "";
    for(let i=0; i<answer.length; i++) {
        aws += answer[i] + "<br>";
    }
    secondCell.innerHTML = aws;

    const thirdCell = document.createElement('td');
    let correction = "";
    for(let i=0; i<query.answers.length; i++) {
        correction += query.answers[i] + "<br>";
    }
    thirdCell.innerHTML = correction;

    const fourthCell = document.createElement('td');
    fourthCell.textContent = validate_answers(answer, query);

    firstLine.appendChild(firstCell);
    firstLine.appendChild(secondCell);
    firstLine.appendChild(thirdCell);
    firstLine.appendChild(fourthCell);

    qr_table.append(firstLine);
}

// deleting all rows from a table
function removeTable(table){
    let i = 1;
    while(i < table.rows.length){
        table.deleteRow(i);
    }
}