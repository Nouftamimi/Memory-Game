/*
 * Create a list that holds all of your cards
 */
var cardIcons = [
    'fa fa-diamond', 'fa fa-paper-plane-o',  
    'fa fa fa-bolt', 'fa fa-anchor',
    'fa fa fa-bolt','fa fa-cube', 
    'fa fa-leaf','fa fa-bicycle',
    'fa fa-cube', 'fa fa-leaf', 
    'fa fa-anchor','fa fa-bicycle',
    'fa fa-bomb', 'fa fa-paper-plane-o',
    'fa fa-diamond','fa fa-bomb'
    ];

const AllCards = document.querySelector(".deck");
let cardOpen = [];
let sameCard = [];
let seconds = 0;
let minutes = 0;
var hours = 0;
var stop = 0;

/*
 * timer
 * i took it from website 
*/
window.onload = function() {
    setInterval(function() {
        if (stop !== 1) {
            seconds++;
            if (seconds == 60) {
                minutes++;        
            }
            if (minutes == 60) {
                hours++;
            }
        }
    },1000);
};

function startGame() {// initilalize the game 
    for(let i = 0; i < cardIcons.length; i++) {
        const cards = document.createElement("li");
        cards.classList.add("card");
        cards.innerHTML = "<i class= '" + cardIcons[i] + "'</i>";
        AllCards.appendChild(cards);
    
        click(cards);//click event to all card
    }   

}

   
function click(card) {

    card.addEventListener("click", function() {//click event to all card 

        const thisCard = this;
        const backCard = cardOpen[0];
    
       
        if(cardOpen.length === 1) {//the card is open
            
            card.classList.add("open", "show", "disabled");
            cardOpen.push(this);

            compareCards(thisCard, backCard);//check thie card if they matched

        } else {// the card didn't match
    
            thisCard.classList.add("open","show", "disabled");
            cardOpen.push(this);
        }
                  
    });
    
} 


////// this function to compare between the two icons if it's same icons or not
function compareCards(thisCard, backCard){


    if(thisCard.innerHTML === backCard.innerHTML) {//the two card matched
        thisCard.classList.add("match");
        backCard.classList.add("match");

        sameCard.push(thisCard, backCard);
    
        cardOpen = [];// if it's matched then open

        win();// win the game 
    
    } else {
        setTimeout(function() {

        thisCard.classList.remove("open", "show", "disabled");
        backCard.classList.remove("open", "show","disabled");
            
        }, 500);//set the thme in millie secs

        cardOpen = [];      
    }

    //add new move 
    addMove();
}

////// check the game finished /////
function win() {
    if(sameCard.length === cardIcons.length) {
        alert("WIN :) \nPlay again smarter \n" 
        + "hours: "+hours+"\n"
        + "Minutes: "+minutes+"\n"
        + "Seconds: "+seconds);
    }
}
///// add move ////
const movesTheCard = document.querySelector(".moves");
let moves = 0;
movesTheCard.innerHTML = 0;
function addMove() {
    moves++;
    movesTheCard.innerHTML = moves;
    star();
}

///// decrese the stars  /////
const allThestars = document.querySelector(".stars");
allThestars.innerHTML = ' <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> '
function star() {
    switch(moves) {
        case 15: 
            allThestars.innerHTML = ' <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> ';
        break;

        case 20:
            allThestars.innerHTML = ' <li><i class="fa fa-star"></i></li>  '
        break;
    }

}

////////restart the game ////////
const restartTheGame = document.querySelector(".restart");
restartTheGame.addEventListener("click", function() {
    //delet all the card to restart game 
    AllCards.innerHTML = "";


    startGame();//start the game, card


    sameCard = [];
    moves = 0; 
});

startGame();// start the game for the first time 



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

