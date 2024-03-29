let cardData = [];
let shuffledIndices = [];
let currentCardIndex = 0;
let cardsShown = 0;

function shuffleArray(array) {
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
      continue;
    }
    const card = {};

    for (let j = 0; j < headers.length; j++) {
      let value = values[j].trim();
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
  const questionHeaderFront = document.getElementById('question-header-front');
  const questionContentFront = document.getElementById('question-content-front');
  const questionHeaderBack = document.getElementById('question-header-back');
  const questionContentBack = document.getElementById('question-content-back');
  const answerHeader = document.getElementById('answer-header');
  const answerContent = document.getElementById('answer-content');

  questionContentFront.innerHTML = `<p>${card['question']}</p>`;
  questionContentBack.innerHTML = `<p>${card['question']}</p>`;
  answerContent.innerHTML = `<p>${card['answer']}</p>`;

  questionHeaderFront.textContent = 'Question';
  questionHeaderBack.textContent = 'Question';
  answerHeader.textContent = 'Answer';

  document.getElementById('progress').textContent = `${cardsShown + 1}/${cardData.length} cards`;
  document.getElementById('progress').style.display = 'block'; 

  const lastButton = document.getElementById('last-button');
  lastButton.style.display = (cardsShown > 0) ? 'inline-block' : 'none';
}

function flipCard() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.classList.toggle('flip');
}

function lastCard() {
  if (cardsShown > 0) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.classList.remove('flip');
    cardsShown -= 1;
    currentCardIndex = shuffledIndices[cardsShown];
    showCard(currentCardIndex);
  }
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

// Get references to the elements we'll be working with
const themeSelector = document.getElementById('themeSelector');
const cardContainer = document.querySelector('.card-container');
const body = document.querySelector('body');

// Add an event listener to the theme selector
themeSelector.addEventListener('change', () => {
  console.log('Theme selected:', themeSelector.value);
  const selectedTheme = themeSelector.value;

  // Remove any existing theme classes from the body and card container
  body.classList.remove('theme-default', 'theme-dark', 'theme-midnight-blue');
  cardContainer.classList.remove('theme-default', 'theme-dark', 'theme-midnight-blue');

  // Add the selected theme class to the body and card container
  body.classList.add(themeSelector.value);
  cardContainer.classList.add(themeSelector.value);
});

// Add a default theme class on page load
body.classList.add('theme-default');
cardContainer.classList.add('theme-default');

document.getElementById('flip-button').addEventListener('click', flipCard);
document.getElementById('next-button').addEventListener('click', nextCard);
document.getElementById('last-button').addEventListener('click', lastCard);

document.getElementById('csvFileInput').addEventListener('change', function(event) {
  const csvfile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const csvData = e.target.result;
    cardData = parseCSV(csvData);
    shuffledIndices = shuffleArray([...Array(cardData.length).keys()]);
    currentCardIndex = shuffledIndices[0];
    cardsShown = 0;
    showCard(currentCardIndex);
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('instructions1').style.display = 'none';
    document.getElementById('instructions2').style.display = 'none';
    document.getElementById('instructions3').style.display = 'none';
    document.getElementById('instructions4').style.display = 'none';
    document.getElementById('loadNewButton').style.display = 'block';
    document.getElementById('file-input-container').style.display = 'none';
    document.querySelector('.card-container').style.display = 'block';
    document.querySelector('.button-container').style.display = 'flex';
  };
  reader.readAsText(csvfile);
});

document.getElementById('loadNewButton').addEventListener('click', function() {
  document.getElementById('instructions').style.display = 'block';
  document.getElementById('instructions1').style.display = 'block';
  document.getElementById('instructions2').style.display = 'block';
  document.getElementById('instructions3').style.display = 'block';
  document.getElementById('instructions4').style.display = 'block';
  document.getElementById('loadNewButton').style.display = 'none';
  document.getElementById('file-input-container').style.display = 'block';
  document.querySelector('.card-container').style.display = 'none';
  document.querySelector('.button-container').style.display = 'none';
  document.getElementById('progress').style.display = 'none'; 
  document.getElementById('csvFileInput').value = null;
  cardData = [];
  shuffledIndices = [];
  currentCardIndex = 0;
  cardsShown = 0;
});

window.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
    case 37: // Left arrow key
      lastCard();
      break;
    case 38: // Up arrow key
    case 40: // Down arrow key
    case 32: // Space bar
      flipCard();
      break;
    case 39: // Right arrow key
      nextCard();
      break;
  }
});
