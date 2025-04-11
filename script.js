// --- DOM Elements ---
const setupScreen = document.getElementById("setup-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const historyScreen = document.getElementById("history-screen");
const reviewScreen = document.getElementById("review-screen"); // Added Review Screen

const topicSelect = document.getElementById("topic");
const difficultySelect = document.getElementById("difficulty");
const numQuestionsSelect = document.getElementById("num-questions");
const startQuizBtn = document.getElementById("start-quiz-btn");
const setupError = document.getElementById("setup-error");

const progressText = document.getElementById("progress-info");
const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score");
const streakText = document.getElementById("streak");
const timerText = document.getElementById("time");
const questionText = document.getElementById("question-text");
const answerOptionsDiv = document.getElementById("answer-options");
const feedbackDiv = document.getElementById("feedback");

const finalScoreText = document.getElementById("final-score");
const totalQuestionsText = document.getElementById("total-questions");
const correctAnswersText = document.getElementById("correct-answers");
const accuracyText = document.getElementById("accuracy");
const timeTakenText = document.getElementById("time-taken");
const highestStreakText = document.getElementById("highest-streak");
const resultTopicText = document.getElementById("result-topic");
const resultDifficultyText = document.getElementById("result-difficulty");
const resultFeedbackDiv = document.getElementById("result-feedback");
const reattemptBtn = document.getElementById("reattempt-btn");
const newQuizBtn = document.getElementById("new-quiz-btn");
const viewHistoryResultsBtn = document.getElementById(
  "view-history-results-btn"
);
const reviewAnswersBtn = document.getElementById("review-answers-btn"); // Added Review Button

const viewHistoryBtn = document.getElementById("view-history-btn"); // Button on setup screen
const historyListDiv = document.getElementById("history-list");
const backToSetupBtn = document.getElementById("back-to-setup-btn");
const clearHistoryBtn = document.getElementById("clear-history-btn");

const reviewDetailsDiv = document.getElementById("review-details"); // Added Review Details Div
const backToResultsBtn = document.getElementById("back-to-results-btn"); // Added Back to Results Button

// --- Quiz State ---
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let currentStreak = 0;
let highestStreak = 0;
let timerInterval = null;
let timeLeft = 0;
let quizStartTime = 0;
let quizEndTime = 0;
let selectedTopic = "";
let selectedDifficulty = "";
let totalQuizTime = 0;
let quizReviewData = []; // To store detailed results for review

// --- Question Bank (Ensure keys match HTML values, add 'logic') ---
const questions = {
  math: {
    easy: [
      {
        question: "What is 15% of 60?",
        options: ["6", "9", "12", "15"],
        answer: "9",
        logic:
          "15% is the same as 15/100 or 0.15. Multiply 0.15 by 60 to get 9.",
      },
      {
        question: "If a train travels 120km in 2 hours, what is its speed?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        answer: "60 km/h",
        logic: "Speed = Distance / Time. Speed = 120 km / 2 hours = 60 km/h.",
      },
      {
        question: "Solve for x: x / 4 = 5",
        options: ["1", "9", "20", "24"],
        answer: "20",
        logic:
          "To isolate x, multiply both sides of the equation by 4. (x/4) * 4 = 5 * 4, which simplifies to x = 20.",
      },
      {
        question: "What is the area of a square with side length 6?",
        options: ["12", "24", "30", "36"],
        answer: "36",
        logic:
          "The area of a square is calculated by side length multiplied by side length (side²). So, 6 * 6 = 36.",
      },
      {
        question: "Simplify the ratio 18:27",
        options: ["2:3", "3:4", "1:2", "9:13"],
        answer: "2:3",
        logic:
          "Find the greatest common divisor (GCD) of 18 and 27, which is 9. Divide both numbers by the GCD: 18/9 = 2 and 27/9 = 3. The simplified ratio is 2:3.",
      },
    ],
    medium: [
      {
        question:
          "A jacket costs $80 after a 20% discount. What was the original price?",
        options: ["$96", "$100", "$110", "$120"],
        answer: "$100",
        logic:
          "If there was a 20% discount, the final price ($80) represents 80% (100% - 20%) of the original price. Let 'P' be the original price. 0.80 * P = $80. Solve for P: P = $80 / 0.80 = $100.",
      },
      {
        question: "If 5 apples cost $3.50, how much do 12 apples cost?",
        options: ["$7.00", "$8.40", "$9.10", "$7.70"],
        answer: "$8.40",
        logic:
          "First find the cost of one apple: $3.50 / 5 = $0.70. Then multiply the cost per apple by 12: $0.70 * 12 = $8.40.",
      },
      {
        question: "What is the value of 3³ - 2²?",
        options: ["1", "5", "19", "23"],
        answer: "23",
        logic:
          "Calculate the powers first: 3³ (3*3*3) = 27 and 2² (2*2) = 4. Then subtract: 27 - 4 = 23.",
      },
      {
        question: "Find the average of 15, 25, 30, 10",
        options: ["18", "20", "22", "25"],
        answer: "20",
        logic:
          "To find the average, sum the numbers (15 + 25 + 30 + 10 = 80) and divide by the count of numbers (4). 80 / 4 = 20.",
      },
      {
        question: "If angle A and B are complementary, and A = 40°, what is B?",
        options: ["40°", "50°", "90°", "140°"],
        answer: "50°",
        logic:
          "Complementary angles add up to 90°. So, B = 90° - A = 90° - 40° = 50°.",
      },
    ],
    hard: [
      {
        question:
          "A car's value depreciates by 15% per year. If it costs $20,000 new, what's its value after 2 years?",
        options: ["$14450", "$17000", "$13600", "$14000"],
        answer: "$14450",
        logic:
          "After 1 year, value is $20000 * (1 - 0.15) = $17000. After 2 years, value is $17000 * (1 - 0.15) = $14450. Alternatively, $20000 * (0.85)² = $14450.",
      },
      {
        question:
          "Work done by A in 1 day is 1/10, by B is 1/15. How many days working together?",
        options: ["4", "5", "6", "7"],
        answer: "6",
        logic:
          "Their combined work rate per day is (1/10) + (1/15) = (3/30) + (2/30) = 5/30 = 1/6 of the job per day. The time taken together is the reciprocal of the combined rate: 1 / (1/6) = 6 days.",
      },
      {
        question: "Find the compound interest on $5000 for 2 years at 10% p.a.",
        options: ["$1000", "$1050", "$1100", "$1150"],
        answer: "$1050",
        logic:
          "Formula: A = P(1 + r/n)^(nt). Here, A = 5000(1 + 0.10/1)^(1*2) = 5000(1.1)² = 5000 * 1.21 = $6050. Compound Interest = A - P = $6050 - $5000 = $1050.",
      },
      {
        question:
          "What is the probability of rolling two dice and getting a sum of 7?",
        options: ["1/6", "1/12", "1/36", "7/36"],
        answer: "1/6",
        logic:
          "There are 36 possible outcomes (6x6). The combinations that sum to 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). There are 6 favorable outcomes. Probability = Favorable / Total = 6/36 = 1/6.",
      },
      {
        question: "Solve: (2/3)x + 5 = 11",
        options: ["6", "7", "8", "9"],
        answer: "9",
        logic:
          "Subtract 5 from both sides: (2/3)x = 11 - 5 = 6. Multiply both sides by 3/2 (the reciprocal of 2/3) to isolate x: x = 6 * (3/2) = 18/2 = 9.",
      },
    ],
  },
  english: {
    easy: [
      {
        question: "Choose the correct spelling:",
        options: ["Believe", "Beleive", "Believ", "Beleave"],
        answer: "Believe",
        logic:
          "A common mnemonic is 'i before e, except after c, or when sounded as 'a' as in neighbor and weigh'. Here, 'ie' follows 'l'.",
      },
      {
        question: "What is the past tense of 'eat'?",
        options: ["Eated", "Ate", "Eaten", "Eat"],
        answer: "Ate",
        logic:
          "'Eat' is an irregular verb. Its simple past tense is 'ate', and the past participle is 'eaten'.",
      },
      {
        question: "Identify the verb: 'The dog barked loudly.'",
        options: ["dog", "barked", "loudly", "The"],
        answer: "barked",
        logic:
          "A verb expresses an action or state of being. 'Barked' is the action the dog performed.",
      },
      {
        question: "Which is NOT a preposition?",
        options: ["under", "quickly", "behind", "across"],
        answer: "quickly",
        logic:
          "Prepositions (like under, behind, across) show relationships between nouns/pronouns and other words. 'Quickly' is an adverb, modifying how an action is done.",
      },
      {
        question: "Complete: She is ___ than her brother.",
        options: ["tall", "taller", "tallest", "more tall"],
        answer: "taller",
        logic:
          "For comparative adjectives (comparing two things), add '-er' to short adjectives (like tall -> taller). Use 'more' for longer adjectives.",
      },
    ],
    medium: [
      {
        question: "What is a synonym for 'begin'?",
        options: ["End", "Finish", "Start", "Stop"],
        answer: "Start",
        logic:
          "Synonyms are words with similar meanings. 'Start' is the most common synonym for 'begin'.",
      },
      {
        question: "Identify the adjective: 'She wore a beautiful dress.'",
        options: ["She", "wore", "beautiful", "dress"],
        answer: "beautiful",
        logic:
          "Adjectives describe nouns. 'Beautiful' describes the noun 'dress'.",
      },
      {
        question: "Which sentence uses 'their' correctly?",
        options: [
          "They're going to the park.",
          "The dog wagged it's tail.",
          "Their house is blue.",
          "There are many books.",
        ],
        answer: "Their house is blue.",
        logic:
          "'Their' is possessive (belongs to them). 'They're' is a contraction of 'they are'. 'There' indicates a place or existence.",
      },
    ],
    hard: [
      {
        question:
          "Identify the figure of speech: 'Time flies when you are having fun.'",
        options: ["Metaphor", "Simile", "Personification", "Idiom"],
        answer: "Idiom",
        logic:
          "This is an idiom, a common expression whose meaning isn't deducible from the literal words. Time doesn't literally fly.",
      },
      {
        question: "What is an antonym for 'verbose'?",
        options: ["Talkative", "Wordy", "Concise", "Lengthy"],
        answer: "Concise",
        logic:
          "Antonyms have opposite meanings. 'Verbose' means using more words than needed. 'Concise' means brief but comprehensive.",
      },
      {
        question:
          "Choose the correct word: 'The effects of the storm were ___.'",
        options: ["devastating", "devistating", "devastateing", "devestating"],
        answer: "devastating",
        logic: "Ensure correct spelling based on the root word 'devastate'.",
      },
    ],
  },
  general: {
    easy: [
      {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo",
        logic: "Tokyo is the capital and largest city of Japan.",
      },
      {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        answer: "7",
        logic:
          "The most widely accepted model lists seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia/Oceania.",
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide",
        logic:
          "Plants use Carbon Dioxide (CO2), water, and sunlight during photosynthesis to create energy (sugar) and release Oxygen.",
      },
    ],
    medium: [
      {
        question: "Which planet is closest to the sun?",
        options: ["Venus", "Mars", "Mercury", "Earth"],
        answer: "Mercury",
        logic: "Mercury is the innermost planet in our Solar System.",
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific",
        logic:
          "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions.",
      },
      {
        question: "Who invented the light bulb?",
        options: [
          "Nikola Tesla",
          "Benjamin Franklin",
          "Thomas Edison",
          "Alexander Graham Bell",
        ],
        answer: "Thomas Edison",
        logic:
          "While others worked on incandescent lighting, Thomas Edison is credited with developing the first commercially practical incandescent light bulb.",
      },
    ],
    hard: [
      {
        question: "Who wrote 'Hamlet'?",
        options: [
          "Charles Dickens",
          "Jane Austen",
          "William Shakespeare",
          "Leo Tolstoy",
        ],
        answer: "William Shakespeare",
        logic:
          "'Hamlet' is one of William Shakespeare's most famous tragedies, believed to have been written between 1599 and 1601.",
      },
      {
        question: "In which country would you find the Great Pyramid of Giza?",
        options: ["Greece", "Mexico", "Egypt", "Peru"],
        answer: "Egypt",
        logic:
          "The Great Pyramid is located on the Giza Plateau on the outskirts of Cairo, Egypt.",
      },
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Ag", "Au", "Gd"],
        answer: "Au",
        logic:
          "The chemical symbol 'Au' for Gold comes from its Latin name, 'Aurum'.",
      },
    ],
  },
  logic: {
    easy: [
      {
        question: "Find the next number: 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        answer: "10",
        logic:
          "This is a simple arithmetic sequence where 2 is added to each number to get the next one (2+2=4, 4+2=6, 6+2=8, 8+2=10).",
      },
      {
        question: "Find the next number: 5, 10, 15, 20, ?",
        options: ["25", "30", "35", "40"],
        answer: "25",
        logic:
          "This sequence increases by adding 5 to each term (5+5=10, 10+5=15, 15+5=20, 20+5=25).",
      },
      {
        question: "Find the next letter: A, C, E, G, ?",
        options: ["H", "I", "J", "K"],
        answer: "I",
        logic:
          "This sequence skips one letter of the alphabet each time (A, skip B, C, skip D, E, skip F, G, skip H, I).",
      },
      {
        question: "Book is to Reading as Fork is to:",
        options: ["Drawing", "Writing", "Eating", "Sleeping"],
        answer: "Eating",
        logic:
          "This is an analogy of tool to function. A book is used for reading, and a fork is used for eating.",
      },
      {
        question:
          "Which shape comes next in the pattern: Square, Circle, Square, Circle, ?",
        options: ["Triangle", "Square", "Circle", "Rectangle"],
        answer: "Square",
        logic:
          "The pattern simply alternates between a Square and a Circle. The last shape was a Circle, so the next is a Square.",
      },
    ],
    medium: [
      {
        question: "Find the next number: 3, 6, 12, 24, ?",
        options: ["30", "36", "48", "60"],
        answer: "48",
        logic:
          "This is a geometric sequence where each number is multiplied by 2 to get the next (3*2=6, 6*2=12, 12*2=24, 24*2=48).",
      },
      {
        question: "Find the next number: 1, 4, 9, 16, ?",
        options: ["20", "25", "30", "36"],
        answer: "25",
        logic:
          "This sequence consists of perfect squares: 1²=1, 2²=4, 3²=9, 4²=16. The next number is 5²=25.",
      },
      {
        question: "Find the next number: 36, 34, 30, 28, 24, ?",
        options: ["20", "22", "26", "18"],
        answer: "22",
        logic:
          "The pattern of subtraction alternates: -2, -4, -2, -4. So, the next step is 24 - 2 = 22.",
      },
      {
        question: "Find the odd one out: Apple, Banana, Orange, Potato",
        options: ["Apple", "Banana", "Orange", "Potato"],
        answer: "Potato",
        logic:
          "Apple, Banana, and Orange are fruits. Potato is a vegetable (specifically, a tuber).",
      },
      {
        question: "Find the next number: 2, 5, 10, 17, ?",
        options: ["24", "25", "26", "28"],
        answer: "26",
        logic:
          "The pattern is n²+1, starting with n=1: 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17. The next number is 5²+1=26.",
      },
    ],
    hard: [
      {
        question: "Find the next number: 7, 10, 8, 11, 9, 12, ?",
        options: ["7", "10", "13", "14"],
        answer: "10",
        logic:
          "This sequence interleaves two separate sequences: Sequence 1 (starts at 7, adds 1): 7, 8, 9, ... The next number is 10. Sequence 2 (starts at 10, adds 1): 10, 11, 12,... The overall pattern requires the next number from Sequence 1.",
      },
      {
        question: "Find the next number: 1, 1, 2, 3, 5, 8, ?",
        options: ["11", "12", "13", "15"],
        answer: "13",
        logic:
          "This is the Fibonacci sequence, where each number is the sum of the two preceding ones (1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13).",
      },
      {
        question: "Find the next number: 4, 7, 12, 19, 28, ?",
        options: ["39", "41", "36", "44"],
        answer: "39",
        logic:
          "The difference between consecutive numbers increases by 2 each time: +3, +5, +7, +9. The next difference is +11. So, 28 + 11 = 39.",
      },
      {
        question: "Find the next letters: AZ, BY, CX, ?",
        options: ["DW", "DU", "EV", "DX"],
        answer: "DW",
        logic:
          "The first letter in each pair moves forward through the alphabet (A, B, C, D...). The second letter moves backward (Z, Y, X, W...).",
      },
      {
        question: "Find the missing number: 12, 25, 49, 99, 197, ?",
        options: ["395", "393", "389", "401"],
        answer: "395",
        logic:
          "The pattern is approximately doubling, with a slight adjustment. Method 1: (x*2)+1, (x*2)-1 alternating. 12*2+1=25, 25*2-1=49, 49*2+1=99, 99*2-1=197. Next is 197*2+1 = 394+1=395.",
      },
    ],
  },
};

// --- Utility Functions ---
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function switchScreen(activeScreen) {
  console.log(
    "Attempting to switch screen to:",
    activeScreen ? activeScreen.id : "undefined"
  ); // DEBUG
  if (!activeScreen) {
    console.error("ERROR: switchScreen called with null or undefined screen!");
    return;
  }
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  activeScreen.classList.add("active");
  console.log("Activated screen:", activeScreen.id); // DEBUG
}

// --- Core Quiz Logic ---
function startQuiz() {
  console.log("DEBUG: startQuiz function initiated.");
  setupError.textContent = "";
  setupError.style.display = "none";

  // --- Clear Review Data ---
  quizReviewData = [];
  // --- End Clear ---

  selectedTopic = topicSelect.value;
  selectedDifficulty = difficultySelect.value;
  const numQuestionsValue = numQuestionsSelect.value;

  console.log("DEBUG: Selected Topic:", selectedTopic);
  console.log("DEBUG: Selected Difficulty:", selectedDifficulty);

  const topicExists = questions[selectedTopic];
  const difficultyExists =
    topicExists && questions[selectedTopic][selectedDifficulty];
  const questionsAvailable =
    difficultyExists && questions[selectedTopic][selectedDifficulty].length > 0; // Check difficulty array exists and has items

  if (!topicExists || !difficultyExists || !questionsAvailable) {
    console.error(
      "DEBUG: Validation Failed! No questions found for the selected difficulty or topic."
    ); // Refined error log
    setupError.textContent = `Sorry, no questions available for ${selectedTopic} (${selectedDifficulty}). Please choose differently or add questions.`;
    setupError.style.display = "block";
    return;
  }

  console.log("DEBUG: Validation passed.");

  let availableQuestions = [...questions[selectedTopic][selectedDifficulty]];
  shuffleArray(availableQuestions);

  let questionsToUseCount;
  if (numQuestionsValue === "all") {
    questionsToUseCount = availableQuestions.length;
  } else {
    questionsToUseCount = Math.min(
      parseInt(numQuestionsValue, 10),
      availableQuestions.length
    );
  }

  if (questionsToUseCount === 0) {
    console.error(
      "DEBUG: Calculated questionsToUseCount is 0, though validation passed. Check logic."
    ); // Added specific check
    setupError.textContent = `Not enough questions available for this selection (${selectedTopic}/${selectedDifficulty}).`;
    setupError.style.display = "block";
    return;
  }

  currentQuestions = availableQuestions.slice(0, questionsToUseCount);
  console.log(
    `DEBUG: Starting quiz with ${currentQuestions.length} questions.`
  );

  currentQuestionIndex = 0;
  score = 0;
  currentStreak = 0;
  highestStreak = 0;
  feedbackDiv.textContent = "";
  feedbackDiv.className = "feedback-message";
  progressBar.style.width = "0%";

  let timePerQuestion;
  switch (selectedDifficulty) {
    case "easy":
      timePerQuestion = 20;
      break;
    case "medium":
      timePerQuestion = 15;
      break;
    case "hard":
      timePerQuestion = 12;
      break;
    default:
      timePerQuestion = 15;
  }
  totalQuizTime = timePerQuestion * currentQuestions.length;
  timeLeft = totalQuizTime;

  scoreText.textContent = score;
  streakText.textContent = currentStreak;
  timerText.textContent = timeLeft;

  quizStartTime = Date.now();
  startTimer();
  loadQuestion();
  switchScreen(quizScreen);
  console.log("DEBUG: Quiz setup complete, switched to quiz screen.");
}

function loadQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    endQuiz();
    return;
  }

  const question = currentQuestions[currentQuestionIndex];
  questionText.textContent = question.question;

  // Update Progress Text and Bar
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${
    currentQuestions.length
  }`;
  const progressPercentage =
    ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  answerOptionsDiv.innerHTML = "";
  feedbackDiv.textContent = "";
  feedbackDiv.className = "feedback-message";

  const shuffledOptions = shuffleArray([...question.options]);

  shuffledOptions.forEach((option) => {
    const button = document.createElement("button");
    button.innerHTML = option; // Use innerHTML for safety if options contain entities
    button.classList.add("option-btn");
    button.addEventListener("click", handleAnswer);
    answerOptionsDiv.appendChild(button);
  });
}

function handleAnswer(event) {
  const selectedButton = event.target;
  const selectedAnswer = selectedButton.innerHTML; // Match how options are set
  const currentQ = currentQuestions[currentQuestionIndex];
  const correctAnswer = currentQ.answer;
  const isCorrect = selectedAnswer === correctAnswer;

  // --- Store review data ---
  const optionsPresented = Array.from(
    answerOptionsDiv.querySelectorAll(".option-btn")
  ).map((btn) => btn.innerHTML);
  quizReviewData.push({
    questionData: currentQ,
    userAnswer: selectedAnswer,
    correctAnswer: correctAnswer,
    optionsPresented: optionsPresented,
    wasCorrect: isCorrect,
    status: isCorrect ? "correct" : "incorrect",
  });
  // --- End store ---

  answerOptionsDiv.querySelectorAll(".option-btn").forEach((btn) => {
    btn.disabled = true;
    if (btn.innerHTML === correctAnswer) {
      // Compare innerHTML
      btn.classList.add("correct");
    } else if (btn === selectedButton) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    currentStreak++;
    feedbackDiv.textContent = "Correct!";
    feedbackDiv.className = "feedback-message correct";
    if (currentStreak > highestStreak) {
      highestStreak = currentStreak;
    }
  } else {
    currentStreak = 0;
    feedbackDiv.innerHTML = `Incorrect! The answer was: <strong>${correctAnswer}</strong>`; // Use innerHTML for bold
    feedbackDiv.className = "feedback-message incorrect";
  }

  scoreText.textContent = score;
  streakText.textContent = currentStreak;

  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 1800);
}

function startTimer() {
  clearInterval(timerInterval);
  timerText.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

function handleTimeUp() {
  if (currentQuestionIndex >= currentQuestions.length) return; // Avoid error if quiz ended simultaneously

  const currentQ = currentQuestions[currentQuestionIndex];
  const correctAnswer = currentQ.answer;

  // --- Store review data for time up ---
  const optionsPresented = Array.from(
    answerOptionsDiv.querySelectorAll(".option-btn")
  ).map((btn) => btn.innerHTML);
  quizReviewData.push({
    questionData: currentQ,
    userAnswer: null, // Indicate no answer given
    correctAnswer: correctAnswer,
    optionsPresented: optionsPresented,
    wasCorrect: false,
    status: "timeup", // Special status for time up
  });
  // --- End store ---

  feedbackDiv.innerHTML = "Time's up! Moving to next question.";
  feedbackDiv.className = "feedback-message incorrect"; // Style as incorrect/warning

  answerOptionsDiv.querySelectorAll(".option-btn").forEach((btn) => {
    btn.disabled = true;
    if (btn.innerHTML === correctAnswer) {
      // Compare innerHTML
      btn.classList.add("correct"); // Still show correct answer
    }
  });

  currentStreak = 0;
  streakText.textContent = currentStreak;

  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 2000);
}

function endQuiz() {
  clearInterval(timerInterval);
  quizEndTime = Date.now();
  const timeTakenSeconds = Math.max(
    0,
    Math.round((quizEndTime - quizStartTime) / 1000)
  );
  const timeTakenFormatted = formatTime(timeTakenSeconds);
  const accuracy =
    currentQuestions.length > 0
      ? ((score / currentQuestions.length) * 100).toFixed(1)
      : 0;

  // Display results
  finalScoreText.textContent = `${score} / ${currentQuestions.length}`;
  accuracyText.textContent = `${accuracy}%`;
  totalQuestionsText.textContent = currentQuestions.length;
  correctAnswersText.textContent = score;
  timeTakenText.textContent = timeTakenFormatted;
  highestStreakText.textContent = highestStreak;
  resultTopicText.textContent =
    selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1);
  resultDifficultyText.textContent =
    selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);

  let feedback = "";
  if (accuracy >= 80) feedback = "Excellent Performance! You nailed it! 🎉";
  else if (accuracy >= 60) feedback = "Great Job! Very solid score! 👍";
  else if (accuracy >= 40) feedback = "Good Effort! Keep practicing! 😊";
  else feedback = "Keep Learning! Every quiz makes you better! 💪";
  resultFeedbackDiv.textContent = feedback;

  saveResult(
    selectedTopic,
    selectedDifficulty,
    score,
    currentQuestions.length,
    timeTakenSeconds,
    highestStreak
  );
  switchScreen(resultsScreen);
  console.log("DEBUG: Quiz ended, switched to results screen.");
}

// --- Review Function ---
function displayReview() {
  console.log("DEBUG: Displaying review screen.");
  reviewDetailsDiv.innerHTML = ""; // Clear previous review content

  if (quizReviewData.length === 0) {
    reviewDetailsDiv.innerHTML =
      "<p>No review data available for this quiz.</p>";
    // Optionally disable review button if no data? Could be done in endQuiz.
    return;
  }

  quizReviewData.forEach((item, index) => {
    const reviewItemDiv = document.createElement("div");
    reviewItemDiv.classList.add("review-item");

    const questionP = document.createElement("p");
    questionP.classList.add("review-question");
    questionP.innerHTML = `<strong>Question ${index + 1}:</strong> ${
      item.questionData.question
    }`;
    reviewItemDiv.appendChild(questionP);

    const optionsUl = document.createElement("ul");
    optionsUl.classList.add("review-options");

    item.optionsPresented.forEach((optionText) => {
      const optionLi = document.createElement("li");
      optionLi.classList.add("review-option");
      optionLi.innerHTML = optionText; // Use innerHTML

      // Highlight correct answer
      if (optionText === item.correctAnswer) {
        optionLi.classList.add("correct-answer");
      }

      // Highlight user's answer
      if (optionText === item.userAnswer) {
        optionLi.classList.add("user-selected");
        // Add specific class if user's selection was incorrect
        if (!item.wasCorrect) {
          optionLi.classList.add("incorrect-selection");
        }
      }
      optionsUl.appendChild(optionLi);
    });
    reviewItemDiv.appendChild(optionsUl);

    // Add Status (Correct/Incorrect/Time Up)
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("review-status");
    if (item.status === "correct") {
      statusDiv.innerHTML =
        '<span class="correct">Your answer was Correct!</span>';
    } else if (item.status === "incorrect") {
      statusDiv.innerHTML = `<span class="incorrect">Your Answer: ${
        item.userAnswer || "N/A"
      } | Correct Answer: ${item.correctAnswer}</span>`;
    } else if (item.status === "timeup") {
      statusDiv.innerHTML = `<span class="timeup">Time ran out! Correct Answer: ${item.correctAnswer}</span>`;
    }
    reviewItemDiv.appendChild(statusDiv);

    // Add Logic/Explanation if available
    if (item.questionData.logic) {
      const logicDiv = document.createElement("div");
      logicDiv.classList.add("review-logic");
      logicDiv.innerHTML = `<strong>Logic:</strong> ${item.questionData.logic}`;
      reviewItemDiv.appendChild(logicDiv);
    }

    reviewDetailsDiv.appendChild(reviewItemDiv);
  });

  switchScreen(reviewScreen); // Show the review screen
}

// --- History Management ---
function saveResult(
  topic,
  difficulty,
  score,
  totalQuestions,
  timeTaken,
  streak
) {
  const history = loadHistoryFromStorage();
  const percentage =
    totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(1) : 0;
  const newResult = {
    topic: topic.charAt(0).toUpperCase() + topic.slice(1),
    difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
    score: score,
    totalQuestions: totalQuestions,
    percentage: percentage,
    timeTaken: formatTime(timeTaken),
    highestStreak: streak,
    timestamp: new Date().toLocaleString(),
  };
  history.unshift(newResult); // Add to beginning

  try {
    localStorage.setItem("quizHistory", JSON.stringify(history));
  } catch (e) {
    console.error("Error saving history to localStorage:", e);
  }
}

function loadHistoryFromStorage() {
  try {
    const history = localStorage.getItem("quizHistory");
    return history ? JSON.parse(history) : [];
  } catch (e) {
    console.error("Error loading history from localStorage:", e);
    return [];
  }
}

function displayHistory() {
  const history = loadHistoryFromStorage();
  historyListDiv.innerHTML = "";

  if (history.length === 0) {
    historyListDiv.innerHTML =
      '<p style="text-align: center; color: var(--text-light);">No quiz history found.</p>';
    if (clearHistoryBtn) clearHistoryBtn.style.display = "none"; // Hide clear btn if no history
    return;
  }

  if (clearHistoryBtn) clearHistoryBtn.style.display = "inline-block"; // Show clear btn

  history.forEach((result) => {
    const entry = document.createElement("div");
    entry.classList.add("history-entry");
    entry.innerHTML = `
            <p><strong>${result.topic} (${result.difficulty})</strong> - <span style="font-size: 0.8em;">${result.timestamp}</span></p>
            <p class="history-meta">Score: ${result.score}/${result.totalQuestions} (${result.percentage}%) | Max Streak: ${result.highestStreak} | Time: ${result.timeTaken}</p>
        `;
    historyListDiv.appendChild(entry);
  });
}

function clearHistory() {
  if (
    window.confirm(
      "Are you sure you want to clear all quiz history? This action cannot be undone."
    )
  ) {
    try {
      localStorage.removeItem("quizHistory");
      displayHistory(); // Refresh the display
      console.log("DEBUG: History cleared.");
    } catch (e) {
      console.error("Error clearing history from localStorage:", e);
    }
  }
}

// --- Event Listeners (with null checks) ---
function attachListener(element, event, handler, errorMsg) {
  if (element) {
    element.addEventListener(event, handler);
    console.log(`DEBUG: Listener for ${errorMsg} attached.`);
  } else {
    console.error(`ERROR: Element for ${errorMsg} not found.`);
  }
}

attachListener(startQuizBtn, "click", startQuiz, "Start Quiz Button");
attachListener(
  reattemptBtn,
  "click",
  () => {
    switchScreen(setupScreen);
    startQuiz();
  },
  "Re-attempt Button"
);
attachListener(
  newQuizBtn,
  "click",
  () => {
    switchScreen(setupScreen);
  },
  "New Quiz Button"
);
attachListener(
  viewHistoryResultsBtn,
  "click",
  () => {
    displayHistory();
    switchScreen(historyScreen);
  },
  "View History (Results) Button"
);
attachListener(
  viewHistoryBtn,
  "click",
  () => {
    displayHistory();
    switchScreen(historyScreen);
  },
  "View History (Setup) Button"
);
attachListener(
  backToSetupBtn,
  "click",
  () => {
    switchScreen(setupScreen);
  },
  "Back to Setup Button"
);
attachListener(clearHistoryBtn, "click", clearHistory, "Clear History Button");
attachListener(
  reviewAnswersBtn,
  "click",
  displayReview,
  "Review Answers Button"
);
attachListener(
  backToResultsBtn,
  "click",
  () => switchScreen(resultsScreen),
  "Back to Results Button"
);

// --- Initial Setup ---
function init() {
  console.log("DEBUG: Initializing application.");
  if (setupError) {
    setupError.style.display = "none";
  } else {
    console.error("ERROR: Setup error message element not found during init.");
  }
  if (setupScreen) {
    switchScreen(setupScreen);
  } else {
    console.error("FATAL ERROR: Setup screen element not found during init!");
  }
}

// Run initialization when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
