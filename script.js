let cardData = [];
let currentCardIndex = 0;

function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');

  const cardData = [];
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

function showCard(index) {
  const card = cardData[index];
  const questionHeader = document.getElementById('question-header');
  const answerHeader = document.getElementById('answer-header');
  const questionContent = document.getElementById('question-content');
  const answerContent = document.getElementById('answer-content');

  questionContent.textContent = card.question;
  answerContent.textContent = card.answer;

  questionHeader.textContent = 'Question';
  answerHeader.textContent = 'Answer';
}

function flipCard() {
  const cardContainer = document.querySelector('.card-container');
  const questionContent = document.getElementById('question-content');
  const answerContent = document.getElementById('answer-content');

  cardContainer.classList.toggle('flip');
}

function nextCard() {
  const cardContainer = document.querySelector('.card-container');
  const isFlipped = cardContainer.classList.contains('flip');

  if (isFlipped) {
    cardContainer.classList.remove('flip'); // Reverse the flip to show the question side
  } else {
    currentCardIndex = (currentCardIndex + 1) % cardData.length;
    showCard(currentCardIndex);
  }
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

function extCSV(csvData) {
  try {
    cardData = parseCSV(csvData);
    currentCardIndex = 0;
    showCard(currentCardIndex);
    console.log(cardData); // Log cardData to the console
  } catch (error) {
    console.error('Error parsing CSV:', error);
  }
}
