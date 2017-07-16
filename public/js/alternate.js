$(function() {
//array of pokemon objects
const pokemon = [
    {
        name: 'Bulbasaur',
        img:'https://vignette4.wikia.nocookie.net/nintendo/images/4/43/Bulbasaur.png/revision/latest?cb=20141002083518&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/bulbasaur.gif'
    }, 
    {
        name: 'Charmander',
        img:'https://vignette1.wikia.nocookie.net/nintendo/images/5/56/Charmander.png/revision/latest?cb=20141002083351&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/charmander.gif'

    },
    {
        name: 'Squirtle',
        img:'https://vignette2.wikia.nocookie.net/nintendo/images/e/e3/Squirtle.png/revision/latest?cb=20141002083243&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/squirtle.gif'
    },
    {
        name: 'Pikachu',
        img:'https://vignette2.wikia.nocookie.net/nintendo/images/7/77/Pikachu.png/revision/latest?cb=20141002082401&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/pikachu.gif'
    },
    {
        name: 'Articuno',
        img: 'https://vignette1.wikia.nocookie.net/nintendo/images/5/52/Articuno.png/revision/latest?cb=20141002090055&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/articuno.gif'
    },
    {
        name: 'Moltres',
        img: 'https://vignette2.wikia.nocookie.net/nintendo/images/0/01/Moltres.png/revision/latest?cb=20141002090414&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/moltres.gif'
    },
    {
        name: 'Zapdos',
        img: 'https://vignette2.wikia.nocookie.net/nintendo/images/d/d8/Zapdos.png/revision/latest?cb=20141002090124&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/zapdos.gif'
    },
    {
        name: 'Charizard',
        img: 'https://vignette2.wikia.nocookie.net/nintendo/images/9/95/Charizard.png/revision/latest?cb=20141002083306&path-prefix=en',
        gif: 'http://www.pokestadium.com/sprites/black-white/animated/charizard.gif'
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
    $pokeballs: ('<img src="css/images/pokeball.png" class="pokeball-div">'),
    win: 0,
    loss: 0,



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
    gameVariables.$attemptsDiv.html('Pokeballs Remaining:');
    //player has 6 pokeballs which represent lives
    erasePokeball();
    pokeballCounter();
    //show win and loss numbers in pokebox modal
    $('.win').html('Caught: ' + gameVariables.win);
    $('.loss').html('Ran Away: ' + gameVariables.loss);
    

}

//create keyboard for game
function createKeyboard() {
    
   // var letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    var letters1 = 'qwertyuiop'.toUpperCase().split('');
    var letters2 = 'asdfghjkl'.toUpperCase().split('');
    var letters3 = 'zxcvbnm'.toUpperCase().split('');
    var $keyboard1 = $('#keyboard1');
    var $keyboard2 = $('#keyboard2');
    var $keyboard3 = $('#keyboard3');
    for(var i=0; i<letters1.length; i++) {

       
         //var button = $('<div>').addClass('btn').html(letter[i]);
        $keyboard1.append('<div class="btn btn-outline-primary keys white" id="letter-div">'+letters1[i]+'</div>');
        
    }
    for(var i=0; i<letters2.length; i++) {

       
         //var button = $('<div>').addClass('btn').html(letter[i]);
        $keyboard2.append('<div class="btn btn-outline-primary keys white" id="letter-div">'+letters2[i]+'</div>');
        
    }
    for(var i=0; i<letters3.length; i++) {

       
         //var button = $('<div>').addClass('btn').html(letter[i]);
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

createPuzzle();
createKeyboard();
console.log(gameVariables.lettersInPlay);
console.log(gameVariables.arrayOfSpaces);



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
                function winQuote() {alert('you caught ' + gameVariables.randomPokemon + '!');}
                setTimeout(winQuote,500);

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
                alert('The Pokemon has run away!')
            };
            setTimeout(runAway,500);
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
    //test for pokebox
    
  

});