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
  answerContent.textContent = card.answer; // Display the answer content

  questionHeader.textContent = 'Question';
  answerHeader.textContent = 'Answer';
}


function flipCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.toggle('flip');
}

function nextCard() {
  if (document.getElementById('answer-header').textContent === 'Answer') {
    // If the previous card was displaying the answer, skip to the next card
    currentCardIndex = (currentCardIndex + 1) % cardData.length;
  }
  
  // Show the next card as a question
  showCard(currentCardIndex);
}

fetch('flashcards.csv')
  .then(response => response.text())
  .then(data => {
    cardData = parseCSV(data);
    showCard(currentCardIndex);
  })
  .catch(error => console.log('Error fetching CSV:', error));

document.getElementById('flip-button').addEventListener('click', () => flipCard());
document.getElementById('next-button').addEventListener('click', nextCard);
