const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ],
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false}
        ],
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Auntarctica", correct: true}
        ],
    },
    {
        question: "Which is the smallest continent  in the world?",
        answers: [
            {text: "Ausia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ],
    }
]

const remarks =[
    {scr: 0, remark: "Better Luck next time!"},
    {scr: 1, remark:"Can do Better!"},
    {scr: 2, remark: "Good.Keep Going!"},
    {scr: 3,  remark: "Nice Score"},
    {scr: 4,  remark: "Wohoo!Excellent!"},
]

let questionButton = document.getElementById("question");
let answerButton = document.getElementById("answers-buttons");
let nextButton = document.getElementById("next-btn");
let quizz = document.querySelector(".quiz");
let h5 = document.querySelector("h5");



let currentQuestionIndex = 0 ;
let Pos_score = 0 ;
let Neg_score = 0 ; 
let totalScore =0 ;

function startquiz(){
    currentQuestionIndex = 0 ;
    Pos_score = 0 ;
    Neg_score = 0 ; 
    totalScore = 0 ;
    nextButton.innerHTML="Next";

    showquestion();
}


function showquestion(){
    resetState();

    let currentquestion = questions[currentQuestionIndex];
    let questionno = currentQuestionIndex + 1;
    
    questionButton.innerHTML = questionno + ". " + currentquestion.question;
    
    currentquestion.answers.forEach(answer => {
        
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct)
        button.dataset.correct = answer.correct;
        
        button.addEventListener("click", selectedAns);
});
    
}

function handleNextBtn(){
   currentQuestionIndex++;

   if(currentQuestionIndex < questions.length)
    showquestion();
    else
    showscore();
}

function showscore(){
       resetState();

       questionButton.innerHTML = `Your Score is ${Pos_score + Neg_score}/${questions.length}<br>`;
       questionButton.innerHTML += `Positive Score = ${Pos_score}<br>`;
    // questionButton.innerHTML += document.createElement("br");
       questionButton.innerHTML += `Negative Score = ${Neg_score}<br>`;
       
    //    questionButton.style.fontSize= "15px";
    //    questionButton.style.fontWeight="600";
    //    questionButton.style.textAlign = "center";

    // Object.assign(questionButton.style, {
    //     fontSize: "15px",
    //     fontWeight: "600",
    //     textAlign: "center"
    // });

       questionButton.classList.add("scoree");
       questionButton.removeAttribute("id");

       nextButton.style.display = "block";
       nextButton.innerHTML = "Play Again !";

    //    let h5 = document.createElement("h5");
    //    h5.classList.add("review");
    //    let quizz = document.querySelector(".quiz");
    //    quizz.appendChild(h5);
       h5.style.display="block";
       
       remarks.forEach(remarkk =>{
              if(Pos_score + Neg_score >=0){
        if(Pos_score + Neg_score == remarkk.scr)
            h5.innerHTML = remarkk.remark;
               }
               else
               h5.innerHTML = "Negative Score ! Failed";
       })

       // Display party bomb animation if score is 4
        totalScore = Pos_score + Neg_score;
    if (totalScore === 4) {
        quizz.classList.add("confetti-button");
        confetti();
    } 

}

function selectedAns(e){

    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === 'true';
    
    if(isCorrect){
        selectedbtn.classList.add("correct");
        Pos_score++;
    }else{
    selectedbtn.classList.add("incorrect");
        Neg_score--;
    }

    Array.from(answerButton.children).forEach(button => {

        if(button.dataset.correct === 'true')
            button.classList.add("correct");

            button.disabled = true;
    });

    nextButton.style.display = "block";

    
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length)
        handleNextBtn();
    else
    startquiz();
})

function resetState(){
     nextButton.style.display= "none";
     while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
     }
        questionButton.classList.remove("scoree");
        questionButton.id="question";
        // quizz.removeChild(h5);
        // h5.hidden;
        h5.style.display="none";
        quizz.classList.remove("confetti-button");
}

startquiz();

