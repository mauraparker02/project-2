//we will need to import the information for the related handlebars page 

(function () {
    // when called build the quiz 
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question function it takes in current question that comes from the array of objects thats the question number 
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button (this SHOULD be pushed to handlebars instead)
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let type1counter = 0;
        let type2counter= 0;
        let type3counter= 0;
        let type4counter= 0; 

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // Here is where we will store the data for how many times a user selects type and what type it is 
            if (userAnswer.currentQuestion === "a") {
                type1counter++;
            }
            if (userAnswer.currentQuestion === "b"){
                type2counter++;  
            }
            if (userAnswer.currentQuestion === "c"){
                type3counter++;  
            }
            if (userAnswer.currentQuestion === "d"){
                type4counter++;  
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${userAnswer} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
      },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
      },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
        },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
            },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
                },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
                        },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
                       },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
                                    },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            userSelection: 
                                                    }
                                                }
    ];

// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
}) ();

//get an array of answers and then compare those values to what you would want them to be 
    // [a,a,b,d,]
        //function that will go through that array and make a count of how many of these occur the most 
        //do the a counter ++ every time the user selects that answer 
            //when they click on response counter adds up 
            // the most clicked we will do an api call for

    //reassign array type1Breeds = a; 


    //on the front end after they complete each question: 
