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

  if (card) {
    questionHeader.textContent = 'Question';
    answerHeader.textContent = 'Answer';

    questionContent.textContent = card['Question'];
    answerContent.textContent = card['Answer'];
  } else {
    questionHeader.textContent = 'No card available';
    answerHeader.textContent = 'No card available';
    questionContent.textContent = '';
    answerContent.textContent = '';
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

function extCSV(csvData) {
  try {
    cardData = parseCSV(csvData);
    currentCardIndex = 0;
    showCard(currentCardIndex);
  } catch (error) {
    console.error('Error parsing CSV:', error);
  }
}


document.getElementById('flip-button').addEventListener('click', flipCard);
document.getElementById('next-button').addEventListener('click', nextCard);

var csvFileInput = document.getElementById('csvFileInput');
csvFileInput.addEventListener('change', function(event) {
  var csvfile = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var csvData = e.target.result;
    extCSV(csvData);
  };
  reader.readAsText(csvfile);
});

document.getElementById('submit-button').addEventListener('click', function() {
  var csvFileInput = document.getElementById('csvFileInput');
  var csvfile = csvFileInput.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var csvData = e.target.result;
    extCSV(csvData);
  };
  reader.readAsText(csvfile);
});
