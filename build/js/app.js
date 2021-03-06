var matchTwoApp = {
  activeCards: [],
  randomColors: [],
  score: 0,
  init: function() {
    this.cardFrontEventListeners();
    this.cardBackEventListeners();
    this.assignRandomColors();
  },
  // Setup Event Listeners for the front side of the card.
  cardFrontEventListeners: function() {
    var cardfronts = document.querySelectorAll('.card-front');
    var app = this;

    // Add event listeners to all the card fronts.
    for(i = 0; i < cardfronts.length; i++) {
      cardfronts[i].addEventListener('click', function(e) {
        var cardFront = e.target;
        var cardBack = e.target.previousElementSibling;

        app.activeCards.push({cardFront, cardBack});

        // Flip the cards
        var changeState = new Promise(function(resolve) {
          cardFront.style.transform = 'perspective(600px) rotateY(-180deg)';
          cardBack.style.transform = 'perspective(600px) rotateY(0deg)';
          resolve();
        })

        // If there are 2 cards in flipped condition.
        if(app.activeCards.length === 2) {
          changeState.then(function() {

            var cardback1 = app.activeCards[0].cardBack;
            var cardback2 = app.activeCards[1].cardBack;

            if(cardback1.style.background === cardback2.style.background) {
              app.clearCards();
              return;
            } else {
              setTimeout(function() {
                app.resetCards();
              }, 500);
            }
          })
        }

        // // If there are 2 cards in flipped condition.
        // if(app.activeCards.length === 2) {
        //   setTimeout(resetCards, 500);
        //   function resetCards() {
        //     app.activeCards.forEach(card => {
        //       card.cardBack.style.transform = '';
        //       card.cardFront.style.transform = '';
        //       app.clearCards();
        //     })
        //   }
        // }
      })
    }
  },
  cardBackEventListeners: function() {
    var cardbacks = document.querySelectorAll('.card-back');
    var app = this;
    // Add event listeners on all the cards backs.
    for(var i = 0; i < cardbacks.length; i++) {
      cardbacks[i].addEventListener('click', function(e) {
        var cardBack = e.target;
        var cardFront = e.target.nextElementSibling;
        
        // Flip the cards back to normal state.
        cardFront.style.transform = 'perspective(600px) rotateY(0deg)';
        cardBack.style.transform = 'perspective(600px) rotateY(180deg)';
        app.clearCards();
      })
    }
  },
  clearCards: function() {
    this.activeCards = [];
  },
  resetCards: function() {
    // set the cards back to their original state.
    this.activeCards.forEach(card => {
      card.cardBack.style.transform = '';
      card.cardFront.style.transform = '';
    })
    this.clearCards();
  },
  assignRandomColors: function() {
    // select all the backs of the cards
    var cardbacks = document.querySelectorAll('.card-back');
    var color;
    
    // Add 6 random hexcodes to the randomColors array.
    for(var i = 0; i < 6; i++) { 
      color = this.generateRandomHexcode();
      // Add each color to the array twice.
      this.randomColors.push(color);
      this.randomColors.push(color);
    }

    // create an array of numbers and shuffle them so colors are distributed randomly.
    var numbers = this.shuffle([0,1,2,3,4,5,6,7,8,9,10,11]);
    // Assign the colors to the cards.
    for(var j = 0; j < cardbacks.length; j++) {
      cardbacks[j].style.background = this.randomColors[numbers[j]];
    }
  },
  generateRandomHexcode: function() {
    // all the numbers and letters that can be used in hex codes
    var validHexcodeDigits = '1234567890ABCDEF';

    // add the hash tag required in hex codes.
    var color = '#';

    // run a loop 6 times generating 6 digits/letters that make up a hex code.
    for(var i=0; i<6; i++) {
      color += validHexcodeDigits[Math.floor(Math.random() * 16)]
    }

    // return the color
    return color;
  },
  // got this shuffle function from https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
  shuffle: function(array) {
    var i = array.length,
    j = 0,
    temp;

    while (i--) {
      j = Math.floor(Math.random() * (i+1));

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}

matchTwoApp.init();