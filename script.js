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

function showCard(index) {
  const card = cardData[index];
  const questionContent = document.getElementById('question-content');
  const answerContent = document.getElementById('answer-content');

  if (card) {
    questionContent.textContent = card.question;
    answerContent.textContent = card.answer;
  } else {
    questionContent.textContent = 'No card available';
    answerContent.textContent = 'No card available';
  }
}

function flipCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.toggle('flip');
}

function nextCard() {
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
