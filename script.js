let cardData = [];
let shuffledIndices = []; // Array to store randomized indices
let currentCardIndex = 0;
let cardsShown = 0;

function shuffleArray(array) {
  // Fisher-Yates (aka Knuth) Shuffle
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(header => header.toLowerCase().trim());

  const cardData = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (!values || values.length !== headers.length) {
      continue; // Skip invalid rows with mismatched values
    }
    const card = {};

    for (let j = 0; j < headers.length; j++) {
      let value = values[j].trim();
      // If value is enclosed in double quotes, remove them
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
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

  questionContent.innerHTML = `<p>${card['question']}</p>`;
  answerContent.innerHTML = `<p>${card['answer']}</p>`;

  questionHeader.textContent = 'Question';
  answerHeader.textContent = 'Answer';
  updateProgress();
}

function updateProgress() {
  const progress = document.getElementById('progress');
  progress.textContent = `${cardsShown + 1}/${shuffledIndices.length} cards`;
}

function flipCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.toggle('flip');
}

function nextCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.remove('flip');
  cardsShown += 1;
  if (cardsShown < shuffledIndices.length) {
    currentCardIndex = shuffledIndices[cardsShown];
    showCard(currentCardIndex);
  } else {
    alert("Complete!");
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
    shuffledIndices = shuffleArray([...Array(cardData.length).keys()]); // Create and shuffle an array of indices
    currentCardIndex = shuffledIndices[0];
    cardsShown = 0;
    showCard(currentCardIndex);
  };
  reader.readAsText(csvfile);
});
