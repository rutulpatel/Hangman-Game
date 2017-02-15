//Variables definition & initiation
var wordList = [
    "banana",
    "apple",
    "guava",
    "cherry",
    "mango",
    "pineapple",
    "strawberry"
];
var secretWord = "";
var displayedWord = "";
var winCount = 0;
var lossCount = 0;
var guessesMade = [];
var atoz = "abcdefghijklmnopqrstuvwxyz";
var guessesLeft = 9;
var msg = "";

var wordDashesID = "wordDashes";
var msgID = "msg";
var guessesMadeID = "guessesMade";
var winCountID = "winCount";
var lossCountID = "lossCount";
var guessesLeftID = "guessesLeft";




/**
    hide/show hangman parts by id    
*/
function showHangmanParts(id, isVisible) {
    if (isVisible) {
        document.getElementById(id).style.visibility = 'visible';    
    } else {
        document.getElementById(id).style.visibility = 'hidden';
    }
    
}
showHangmanParts("hm-head", true);
/**
    update hangman sketch
*/
function updateHangman() {
    
}

/**
    update html elements by id
*/
function updateElementById(id, msg) {
    document.getElementById(id).innerHTML = msg; //updates html element
}

/**
    reset game data to initial stage
*/
function resetGame(wordLen) {
    var dashesStr = "";
    for (var i = 0; i < wordLen; i++) {
        dashesStr += "_";
    }
    displayedWord = dashesStr;
    guessesLeft = 9;
    guessesMade = [];
    updateElementById(wordDashesID, dashesStr);
    updateElementById(winCountID, winCount);
    updateElementById(lossCountID, lossCount);
    updateElementById(guessesMadeID, guessesMade);
    updateElementById(guessesLeftID, guessesLeft);
    updateElementById(msgID, msg + "Good luck..." );
}

/**
    Guess a word from wordList
*/
function guessWord() {
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(secretWord);
    resetGame(secretWord.length);
}

/**
    win/loss counter incrementor and decrementor
*/
function updateGameCounter(isWon) {
    if(isWon) {
        winCount++;
        msg = "Congrats you won; lets play another game. ";
        updateElementById(msgID, msg);
    } else {
        lossCount++;
        msg = "Ohhh, you lost this one; lets play another game. ";
        updateElementById(msgID, msg);
    }
    updateElementById(winCountID, winCount);
    updateElementById(lossCountID, lossCount);
    guessWord();
}

/**
    update displayWord with correct guess
*/
function updateWord(letter) {
    var tempdisplayWord = displayedWord.split("");
    console.log(tempdisplayWord);
    for(var i = 0; i < secretWord.length; i++) {
        if(secretWord[i] === letter) {
            tempdisplayWord[i] = letter;
        }
    } 
    displayedWord = tempdisplayWord.join("");
    console.log(displayedWord);
    console.log(secretWord);
    updateElementById(wordDashesID, displayedWord);
    updateElementById(msgID, "Good guess...");
    if (displayedWord == secretWord) {
        updateGameCounter(true);
    }
}

/**
    update guesses left for incorrect guesses
*/
function updateGuessesLeft(letter) {
    if(guessesMade.indexOf(letter) === -1) {
        console.log("GM:"+guessesMade);
        guessesMade.push(letter);
        guessesLeft--;
        updateElementById(msgID, "Wrong guess, sorry...");
    } else {
        updateElementById(msgID, "You already guessed '" + letter.toUpperCase() + "'");
    }
    if (guessesLeft < 0) {
        updateGameCounter(false);
    } else {
        updateElementById(guessesLeftID, guessesLeft);
        updateElementById(guessesMadeID, guessesMade);
    }
}


/**
    listen to input and process them
*/
function processInput(letter) {
    if(secretWord.indexOf(letter) !== -1) {
        updateWord(letter);
    } else {
        updateGuessesLeft(letter);
    }
}


/**
    listen to key presses
*/
document.onkeyup = function(event){
    //convert key press into string and save it into a var
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    if (atoz.indexOf(letter) !== -1) {
        console.log(letter);
        processInput(letter);
    }
};
guessWord();