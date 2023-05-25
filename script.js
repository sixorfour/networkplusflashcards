var flipButton = document.querySelector('.flip-button');
var flashcard = document.querySelector('.flashcard');
var questionContent = document.getElementById('questionContent');
var answerContent = document.getElementById('answerContent');
var cardData = [];
var currentCardIndex = 0;

fetch('safari_animals.csv')
  .then(response => response.text())
  .then(data => {
    cardData = parseCSV(data);
    showCard(currentCardIndex);
  })
  .catch(error => console.log("Error fetching CSV:", error));



flipButton.addEventListener('click', function() {
    flashcard.classList.toggle('flip');
});

function showCard(index) {
    if (index >= 0 && index < cardData.length) {
        var card = cardData[index];
        questionContent.textContent = card.question;
        answerContent.textContent = card.answer;
    }
}



function parseCSV(csv) {
    var lines = csv.trim().split('\n');
    var headers = lines.shift().split(',');

    return lines.map(line => {
        var values = line.split(',');
        var card = {};

        headers.forEach((header, index) => {
            card[header.trim()] = values[index].trim();
        });

        return card;
    });
}
