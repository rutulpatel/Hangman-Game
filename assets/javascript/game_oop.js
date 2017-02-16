//Variables definition & initiation

var wordList = [
    "BANANA",
    "APPLE",
    "GUAVA",
    "CHERRY",
    "MANGO",
    "PINEAPPLE",
    "STRAWBERRY"
];
var secretWord = "";
var displayedWord = "";
var winCount = 0;
var lossCount = 0;
var guessesMade = [];
var atoz = "abcdefghijklmnopqrstuvwxyz";
var guessesLeft = 9;
var msg = "";
var newGame = true;
var hangmanHelpMsgList = [
    "U KILLED ME!!!", 
    "DO YOU HAVE ANY LAST WORDS",
    "PLS HELP",
    "NOT AGAIN",
    "DUMB GUESS!",
    "OH NO..."
];

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

/**
    update html elements by id
*/
function updateElementById(id, msg) {
    document.getElementById(id).innerHTML = msg; //updates html element
}

/**
    update hangman sketch
*/
function updateHangman(guessesLeft) {
    if(guessesLeft >= 9) {
        for (var i = 1; i <= 9; i++) {
            showHangmanParts("hm-" + i, false);
            showHangmanParts("hm-help-text", false);
            showHangmanParts("hm-help-line", false);
        }
    } else {
        showHangmanParts("hm-"+(9-guessesLeft), true);
        if(guessesLeft < 6) {
            showHangmanParts("hm-help-text", true);
            showHangmanParts("hm-help-line", true);
            updateElementById("hm-help-text", hangmanHelpMsgList[guessesLeft]);
        }
    }
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
    updateElementById(msgID, "Good luck..." );
    updateHangman(guessesLeft);
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
        msg = "<strong>Congrats you won!!!</strong>; press ENTER to play another game. ";
        updateElementById(msgID, msg);
        updateElementById("hm-help-text", "YOU ARE AWESOME!!!");
    } else {
        lossCount++;
        msg = "<strong>Sorry, you lost</strong>; secret word was '" + secretWord.toUpperCase() + "'; press ENTER to play another game. ";
        updateElementById(msgID, msg);
    }
    updateElementById(winCountID, winCount);
    updateElementById(lossCountID, lossCount);
    newGame = true;
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
    if (guessesLeft < 1) {
        updateElementById(guessesLeftID, guessesLeft);
        updateGameCounter(false);
    } else {
        updateElementById(guessesLeftID, guessesLeft);
        updateElementById(guessesMadeID, guessesMade);
    }
    updateHangman(guessesLeft);
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
    //press enter to start a new game
    if ((event.keyCode === 13) && (newGame)) {
        guessWord();
        newGame = false;
    }
    //convert key press into string and save it into a var
    if(!newGame) {
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        if (atoz.indexOf(letter) !== -1) {
            processInput(letter.toUpperCase());
        }    
    }
    
    
    //guessWord();
};
guessWord();
newGame = false;