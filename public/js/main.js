//keyboard
var letters = 'abcdefghijklmnopqrstuvwxyz'.toSplit();
letters.forEach(i, function(){
    $('#keyboard').append('<div>').append(`${i}`)
});
