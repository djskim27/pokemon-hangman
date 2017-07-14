$(function(){
loadKeyboard();

const topTierVariables = {
    pokemon: ['squirtle', 'charmander', 'bulbasaur', 'pikachu', 'machop', 'charizard', 'venusaur', 'jigglypuff'],
    $wordDiv: $('#word-lines')
}
//words
    //words array

    

    var words = topTierVariables.pokemon;
    var randomNumber = 0;
    var randomWord = '';
    var lettersInPlay = '';
    var arrayOfSpaces=[];

    
    //take random word from array and split it
    var randomNumber = Math.floor(words.length * Math.random());
   
    var randomWord = words[randomNumber];
    
    var lettersInPlay = randomWord.toUpperCase().split('');
    
    //linespaces
    
    
  
    
    
    //for every letter in my word, create a ___ to signify linespace
    
    for (var i =0; i<lettersInPlay.length; i++) {
        
        arrayOfSpaces.push('__ ');
    
    
    }
    createBoard();
    //Display array of spaces into word-lines
   // var $wordDiv = $('#word-lines');
    function createBoard(){
    topTierVariables.$wordDiv.append(arrayOfSpaces);
    //create divs for each letter in word
    //for (var i=0; i<lettersInPlay.length; i++) {
 
   // var $wordDiv = $('#word-lines');
    //$wordDiv.append('<div id="letter-div" class="d-inline">'+lettersInPlay[i]+'</div>')
    //}
    
    }
    
    



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
var numberOfAttempts = 6;

//create Number of Attempts Div
var attempts = $('#attempts').html('Attempts Remaining: ' + numberOfAttempts);
    


var letterClicked;

//Check to see if letter is in linespace
function letterMatch(button) {
//if letter clicked equals one of the letters in linespace
    for (var i=0; i<lettersInPlay.length; i++) {
    if (letterClicked === lettersInPlay[i]) {
        arrayOfSpaces[i] = letterClicked;
        // display letter in corresponding linespace
        topTierVariables.$wordDiv.text(arrayOfSpaces.join(' '));
        //letter button turns green and is disabled
        turnKeyGreen();
        //check for word is complete/correct
        correctWord();
 
    
    
 
   
    } 
   }
 // if letter is incorrect
if (lettersInPlay.indexOf(letterClicked) === (-1)) {
    // letter button turns red and is disabled
    turnKeyRed();
    
    numberOfAttempts -= 1;
    $('#attempts').html('Attempts Remaining: ' + numberOfAttempts);
    userLoses();
}
}

//if word is completely correct; give an indicator of win and move to next word
function correctWord() {
       if (topTierVariables.$wordDiv.text().replace(/ +/g, "") === randomWord.toUpperCase()) {
        alert('you won!')
        } 
}


//if user can't guess the word
function userLoses() {
        if (numberOfAttempts === 0) {
            disableKeyboard();
            alert('The pokemon got away!');
            resetGame();
        }

}
//reset Game
function resetGame() {
            topTierVariables.$wordDiv.empty();
            arrayOfSpaces = [];
            numberOfAttempts = 6;

            $('#attempts').html('Attempts Remaining: ' + numberOfAttempts);
            
            $('.keys').removeClass('btn-success btn-danger disabled');
            $('.keys').removeClass('btn-danger');
            $('.keys').removeClass('disabled');
            $('.keys').addClass('btn-outline-success')
           
}


//turns key green
function turnKeyGreen() {
    $(event.currentTarget).removeClass('btn-outline-success');
    $(event.currentTarget).addClass('btn-success');
    //$(event.currentTarget).off('click');
}
//turns key red
function turnKeyRed() {
    $(event.currentTarget).removeClass('btn-outline-success');
    $(event.currentTarget).addClass('btn-danger');
    //$(event.currentTarget).off('click');
}

//disable keyboard
function disableKeyboard () {
    $('.keys').off('click');
}

//reveal word after losing/winning
function revealWord() {} {

}


//click eventlisteners
//
$('.keys').on('click', function(event){
$(event.currentTarget).off('click');
$(event.currentTarget).addClass('disabled');
letterClicked = $(event.currentTarget).text();
letterMatch(event.currentTarget);




});



});



