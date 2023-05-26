let cardData = [];
let currentCardIndex = 0;
let isAnswerDisplayed = false; // Track the answer display state

function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  cardData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const card = {};

    for (let j = 0; j < headers.length; j++) {
      card[headers[j]] = values[j];
    }

    cardData.push(card);
  }

  return cardData;
}

function showCard(index) {
  const card = cardData[index];
  const questionHeader = document.getElementById('question-header');
  const answerHeader = document.getElementById('answer-header');
  const questionContent = document.getElementById('question-content');
  const answerContent = document.getElementById('answer-content');

  questionContent.textContent = card.question;
  answerContent.textContent = card.answer;

  if (isAnswerDisplayed) {
    questionHeader.textContent = ''; // Hide the question header
    answerHeader.textContent = 'Answer';
  } else {
    questionHeader.textContent = 'Question';
    answerHeader.textContent = '';
  }
}

function flipCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.toggle('flip');
  isAnswerDisplayed = !isAnswerDisplayed; // Toggle the answer display state
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % cardData.length;
  isAnswerDisplayed = false; // Reset the answer display state
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.remove('flip'); // Ensure the question side is shown
  showCard(currentCardIndex);
}

fetch('flashcards.csv')
  .then(response => response.text())
  .then(data => {
    cardData = parseCSV(data);
    showCard(currentCardIndex);
  })
  .catch(error => console.log('Error fetching CSV:', error));

document.getElementById('flip-button').addEventListener('click', flipCard);
document.getElementById('next-button').addEventListener('click', nextCard);
