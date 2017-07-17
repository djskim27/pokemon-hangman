$(function() {

//game variables
const gameVariables = {
    randomNumber: 0,
    randomPokemon: '',
    lettersInPlay:'',
    arrayOfSpaces: [],
    $wordDiv: $('#word-lines'),
    numberOfAttempts: 6,
    $attemptsDiv: $('#attempts'),
    $pokemonImg: $('#pokemon-pic'),
    $playAgain: $('<div class="btn btn-outline-danger white">Next Pokemon</div>'),
    $pokeballs: ('<img src="css/images/pokeball.png" class="pokeball-div">'),
    win: 0,
    loss: 0,



};
//Start Game
createPuzzle();
createKeyboard();
//choose random pokemon and display line spaces for letters
function createPuzzle() {

    gameVariables.randomNumber = Math.floor(pokemon.length * Math.random());
    gameVariables.randomPokemon = pokemon[gameVariables.randomNumber].name;
    gameVariables.lettersInPlay = gameVariables.randomPokemon.toUpperCase().split('');
    //display pokemon image
     var img =$('<img class="hidden img-size img-fluid" />').attr('src', pokemon[gameVariables.randomNumber].img).hide().fadeIn(200);
    img.appendTo(gameVariables.$pokemonImg);
    //for every letter in pokemon name, create a linespace
    for (var i=0; i<gameVariables.lettersInPlay.length; i++) {

        gameVariables.arrayOfSpaces.push('_ ');

    };
    
    //visibily show linespaces in word-lines div
    gameVariables.$wordDiv.append(gameVariables.arrayOfSpaces);

    //show the player has 6 attempts
    gameVariables.$attemptsDiv.html('Pokeballs Remaining:');
    //player has 6 pokeballs which represent lives
    erasePokeball();
    pokeballCounter();

    //shows pokebox button at bottom of page
    $('#pokebox').append('<button type="button" id ="poke-button" class="btn btn-outline-primary white" data-toggle="modal" data-target="#pokeboxModal">Pokebox</button>')
   
    //show win and loss numbers in pokebox modal
    $('.win').html('Caught: ' + gameVariables.win);
    $('.loss').html('Ran Away: ' + gameVariables.loss);
    

}

//create keyboard for game
function createKeyboard() {
    
    var letters1 = 'qwertyuiop'.toUpperCase().split('');
    var letters2 = 'asdfghjkl'.toUpperCase().split('');
    var letters3 = 'zxcvbnm'.toUpperCase().split('');
    var $keyboard1 = $('#keyboard1');
    var $keyboard2 = $('#keyboard2');
    var $keyboard3 = $('#keyboard3');
    //first row
    for(var i=0; i<letters1.length; i++) {

        $keyboard1.append('<div class="btn btn-outline-primary keys white" id="letter-div">'+letters1[i]+'</div>');
        
    }
    //second row
    for(var i=0; i<letters2.length; i++) {

        $keyboard2.append('<div class="btn btn-outline-primary keys white" id="letter-div">'+letters2[i]+'</div>');
        
    }
    //third row
    for(var i=0; i<letters3.length; i++) {

        $keyboard3.append('<div class="btn btn-outline-primary keys white" id="letter-div">'+letters3[i]+'</div>');
        
    }

    //adding click function to keys
$('.keys').on('click', function(event){

    var $keyClickedOn = $(event.target);
    var $keyText = $keyClickedOn.text();
    $keyClickedOn.off('click');

    playGame($keyText);

});
    
}






//play game and try to guess/match correct letters for pokemon
function playGame(x) {
    //if clicked letter is correct
    for (var i=0; i<gameVariables.lettersInPlay.length; i++) {

        if (x === gameVariables.lettersInPlay[i]) {

            gameVariables.arrayOfSpaces[i] = x;
        //display letter in corresponding linespace
            var newArrayOfSpaces = gameVariables.arrayOfSpaces.join(' ');
            
            gameVariables.$wordDiv.text(newArrayOfSpaces);
        
        //letter turns green to indicate correct choice
            $(event.currentTarget).removeClass('btn-outline-primary white');
            $(event.currentTarget).addClass('btn-success');
        
        //check if user guesses word correctly 100 percent
            if (gameVariables.$wordDiv.text().replace(/ +/g, "") === gameVariables.randomPokemon.toUpperCase()) {

                //show winner user won
                function winQuote() {alert('You caught ' + gameVariables.randomPokemon + '!');}
                setTimeout(winQuote,300);

                //reveal pokemon image
                $('.img-size').removeClass('hidden');
                //disable keyboard
                $('.keys').off('click');
                //store caught pokemon in pokebox
                var pokeGif = $('<img class="gif-size">').attr('src', pokemon[gameVariables.randomNumber].gif);

                pokeGif.appendTo($('.modal-body'));
                //update win stat
                gameVariables.win += 1;
                $('.win').html('Caught: ' + gameVariables.win)
                //display play again option
                playAgain();

            } 
        }
    }
    //if clicker letter is incorrect
    if (gameVariables.lettersInPlay.indexOf(x) === -1) {

        //letter turns red and disabled to indicate incorrect choice
        $(event.currentTarget).removeClass('btn-outline-primary');
        $(event.currentTarget).addClass('btn-danger disabled');
        //number of attempts decrease by 1
        gameVariables.numberOfAttempts -= 1;
        //update pokeball
        erasePokeball();
        pokeballCounter();
        //if user's attempts reach 0, user loses game.
        if (gameVariables.numberOfAttempts === 0) {

            //disable keyboard
            $('.keys').off('click');

            //show the pokemon's identity name
            gameVariables.$wordDiv.empty();
            gameVariables.$wordDiv.html(gameVariables.lettersInPlay.join(' '));

            //indicate that opponent has lost
            function runAway(){
                alert(gameVariables.randomPokemon +  ' ran away!')
            };
            setTimeout(runAway,300);
            //play again button appears
            playAgain();
             //update loss stat
            gameVariables.loss += 1
            $('.loss').html('Ran Away: ' + gameVariables.loss);
            
            
        }

    }
    
}
//pressing play again button allows user to reload new puzzle
function playAgain(){

    //attach play again button below keyboard
    function playAgainButton() {
        $('#pokebox').append(gameVariables.$playAgain);
    };
    setTimeout(playAgainButton,400);
    //click event for play again button
    gameVariables.$playAgain.on('click', function(event){
        //remove button
        $(event.currentTarget).remove();
        //reset game variables
        gameVariables.randomNumber = 0;
        gameVariables.randomPokemon = '';
        gameVariables.lettersInPlay = '';
        gameVariables.arrayOfSpaces = [];
        gameVariables.numberOfAttempts = 6;
        //empty gamepuzzle
        gameVariables.$wordDiv.empty();
        gameVariables.$pokemonImg.empty();
        gameVariables.$attemptsDiv.empty();
        $('#pokebox').empty();
        //empty keyboard
        $('#keyboard1').empty();
        $('#keyboard2').empty();
        $('#keyboard3').empty();
        //load gamepuzzle
        createPuzzle();
        //load keyboard
        createKeyboard();

        });

    
    }
    //pokeball life counter
    function pokeballCounter() {
        for (var i=0; i<gameVariables.numberOfAttempts; i++) {
               $('#pokeballs').append(gameVariables.$pokeballs)
        }
    }
    //erase pokeball div
    function erasePokeball() {
        $('#pokeballs').empty();
    }
    //pokebox modal 
    $('#pokeboxModal').on('shown.bs.modal', function () {
        $('#pokeboxTitle').focus()
    })
    //restart the game and release all pokemon
    $('#restart').on('click', function(){
        alert('All your pokemon have been released!');
        location.reload();
        

    });

    
    
  

});