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
  const questionContent = document.getElementById('question-content');
  const answerHeader = document.getElementById('answer-header');
  const answerContent = document.getElementById('answer-content');

  questionHeader.textContent = 'Question';
  questionContent.textContent = card.question;
  answerHeader.textContent = 'Answer';
  answerContent.textContent = card.answer;
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
