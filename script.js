const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = 0;


const CARDS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six"
];


// Fisher Yates algorithm implemented to shuffle an array
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


let shuffledCards = shuffle(CARDS);


// This function loops over the array of cards
// Tt creates a new div and gives it a class with the value of the card
// It also adds an event listener for a click for each card
function createDivsForCards(cardArray) {
  for (let card of cardArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(card);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}



// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  // Clicking on a card changes the background card of the class that it has
  let currentCard = event.target;
  currentCard.style.backgroundImage = currentCard.classList[0];

  if (!card1 || !card2) {                                         //the opposite value of card 1 or card 2
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;                                 //card 1 is card 1 or current card
    card2 = currentCard === card1 ? null : currentCard;           //card 2 is current card and equal to card 1 if truthy, current card if falsy
  }


  if (card1 && card2) {                                           //the value of card 1 and card 2
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;


    //Clicking on two matching cards will be a “match” — these cards should stay face up
    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);        //can no longer click this card, card will remain flipped
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;

      //Clicking on two cards that are not a match will stay flipped for 1 second before hiding the card again
    } else {
      setTimeout(function() {
        card1.style.backgroundImage = "";
        card2.style.backgroundImage = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === CARDS.length) alert("game over!");
}


// When the DOM loads, createDivsForColors will execute
createDivsForCards(shuffledCards);