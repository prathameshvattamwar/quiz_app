// --- DOM Elements ---
const setupScreen = document.getElementById("setup-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const historyScreen = document.getElementById("history-screen");

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

const viewHistoryBtn = document.getElementById("view-history-btn"); // Button on setup screen
const historyListDiv = document.getElementById("history-list");
const backToSetupBtn = document.getElementById("back-to-setup-btn");
const clearHistoryBtn = document.getElementById("clear-history-btn");

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

// --- Question Bank (Ensure keys match HTML values) ---
const questions = {
  math: {
    easy: [
      {
        question: "What is 15% of 60?",
        options: ["6", "9", "12", "15"],
        answer: "9",
      },
      {
        question: "If a train travels 120km in 2 hours, what is its speed?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        answer: "60 km/h",
      },
      {
        question: "Solve for x: x / 4 = 5",
        options: ["1", "9", "20", "24"],
        answer: "20",
      },
      {
        question: "What is the area of a square with side length 6?",
        options: ["12", "24", "30", "36"],
        answer: "36",
      },
      {
        question: "Simplify the ratio 18:27",
        options: ["2:3", "3:4", "1:2", "9:13"],
        answer: "2:3",
      },
    ],
    medium: [
      {
        question:
          "A jacket costs $80 after a 20% discount. What was the original price?",
        options: ["$96", "$100", "$110", "$120"],
        answer: "$100",
      },
      {
        question: "If 5 apples cost $3.50, how much do 12 apples cost?",
        options: ["$7.00", "$8.40", "$9.10", "$7.70"],
        answer: "$8.40",
      },
      {
        question: "What is the value of 3³ - 2²?",
        options: ["1", "5", "19", "23"],
        answer: "23",
      },
      {
        question: "Find the average of 15, 25, 30, 10",
        options: ["18", "20", "22", "25"],
        answer: "20",
      },
      {
        question: "If angle A and B are complementary, and A = 40°, what is B?",
        options: ["40°", "50°", "90°", "140°"],
        answer: "50°",
      },
    ],
    hard: [
      {
        question:
          "A car's value depreciates by 15% per year. If it costs $20,000 new, what's its value after 2 years?",
        options: ["$14450", "$17000", "$13600", "$14000"],
        answer: "$14450",
      },
      {
        question:
          "Work done by A in 1 day is 1/10, by B is 1/15. How many days working together?",
        options: ["4", "5", "6", "7"],
        answer: "6",
      },
      {
        question: "Find the compound interest on $5000 for 2 years at 10% p.a.",
        options: ["$1000", "$1050", "$1100", "$1150"],
        answer: "$1050",
      },
      {
        question:
          "What is the probability of rolling two dice and getting a sum of 7?",
        options: ["1/6", "1/12", "1/36", "7/36"],
        answer: "1/6",
      },
      {
        question: "Solve: (2/3)x + 5 = 11",
        options: ["6", "7", "8", "9"],
        answer: "9",
      },
    ],
  },
  english: {
    easy: [
      {
        question: "Choose the correct spelling:",
        options: ["Believe", "Beleive", "Believ", "Beleave"],
        answer: "Believe",
      },
      {
        question: "What is the past tense of 'eat'?",
        options: ["Eated", "Ate", "Eaten", "Eat"],
        answer: "Ate",
      },
      {
        question: "Identify the verb: 'The dog barked loudly.'",
        options: ["dog", "barked", "loudly", "The"],
        answer: "barked",
      },
      {
        question: "Which is NOT a preposition?",
        options: ["under", "quickly", "behind", "across"],
        answer: "quickly",
      },
      {
        question: "Complete: She is ___ than her brother.",
        options: ["tall", "taller", "tallest", "more tall"],
        answer: "taller",
      },
    ],
    medium: [
      // Add more questions
      {
        question: "What is a synonym for 'begin'?",
        options: ["End", "Finish", "Start", "Stop"],
        answer: "Start",
      },
    ],
    hard: [
      // Add more questions
      {
        question:
          "Identify the figure of speech: 'Time flies when you are having fun.'",
        options: ["Metaphor", "Simile", "Personification", "Idiom"],
        answer: "Idiom",
      },
    ],
  },
  general: {
    // Add more questions
    easy: [
      {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo",
      },
    ],
    medium: [
      {
        question: "Which planet is closest to the sun?",
        options: ["Venus", "Mars", "Mercury", "Earth"],
        answer: "Mercury",
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
      },
    ],
  },
  logic: {
    easy: [
      {
        question: "Find the next number: 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        answer: "10",
      },
      {
        question: "Find the next number: 5, 10, 15, 20, ?",
        options: ["25", "30", "35", "40"],
        answer: "25",
      },
      {
        question: "Find the next letter: A, C, E, G, ?",
        options: ["H", "I", "J", "K"],
        answer: "I",
      },
      {
        question: "Book is to Reading as Fork is to:",
        options: ["Drawing", "Writing", "Eating", "Sleeping"],
        answer: "Eating",
      },
      {
        question:
          "Which shape comes next in the pattern: Square, Circle, Square, Circle, ?",
        options: ["Triangle", "Square", "Circle", "Rectangle"],
        answer: "Square",
      },
    ],
    medium: [
      {
        question: "Find the next number: 3, 6, 12, 24, ?",
        options: ["30", "36", "48", "60"],
        answer: "48",
      },
      {
        question: "Find the next number: 1, 4, 9, 16, ?",
        options: ["20", "25", "30", "36"],
        answer: "25",
      },
      {
        question: "Find the next number: 36, 34, 30, 28, 24, ?",
        options: ["20", "22", "26", "18"],
        answer: "22",
      },
      {
        question: "Find the odd one out: Apple, Banana, Orange, Potato",
        options: ["Apple", "Banana", "Orange", "Potato"],
        answer: "Potato",
      },
      {
        question: "Find the next number: 2, 5, 10, 17, ?",
        options: ["24", "25", "26", "28"],
        answer: "26",
      },
    ],
    hard: [
      {
        question: "Find the next number: 7, 10, 8, 11, 9, 12, ?",
        options: ["7", "10", "13", "14"],
        answer: "10",
      },
      {
        question: "Find the next number: 1, 1, 2, 3, 5, 8, ?",
        options: ["11", "12", "13", "15"],
        answer: "13",
      },
      {
        question: "Find the next number: 4, 7, 12, 19, 28, ?",
        options: ["39", "41", "36", "44"],
        answer: "39",
      },
      {
        question: "Find the next letters: AZ, BY, CX, ?",
        options: ["DW", "DU", "EV", "DX"],
        answer: "DW",
      },
      {
        question: "Find the missing number: 12, 25, 49, 99, 197, ?",
        options: ["395", "393", "389", "401"],
        answer: "395",
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
  console.log("DEBUG: startQuiz function initiated."); // DEBUG

  setupError.textContent = ""; // Clear previous errors first
  setupError.style.display = "none"; // Hide error message initially

  selectedTopic = topicSelect.value;
  selectedDifficulty = difficultySelect.value;
  const numQuestionsValue = numQuestionsSelect.value;

  // --- Debugging Validation ---
  console.log("DEBUG: Selected Topic:", selectedTopic);
  console.log("DEBUG: Selected Difficulty:", selectedDifficulty);
  console.log(
    "DEBUG: Checking questions object for topic:",
    questions[selectedTopic]
  );
  if (questions[selectedTopic]) {
    console.log(
      "DEBUG: Checking difficulty within topic:",
      questions[selectedTopic][selectedDifficulty]
    );
    if (questions[selectedTopic][selectedDifficulty]) {
      console.log(
        "DEBUG: Questions array length:",
        questions[selectedTopic][selectedDifficulty].length
      );
    }
  }
  // --- End Debugging Validation ---

  // Validate if questions exist for the selection
  const topicExists = questions[selectedTopic];
  const difficultyExists =
    topicExists && questions[selectedTopic][selectedDifficulty];
  const questionsAvailable =
    difficultyExists && questions[selectedTopic][selectedDifficulty].length > 0;

  if (!topicExists || !difficultyExists || !questionsAvailable) {
    console.error(
      "DEBUG: Validation Failed! No questions found for this combination."
    ); // DEBUG
    setupError.textContent = `Sorry, no questions available for ${selectedTopic} (${selectedDifficulty}). Please choose differently or add questions.`;
    setupError.style.display = "block"; // Show the error message
    return; // Stop the function here if validation fails
  }

  console.log("DEBUG: Validation passed."); // DEBUG

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

  // This check might be redundant now due to the earlier validation, but good safety net
  if (questionsToUseCount === 0) {
    console.error("DEBUG: Calculated questionsToUseCount is 0."); // DEBUG
    setupError.textContent = `Not enough questions available for this selection.`;
    setupError.style.display = "block";
    return;
  }

  currentQuestions = availableQuestions.slice(0, questionsToUseCount);
  console.log(
    `DEBUG: Starting quiz with ${currentQuestions.length} questions.`
  ); // DEBUG

  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  currentStreak = 0;
  highestStreak = 0;
  feedbackDiv.textContent = "";
  feedbackDiv.className = "feedback-message";
  progressBar.style.width = "0%";

  // Set Timer
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

  // Update UI
  scoreText.textContent = score;
  streakText.textContent = currentStreak;
  timerText.textContent = timeLeft;

  quizStartTime = Date.now();
  startTimer();
  loadQuestion();
  switchScreen(quizScreen); // Switch to the quiz screen
  console.log("DEBUG: Quiz setup complete, switched to quiz screen."); // DEBUG
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
    // Use innerHTML cautiously, textContent is safer if options are plain text
    button.innerHTML = option;
    button.classList.add("option-btn");
    button.addEventListener("click", handleAnswer);
    answerOptionsDiv.appendChild(button);
  });
}

function handleAnswer(event) {
  const selectedButton = event.target;
  // Use innerHTML if options might contain HTML, otherwise textContent is safer
  const selectedAnswer = selectedButton.innerHTML;
  const correctAnswer = currentQuestions[currentQuestionIndex].answer;

  // Disable buttons and provide feedback
  answerOptionsDiv.querySelectorAll(".option-btn").forEach((btn) => {
    btn.disabled = true;
    // Use innerHTML for comparison if necessary
    if (btn.innerHTML === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedButton) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    currentStreak++;
    feedbackDiv.textContent = "Correct!";
    feedbackDiv.className = "feedback-message correct";
    if (currentStreak > highestStreak) {
      highestStreak = currentStreak;
    }
  } else {
    currentStreak = 0;
    feedbackDiv.innerHTML = `Incorrect! The answer was: <strong>${correctAnswer}</strong>`;
    feedbackDiv.className = "feedback-message incorrect";
  }

  scoreText.textContent = score;
  streakText.textContent = currentStreak;

  // Advance to next question
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
  feedbackDiv.innerHTML = "Time's up! Moving to next question.";
  feedbackDiv.className = "feedback-message incorrect";
  answerOptionsDiv.querySelectorAll(".option-btn").forEach((btn) => {
    btn.disabled = true;
    if (
      currentQuestionIndex < currentQuestions.length &&
      btn.innerHTML === currentQuestions[currentQuestionIndex].answer
    ) {
      btn.classList.add("correct");
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
  ); // Ensure non-negative
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
  console.log("DEBUG: Quiz ended, switched to results screen."); // DEBUG
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
  history.unshift(newResult);

  try {
    localStorage.setItem("quizHistory", JSON.stringify(history));
  } catch (e) {
    console.error("Error saving history to localStorage:", e);
    // Handle potential storage errors (e.g., quota exceeded)
  }
}

function loadHistoryFromStorage() {
  try {
    const history = localStorage.getItem("quizHistory");
    return history ? JSON.parse(history) : [];
  } catch (e) {
    console.error("Error loading history from localStorage:", e);
    return []; // Return empty array on error
  }
}

function displayHistory() {
  const history = loadHistoryFromStorage();
  historyListDiv.innerHTML = "";

  if (history.length === 0) {
    historyListDiv.innerHTML =
      '<p style="text-align: center; color: var(--text-light);">No quiz history found.</p>';
    clearHistoryBtn.style.display = "none";
    return;
  }

  clearHistoryBtn.style.display = "inline-block";

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
      displayHistory();
      console.log("DEBUG: History cleared."); // DEBUG
    } catch (e) {
      console.error("Error clearing history from localStorage:", e);
    }
  }
}

// --- Event Listeners ---
// Defensive check for startQuizBtn before adding listener
if (startQuizBtn) {
  startQuizBtn.addEventListener("click", startQuiz);
  console.log("DEBUG: Start Quiz Button event listener attached."); // DEBUG
} else {
  console.error(
    "FATAL ERROR: Could not find the start quiz button element (id='start-quiz-btn')!"
  );
}

// Check other buttons too for robustness
if (reattemptBtn)
  reattemptBtn.addEventListener("click", () => {
    switchScreen(setupScreen);
    startQuiz();
  });
else console.error("ERROR: Re-attempt button not found");
if (newQuizBtn)
  newQuizBtn.addEventListener("click", () => {
    switchScreen(setupScreen);
  });
else console.error("ERROR: New Quiz button not found");
if (viewHistoryResultsBtn)
  viewHistoryResultsBtn.addEventListener("click", () => {
    displayHistory();
    switchScreen(historyScreen);
  });
else console.error("ERROR: View History (Results) button not found");
if (viewHistoryBtn)
  viewHistoryBtn.addEventListener("click", () => {
    displayHistory();
    switchScreen(historyScreen);
  });
else console.error("ERROR: View History (Setup) button not found");
if (backToSetupBtn)
  backToSetupBtn.addEventListener("click", () => {
    switchScreen(setupScreen);
  });
else console.error("ERROR: Back to Setup button not found");
if (clearHistoryBtn) clearHistoryBtn.addEventListener("click", clearHistory);
else console.error("ERROR: Clear History button not found");

// --- Initial Setup ---
function init() {
  console.log("DEBUG: Initializing application."); // DEBUG
  // Make sure setup error is hidden initially
  if (setupError) {
    setupError.style.display = "none";
  } else {
    console.error("ERROR: Setup error message element not found during init.");
  }
  // Ensure setup screen is active on load
  if (setupScreen) {
    switchScreen(setupScreen);
  } else {
    console.error("FATAL ERROR: Setup screen element not found during init!");
  }
}

// Run initialization when the script loads
// Using DOMContentLoaded is slightly more robust than just running init() directly
document.addEventListener("DOMContentLoaded", init);
