let cardData = [];
let currentCardIndex = 0;

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
  answerContent.textContent = '';

  questionHeader.textContent = 'Question';
  answerHeader.textContent = 'Answer';

  const flipButton = document.getElementById('flip-button');
  flipButton.addEventListener('click', () => {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.classList.toggle('flip');
  });
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % cardData.length;
  showCard(currentCardIndex);
}

fetch('flashcards.csv')
  .then(response => response.text())
  .then(data => {
    cardData = parseCSV(data);
    showCard(currentCardIndex);
  })
  .catch(error => console.log('Error fetching CSV:', error));

document.getElementById('next-button').addEventListener('click', nextCard);
