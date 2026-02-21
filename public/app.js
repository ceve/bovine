let questions = [];
let index = 0;
let score = 0;

const progressEl = document.getElementById('progress');
const hintEl = document.getElementById('hint');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const quizCard = document.getElementById('quiz-card');
const resultCard = document.getElementById('result-card');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

async function loadQuestions() {
  const res = await fetch('/api/questions');
  questions = await res.json();
  index = 0;
  score = 0;
  quizCard.classList.remove('hidden');
  resultCard.classList.add('hidden');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[index];
  progressEl.textContent = `Question ${index + 1} / ${questions.length}`;
  hintEl.textContent = q.hint;
  feedbackEl.textContent = '';
  optionsEl.innerHTML = '';

  q.options.forEach((option) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => answer(option, q.answer);
    optionsEl.appendChild(btn);
  });
}

function answer(selected, correct) {
  const ok = selected === correct;
  if (ok) {
    score += 1;
    feedbackEl.textContent = '✅ Correct';
  } else {
    feedbackEl.textContent = `❌ Wrong. Correct: ${correct}`;
  }

  setTimeout(() => {
    index += 1;
    if (index >= questions.length) {
      finish();
      return;
    }
    renderQuestion();
  }, 700);
}

function finish() {
  quizCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
  scoreEl.textContent = `You scored ${score} / ${questions.length}.`;
}

restartBtn.onclick = loadQuestions;
loadQuestions();
