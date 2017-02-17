//Variables definition & initiation

var hangMan = {
    wordList : [
        "apple",
        "apricot",
        "avocado",
        "banana",
        "bell pepper",
        "bilberry",
        "blackberry",
        "blackcurrant",
        "blood orange",
        "blueberry",
        "boysenberry",
        "breadfruit",
        "canary melon",
        "cantaloupe",
        "cherimoya",
        "cherry",
        "chili pepper",
        "clementine",
        "cloudberry",
        "coconut",
        "cranberry",
        "cucumber",
        "currant",
        "damson",
        "date",
        "dragonfruit",
        "durian",
        "eggplant",
        "elderberry",
        "feijoa",
        "fig",
        "goji berry",
        "gooseberry",
        "grape",
        "grapefruit",
        "guava",
        "honeydew",
        "huckleberry",
        "jackfruit",
        "jambul",
        "jujube",
        "kiwi fruit",
        "kumquat",
        "lemon",
        "lime",
        "loquat",
        "lychee",
        "mandarine",
        "mango",
        "mulberry",
        "nectarine",
        "nut",
        "olive",
        "orange",
        "pamelo",
        "papaya",
        "passionfruit",
        "peach",
        "pear",
        "persimmon",
        "physalis",
        "pineapple",
        "plum",
        "pomegranate",
        "pomelo",
        "purple mangosteen",
        "quince",
        "raisin",
        "rambutan",
        "raspberry",
        "redcurrant",
        "rock melon",
        "salal berry",
        "satsuma",
        "star fruit",
        "strawberry",
        "tamarillo",
        "tangerine",
        "ugli fruit",
        "watermelon"
    ],
    secretWord : "",
    displayedWord : "",
    winCount : 0,
    lossCount : 0,
    guessesMade : [],
    atoz : "abcdefghijklmnopqrstuvwxyz",
    guessesLeft : 9,
    msg : "",
    newGame : true,
    hangmanHelpMsgList : [
        "DEAD!!!", 
        "DO YOU HAVE ANY LAST WORDS",
        "PLS HELP",
        "NOT AGAIN",
        "DUMB GUESS!",
        "OH NO..."
    ],
    wordDashesID : "wordDashes",
    msgID : "msg",
    guessesMadeID : "guessesMade",
    winCountID : "winCount",
    lossCountID : "lossCount",
    guessesLeftID : "guessesLeft",
    correctTune : document.createElement("audio"),
    loseTune : document.createElement("audio"),
    mistakeTune : document.createElement("audio"),
    winTune : document.createElement("audio"),
    showHangmanParts : function(id, isVisible) {
        if (isVisible) {
            document.getElementById(id).style.visibility = 'visible';    
        } else {
            document.getElementById(id).style.visibility = 'hidden';
        }   
    },
    updateElementById : function(id, msg) {
        document.getElementById(id).innerHTML = msg; //updates html element
    },
    updateHangman : function() {
        if(this.guessesLeft >= 9) {
            for (var i = 1; i <= 9; i++) {
                this.showHangmanParts("hm-" + i, false);
                this.showHangmanParts("hm-help-text", false);
                this.showHangmanParts("hm-help-line", false);
            }
        } else {
            this.showHangmanParts("hm-"+(9-this.guessesLeft), true);
            if(this.guessesLeft < 6) {
                this.showHangmanParts("hm-help-text", true);
                this.showHangmanParts("hm-help-line", true);
                this.updateElementById("hm-help-text", this.hangmanHelpMsgList[this.guessesLeft]);
            }
        }
    },
    resetGame : function(word) {
        var dashesStr = "";
        for (var i = 0; i < word.length; i++) {
            if(word[i] === " ") {
                dashesStr += " ";
            } else {
                dashesStr += "_";
            }
        }
        this.displayedWord = dashesStr;
        this.guessesLeft = 9;
        this.guessesMade = [];
        this.updateElementById(this.wordDashesID, dashesStr);
        this.updateElementById(this.winCountID, this.winCount);
        this.updateElementById(this.lossCountID, this.lossCount);
        this.updateElementById(this.guessesMadeID, this.guessesMade);
        this.updateElementById(this.guessesLeftID, this.guessesLeft);
        this.updateElementById(this.msgID, "Good luck..." );
        this.updateHangman();
    },
    /**
    Guess a word from wordList
    */
    guessWord : function() {
        this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
        //this.secretWord = this.wordList[4].toUpperCase();
        console.log(this.secretWord);
        this.resetGame(this.secretWord);
    },
    /**
    win/loss counter incrementor and decrementor
*/
    updateGameCounter : function(isWon) {
        if(isWon) {
            this.winCount++;
            this.winTune.play();
            this.msg = "<strong>Congrats you won!!!</strong>; press ENTER to play another game. ";
            this.updateElementById(this.msgID, this.msg);
            this.updateElementById("hm-help-text", "AWESOME!!!");
        } else {
            this.lossCount++;
            this.loseTune.play();
            this.msg = "<strong>Sorry, you lost</strong>; secret word was '" + this.secretWord.toUpperCase() + "'; press ENTER to play another game. ";
            this.updateElementById(this.msgID, this.msg);
        }
        this.updateElementById(this.winCountID, this.winCount);
        this.updateElementById(this.lossCountID, this.lossCount);
        this.newGame = true;
    },
    /**
    update displayWord with correct guess
    */
    updateWord : function(letter) {
        var tempdisplayWord = this.displayedWord.split("");
        console.log(tempdisplayWord);
        for(var i = 0; i < this.secretWord.length; i++) {
            if(this.secretWord[i] === letter) {
                tempdisplayWord[i] = letter;
            }
        } 
        this.displayedWord = tempdisplayWord.join("");
        console.log(this.displayedWord);
        console.log(this.secretWord);
        this.correctTune.pause();
        this.correctTune.currentTime = 0;
        this.correctTune.play();
        this.updateElementById(this.wordDashesID, this.displayedWord);
        this.updateElementById(this.msgID, "Good guess...");
        if (this.displayedWord == this.secretWord) {
            this.updateGameCounter(true);
        }
    },
    
    /**
    update guesses left for incorrect guesses
    */
    updateGuessesLeft : function(letter) {
        if(this.guessesMade.indexOf(letter) === -1) {
            console.log("GM:"+this.guessesMade);
            this.guessesMade.push(letter);
            this.guessesLeft--;
            this.updateElementById(this.msgID, "Wrong guess, sorry...");
        } else {
            this.updateElementById(this.msgID, "You already guessed '" + letter.toUpperCase() + "'");
        }
        if (this.guessesLeft < 1) {
            this.updateElementById(this.guessesLeftID, this.guessesLeft);
            this.updateGameCounter(false);
        } else {
            this.mistakeTune.pause();
            this.mistakeTune.currentTime = 0;
            this.mistakeTune.play();
            this.updateElementById(this.guessesLeftID, this.guessesLeft);
            this.updateElementById(this.guessesMadeID, this.guessesMade);
        }
        this.updateHangman();
    },
    /**
    listen to input and process them
    */
    processInput : function(letter) {
        if(this.secretWord.indexOf(letter) !== -1) {
            this.updateWord(letter);
        } else {
            this.updateGuessesLeft(letter);
        }
    }

};

hangMan.correctTune.setAttribute("src", "assets/music/correct.mp3");
hangMan.mistakeTune.setAttribute("src", "assets/music/mistake.mp3");
hangMan.winTune.setAttribute("src", "assets/music/win.wav");
hangMan.loseTune.setAttribute("src", "assets/music/lose.wav");


var reader = new FileReader();
reader.onload = function(event) {
    
}

/**
    listen to key presses
*/
document.onkeyup = function(event){
    //press enter to start a new game
    if ((event.keyCode === 13) && (hangMan.newGame)) {
        hangMan.guessWord();
        hangMan.newGame = false;
    }
    //convert key press into string and save it into a var
    if(!hangMan.newGame) {
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        if (hangMan.atoz.indexOf(letter) !== -1) {
            hangMan.processInput(letter.toUpperCase());
        }    
    }
    
    
    //guessWord();
};
hangMan.guessWord();
hangMan.newGame = false;