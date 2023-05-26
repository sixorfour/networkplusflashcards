let cardData = [];
let currentCardIndex = 0;

function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');

  cardData = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length !== headers.length) {
      continue; // Skip invalid rows with mismatched values
    }
    const card = {};

    for (let j = 0; j < headers.length; j++) {
      const value = values[j].trim();
      card[headers[j]] = value;
    }

    cardData.push(card);
  }

  return cardData;
}

// Rest of the code...


function showCard(index) {
  const card = cardData[index];
  const questionHeader = document.getElementById('question-header');
  const questionContent = document.getElementById('question-content');
  const answerHeader = document.getElementById('answer-header');
  const answerContent = document.getElementById('answer-content');

  questionContent.innerHTML = `<p>${card.question}</p>`;
  answerContent.innerHTML = `<p>${card.answer}</p>`;

  questionHeader.textContent = 'Question';
  answerHeader.textContent = 'Answer';
}


function flipCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.toggle('flip');
}

function nextCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.remove('flip');
  currentCardIndex = (currentCardIndex + 1) % cardData.length;
  showCard(currentCardIndex);
}

document.getElementById('flip-button').addEventListener('click', flipCard);
document.getElementById('next-button').addEventListener('click', nextCard);

document.getElementById('csvFileInput').addEventListener('change', function(event) {
  const csvfile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const csvData = e.target.result;
    cardData = parseCSV(csvData);
    currentCardIndex = 0;
    showCard(currentCardIndex);
  };
  reader.readAsText(csvfile);
});


/*
// Add the missing button code
const flipButton = document.createElement('button');
flipButton.id = 'flip-button';
flipButton.textContent = 'Flip Card';
document.querySelector('.button-container').appendChild(flipButton);

const nextButton = document.createElement('button');
nextButton.id = 'next-button';
nextButton.textContent = 'Next';
document.querySelector('.button-container').appendChild(nextButton);

*/
