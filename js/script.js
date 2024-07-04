//sélectionner tous les éléments nécessaires
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const audio = new Audio();
audio.src = "resFormula 1 sound effects.mp3";
// si le button start est appuyé on lance un audio dans le fond et on affiche les regles de quiz
start_btn.onclick = ()=>{
    audio.play();
    info_box.classList.add("activeInfo"); //show info box
}

// si le button exit est appuyé on revien a la page d'acceuil
exit_btn.onclick = ()=>{
    window.location.href="../index.html"; 
}

// si on clique sur le button GO on enleve la fenetre des regles et on affiche la fenetre de quiz
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //appeler la fonction showQuestions()
    queCounter(1); //donner un parametre a la fonction quecounter()
    startTimer(15); //appeler la fonction startTimer qui démarre le Chrono de 15 secondes
    startTimerLine(0); // appeler la fonction startTimeLine() pour afficher l'etat d'avancement de temps
}

let timeValue =  15;
let quest_count = 0;
let num_quest = 1;
let Res = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// quand on clique sur le button restart on ferme la fenetre des resultats et on réaffiche les questions de quiz
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    quest_count = 0;
    num_quest = 1;
    Res = 0;
    widthValue = 0;
    showQuetions(quest_count); //appeler la fonction showQuestions()
    queCounter(num_quest); //donner num_quest comme parametre a la fonction quecounter()
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //appeler la fonction startTimer
    startTimerLine(widthValue); //appeler la fonction startTimeLine() 
    timeText.textContent = "Temps restant"; //changer le texte a Temps restant
    next_btn.classList.remove("show"); //cacher le button next
}

// si on clique sur le button quit on revient a la page d'acceuil
quit_quiz.onclick = ()=>{
    window.location.href="../index.html"; 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// si le button Next est appuyé 
next_btn.onclick = ()=>{
    if(quest_count < questions.length - 1){ //on teste si le nombre de question est inferieur au nombre total de question dans le ficher question.js
        quest_count++; //incrementer le nombre de question
        num_quest++; //incrementer le numero de la question
        showQuetions(quest_count); 
        queCounter(num_quest); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue);
        startTimerLine(widthValue); 
        timeText.textContent = "Temps restant"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //appeler la fonction showResult 
    }
}

// getting questions and options from arra
//récuperer les questions et les options ap partir de tableau de fichier  question.js
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //on cree la fentere qui contient une question et les options de cette question
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //inserer la question dans le fichier html 
    option_list.innerHTML = option_tag; //inserer les options de la question
    
    const option = option_list.querySelectorAll(".option");

    // définir l'attribut onclick sur toutes les options disponibles
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");//appeler la fonction optionSelected()
    }
}
// creating the new div tags which for icons
//déclarer les icons qui vont etre afficher si la reponse est juste ou fausse
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//vérifier la reponse choisi 
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //récuperer l'option choisit par l'utilisateur
    let correcAns = questions[quest_count].answer; //récupération de la réponse juste depuis le tableau de fichier question.js
    const allOptions = option_list.children.length; //récuperer toutes les options
    
    if(userAns == correcAns){ //si la réponse de l'utilisateur correspond a la bonne reponse de tableau
        Res += 1; //on incrémente le résultat
        answer.classList.add("correct");//ajouter la couleur verte a l'option juste choisit
        answer.insertAdjacentHTML("beforeend", tickIconTag); //ajouter l'icon de la reponse juste "tickIconeTag"
        console.log("Correct Answer");
        console.log("Your correct answers = " + Res);
    }else{
        answer.classList.add("incorrect"); //ajouter la couleur rouge a l'option fausse choisit
        answer.insertAdjacentHTML("beforeend", crossIconTag); //ajouter l'icon de la reponse fausse "crossIconTag"
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //on verifie si la réponse juste correspond au options de tableau aprés l'écoulement de temps
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //une fois l'utilisateur choisi une option les autres vont etre grisés
    }
    next_btn.classList.add("show"); //afficher le button next si l'utilisateur a choisi une option
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (Res > (questions.length/2)){ // si le résultat obtenu par l'utilisateur > au moyen de nombre de question on le félicite
        let scoreTag = '<span>BRAVO! , vous avez obtenu '+ Res +' / '+ questions.length +'</span>';
        scoreText.innerHTML = scoreTag;  //ajouter le score finale dans la page html
    }
    else if(Res > 1){ // si le résultat obtenu par l'utilisateur > 1 
        let scoreTag = '<span>Vous avez obtenu '+ Res +' / '+ questions.length +' </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // si le résultat obtenu par l'utilisateur <1 --> echec
        let scoreTag = '<span> TRY AGAIN !!';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ //si le timere est <9 alors on ajoute un 0 pour on peut afficher 09,08,07....etc
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time écoulé"; //changer le text a temps ecoulé
            const allOptions = option_list.children.length; //récuperer toutes les options
            let correcAns = questions[quest_count].answer; //récuperer la reponse correcte depuis le tableau de question.js
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px";
        if(time > 549){ 
            clearInterval(counterLine);
        }
    }
}

//fonction pour afficher la numéro de la question dans le footer de quiz box
function queCounter(index){
    let totalQueCounTag = 'Question N° : '+index+'/'+questions.length;
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}