//Variables definition & initiation
var wordList = [
    "banana",
    "apple",
    "guava"
];
var winCount = 0;
var lossCount = 0;



//print dashes for each character of word
function printDashes(wordLen) {
    var dashesStr = "";
    for (var i = 0; i < wordLen; i++) {
        dashesStr += "__ &nbsp; ";
    }
    document.getElementById("word_dashes").innerHTML = dashesStr;
    console.log("HERE" + dashesStr);
}

printDashes(wordList[0].length);




//listen to key presses
document.onkeyup = function(event){
    //convert key press into string and save it into a var
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    
    
    //print pressed letter
    console.log(letter);
    //print guessed letter
    //console.log(charGuessed);
    
    //pass letter to verification function 
    //verifyKeyPressed(letter);
};