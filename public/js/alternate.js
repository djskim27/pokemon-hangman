$(function() {
//array of pokemon objects
const pokemon = [
    {
        name: 'Bulbasaur',
        img:'https://vignette4.wikia.nocookie.net/nintendo/images/4/43/Bulbasaur.png/revision/latest?cb=20141002083518&path-prefix=en'

    }, 
    {
        name: 'Charmander',
        img:'https://vignette1.wikia.nocookie.net/nintendo/images/5/56/Charmander.png/revision/latest?cb=20141002083351&path-prefix=en'

    },
    {
        name: 'Squirtle',
        img:'https://vignette2.wikia.nocookie.net/nintendo/images/e/e3/Squirtle.png/revision/latest?cb=20141002083243&path-prefix=en'

    },
    {
        name: 'Pikachu',
        img:'https://vignette2.wikia.nocookie.net/nintendo/images/7/77/Pikachu.png/revision/latest?cb=20141002082401&path-prefix=en'

    },
    {
        name: 'Articuno',
        img: 'https://vignette1.wikia.nocookie.net/nintendo/images/5/52/Articuno.png/revision/latest?cb=20141002090055&path-prefix=en'
    },
    {
        name: 'Moltres',
        img: 'https://vignette2.wikia.nocookie.net/nintendo/images/0/01/Moltres.png/revision/latest?cb=20141002090414&path-prefix=en'
    },
    {
        name: 'Zapdos',
        img: 'https://vignette2.wikia.nocookie.net/nintendo/images/d/d8/Zapdos.png/revision/latest?cb=20141002090124&path-prefix=en'
    },
    {
        name: 'Charizard',
        img: 'https://vignette2.wikia.nocookie.net/nintendo/images/9/95/Charizard.png/revision/latest?cb=20141002083306&path-prefix=en'
    }
];

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
    $playAgain: $('<div class="btn btn-outline-success">Play Again</div>'),
    $pokeballs: $('<img src="images/pokeball.png" class="pokeball-div">')



};
//choose random pokemon and display line spaces for letters
function createPuzzle() {

    gameVariables.randomNumber = Math.floor(pokemon.length * Math.random());
    gameVariables.randomPokemon = pokemon[gameVariables.randomNumber].name;
    gameVariables.lettersInPlay = gameVariables.randomPokemon.toUpperCase().split('');
    //display pokemon image
     var img =$('<img class="hidden img-size" />').attr('src', pokemon[gameVariables.randomNumber].img);
    img.appendTo(gameVariables.$pokemonImg);
    //for every letter in pokemon name, create a linespace
    for (var i=0; i<gameVariables.lettersInPlay.length; i++) {

        gameVariables.arrayOfSpaces.push('__ ');

    };
    
    //visibily show linespaces in word-lines div
    gameVariables.$wordDiv.append(gameVariables.arrayOfSpaces);

    //show the player has 6 attempts
    gameVariables.$attemptsDiv.html('Attempts Remaining: ' + gameVariables.numberOfAttempts);
    //player has 6 pokeballs which represent lives
    $('#pokeballs').append(gameVariables.$pokeballs);
    

}

//create keyboard for game
function createKeyboard() {
    var letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    for(var i=0; i<letters.length; i++) {

        var $keyboard = $('#keyboard')
         //var button = $('<div>').addClass('btn').html(letter[i]);
        $keyboard.append('<div class="btn btn-outline-success keys" id="letter-div">'+letters[i]+'</div>');
    }
}

createPuzzle();
createKeyboard();
console.log(gameVariables.lettersInPlay);
console.log(gameVariables.arrayOfSpaces);

//adding click function to keys
$('.keys').on('click', function(event){

    var $keyClickedOn = $(event.target);
    var $keyText = $keyClickedOn.text();
    $keyClickedOn.off('click');

    playGame($keyText);

});

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
            $(event.currentTarget).removeClass('btn-outline-success');
            $(event.currentTarget).addClass('btn-success');
        
        //check if user guesses word correctly 100 percent
            if (gameVariables.$wordDiv.text().replace(/ +/g, "") === gameVariables.randomPokemon.toUpperCase()) {

                //show winner user won
                alert('you caught ' + gameVariables.randomPokemon + '!')
                //reveal pokemon image
                $('.img-size').removeClass('hidden');
                //disable keyboard
                $('.keys').off('click');
                //display play again option
                playAgain();

            } 
        }
    }
    //if clicker letter is incorrect
    if (gameVariables.lettersInPlay.indexOf(x) === -1) {

        //letter turns red and disabled to indicate incorrect choice
        $(event.currentTarget).removeClass('btn-outline-success');
        $(event.currentTarget).addClass('btn-danger disabled');
        //number of attempts decrease by 1
        gameVariables.numberOfAttempts -= 1;
        //update attempts div
        gameVariables.$attemptsDiv.html('Attempts Remaining: ' + gameVariables.numberOfAttempts);
        //if user's attempts reach 0, user loses game.
        if (gameVariables.numberOfAttempts === 0) {

            //disable keyboard
            $('.keys').off('click');
            //show the pokemon's identity name
            gameVariables.$wordDiv.empty();
            gameVariables.$wordDiv.html(gameVariables.lettersInPlay.join(' '));

            //indicate that opponent has lost
            function runAway(){
                alert('The Pokemon has run away!')
            };
            setTimeout(runAway,500);
            //play again button appears
            playAgain();
            
        }

    }
    
}
//pressing play again button allows user to reload new puzzle
function playAgain(){

    //attach play again button below keyboard
    $('#main').append(gameVariables.$playAgain);
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
        //empty keyboard
        $('#keyboard').empty();
        //load gamepuzzle
        createPuzzle();
        //load keyboard
        createKeyboard();
        //click event for new keyboard (NOT DRY I KNOW)
        $('.keys').on('click', function(event){

            var $keyClickedOn = $(event.target);
            var $keyText = $keyClickedOn.text();
            $keyClickedOn.off('click');
            $keyClickedOn.addClass('disabled');
            playGame($keyText);

            });
        });

    
    }
    //key event experimentation
    


});