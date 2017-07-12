$(function(){
//keyboard
var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
for(var i=0; i<letters.length; i++) {
var keyboard = $('#keyboard')
//var button = $('<div>').addClass('btn').html(letter[i]);
keyboard.append('<div class="btn btn-success">'+letters[i]+'</div>');
}
});