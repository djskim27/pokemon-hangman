$(function(){
//words
    //words array
    var words = ['pikachu', 'charmander', 'bulbasaur', 'apple'];
    //take random word from array and split it
    var randomNumber = Math.floor(words.length * Math.random());
    var lettersInPlay = words[randomNumber].split('');
    //linespaces
    //array of spaces
    var arrayOfSpaces =[];
    //for every letter in my word, create a ___ to signify linespace
    for (var i =0; i<lettersInPlay.length; i++) {
        
        arrayOfSpaces.push('____ ');
        
    
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
var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
for(var i=0; i<letters.length; i++) {
var $keyboard = $('#keyboard')
//var button = $('<div>').addClass('btn').html(letter[i]);
$keyboard.append('<div class="btn btn-info">'+letters[i]+'</div>');
}

var letterClicked = "a"

//Check to see if letter is in linespace
function letterMatch() {
//if letter clicked equals one of the letters in linespace
for (var i=0; i<lettersInPlay.length; i++)
if (letterClicked === lettersInPlay[i]){
    arrayOfSpaces[i] = letterClicked;
}
    // display letter in corresponding linespace

    //letter button turns green

console.log(arrayOfSpaces);
$wordDiv.text(arrayOfSpaces.join(' '));
}
});

