const quizQuestions = [
    {
        question: "What is the output of the expression 5 + 3 * 2?",
        options: ["11", "16", "13", "10"],
        correctAnswer: "11"
    },
    {
        question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        correctAnswer: "Stack"
    },
    {
        question: "What is the purpose of the break statement in a loop?",
        options: ["To exit the loop", "To skip to the next iteration", "To repeat the current iteration", "To do nothing"],
        correctAnswer: "To exit the loop"
    },
    {
        question: "What is the difference between null and undefined in JavaScript?",
        options: [
            "null is an object, while undefined is a primitive value",
            "null is a primitive value, while undefined is an object",
            "null and undefined are the same",
            "null is used for objects, while undefined is used for variables"
        ],
        correctAnswer: "null is an object, while undefined is a primitive value"
    },
    {
        question: "What is the time complexity of the Bubble Sort algorithm?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"],
        correctAnswer: "O(n^2)"
    },
    {
        question: "Which programming paradigm emphasizes the use of pure functions and immutable data?",
        options: ["Object-Oriented Programming", "Functional Programming", "Imperative Programming", "Declarative Programming"],
        correctAnswer: "Functional Programming"
    },
    {
        question: "What is the purpose of the this keyword in JavaScript?",
        options: ["To refer to the global object", "To refer to the current object", "To create a new object", "To delete an object"],
        correctAnswer: "To refer to the current object"
    },
    {
        question: "Which data type is used to represent a sequence of characters in most programming languages?",
        options: ["String", "Array", "List", "Integer"],
        correctAnswer: "String"
    },
    {
        question: "What is the difference between a for loop and a while loop?",
        options: [
            "A for loop is used for arrays, while a while loop is used for objects",
            "A for loop is used for iterating over a sequence, while a while loop is used for conditional repetition",
            "A for loop is faster than a while loop",
            "A while loop is faster than a for loop"
        ],
        correctAnswer: "A for loop is used for iterating over a sequence, while a while loop is used for conditional repetition"
    },
    {
        question: "What is the purpose of the try-catch block in exception handling?",
        options: ["To throw an exception", "To catch and handle an exception", "To ignore an exception", "To create a new exception"],
        correctAnswer: "To catch and handle an exception"
    },
    {
        question: "Which algorithm is used for finding the shortest path in a graph?",
        options: ["Dijkstra's algorithm", "Bellman-Ford algorithm", "Floyd-Warshall algorithm", "Topological sort"],
        correctAnswer: "Dijkstra's algorithm"
    },
    {
        question: "What is the difference between a static method and an instance method?",
        options: [
            "A static method is called on an instance, while an instance method is called on a class",
            "A static method is called on a class, while an instance method is called on an instance",
            "A static method is faster than an instance method",
            "An instance method is faster than a static method"
        ],
        correctAnswer: "A static method is called on a class, while an instance method is called on an instance"
    },
    {
        question: "What is the purpose of the Map data structure?",
        options: ["To store key-value pairs", "To store a collection of unique values", "To store a sequence of values", "To store a graph"],
        correctAnswer: "To store key-value pairs"
    },
    {
        question: "Which programming language is known for its use of indentation to define block-level structure?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correctAnswer: "Python"
    },
    {
        question: "What is the time complexity of the Binary Search algorithm?",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(2^n)"],
        correctAnswer: "O(log n)"
    }
];

// DOM Elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const scoreSpan = document.getElementById("score");
const totalQuestionsSpan = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");
const questionNumberElement = document.getElementById("question-number");
const liveScoreElement = document.getElementById("live-score");
const progressFill = document.getElementById("progress-fill");

// ✅ Homepage Elements
const homeSection = document.getElementById("home");
const startButton = document.getElementById("start-btn");
const totalCount = document.getElementById("total-count");
totalCount.innerText = quizQuestions.length;

startButton.addEventListener("click", () => {
    homeSection.style.display = "none";
    document.querySelector(".status-bar").style.display = "block";
    startQuiz();
});

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizSection.style.display = "block";
    resultSection.style.display = "none";
    nextButton.innerText = "Next";
    nextButton.style.display = "none";
    liveScoreElement.innerText = `Score: 0`;
    loadQuestion();
}

function loadQuestion() {
    resetState();

    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    progressFill.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    feedbackElement.innerText = "";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    answerSelected = false;
}

function selectAnswer(e) {
    if (answerSelected) return;
    answerSelected = true;

    const selectedBtn = e.target;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedBtn.innerText === currentQuestion.correctAnswer;

    if (isCorrect) {
        score++;
        feedbackElement.innerText = "Correct!";
        selectedBtn.classList.add("correct");
        liveScoreElement.innerText = `Score: ${score}`;
    } else {
        feedbackElement.innerText = `Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`;
        selectedBtn.classList.add("incorrect");
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.innerText === currentQuestion.correctAnswer) {
                button.classList.add("correct");
            }
        });
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";

    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextButton.innerText = "Show Results";
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizSection.style.display = "none";
    resultSection.style.display = "block";
    scoreSpan.innerText = score;
    totalQuestionsSpan.innerText = quizQuestions.length;
    progressFill.style.width = "100%";
    liveScoreElement.innerText = `Score: ${score}`;
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

restartButton.addEventListener("click", startQuiz);
