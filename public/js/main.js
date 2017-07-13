$(function(){
loadKeyboard();
//words
    //words array
    var words = ['squirtle', 'charmander', 'bulbasaur', 'pikachu', 'machop', 'charizard', 'venusaur', 'jigglypuff'];
    //take random word from array and split it
    var randomNumber = Math.floor(words.length * Math.random());
    var randomWord = words[randomNumber];
    var lettersInPlay = randomWord.toUpperCase().split('');
    //linespaces
    //array of spaces
    var arrayOfSpaces =[];
    //for every letter in my word, create a ___ to signify linespace
    for (var i =0; i<lettersInPlay.length; i++) {
        
        arrayOfSpaces.push('_ ');
    
    
    }
    //Display array of spaces into word-lines
    var $wordDiv = $('#word-lines');
    $wordDiv.append(arrayOfSpaces);
    //create divs for each letter in word
    //for (var i=0; i<lettersInPlay.length; i++) {
 
   // var $wordDiv = $('#word-lines');
    //$wordDiv.append('<div id="letter-div" class="d-inline">'+lettersInPlay[i]+'</div>')
    //}
    




//keyboard
function loadKeyboard(){
var letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
for(var i=0; i<letters.length; i++) {
var $keyboard = $('#keyboard')
//var button = $('<div>').addClass('btn').html(letter[i]);
$keyboard.append('<div class="btn btn-outline-success keys" id="letter-div">'+letters[i]+'</div>');
}
}

//Number of Attempts


var letterClicked;

//Check to see if letter is in linespace
function letterMatch(button) {
//if letter clicked equals one of the letters in linespace
for (var i=0; i<lettersInPlay.length; i++) {
if (letterClicked === lettersInPlay[i]){
    arrayOfSpaces[i] = letterClicked;
    // display letter in corresponding linespace
    $wordDiv.text(arrayOfSpaces.join(' '));
    //letter button turns green and is disabled
    turnKeyGreen();
    //check for word is complete/correct
    correctWord();
 
    
    
 
    // if letter is incorrect
} else if (lettersInPlay.indexOf(letterClicked) === (-1)) {
    // letter button turns red and is disabled
    turnKeyRed();
}
   
    }
}

//if word is completely correct; give an indicator of win and move to next word
function correctWord() {
       if ($wordDiv.text().replace(/ +/g, "") === randomWord.toUpperCase()) {
        alert('you won!')
            
    
    } 
            
        
    }





//turns key green
function turnKeyGreen() {
    $(event.currentTarget).removeClass('btn-outline-success');
    $(event.currentTarget).addClass('btn-success disabled');
}
//turns key red
function turnKeyRed() {
    $(event.currentTarget).removeClass('btn-outline-success');
    $(event.currentTarget).addClass('btn-danger disabled');
}

//click eventlisteners
//
$('.keys').on('click', function(event){
letterClicked = $(event.currentTarget).text();
letterMatch(event.currentTarget);




});



});



