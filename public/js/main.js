$(function(){
//words
    //words array
    var words = ['Richard', 'David', 'Susie', 'Jace'];
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
$keyboard.append('<div class="btn btn-success">'+letters[i]+'</div>');
}




});