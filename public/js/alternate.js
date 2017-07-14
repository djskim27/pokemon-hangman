//array of pokemon objects
const pokemon = [
    {
        name: 'bulbasaur',
        img:'https://vignette4.wikia.nocookie.net/nintendo/images/4/43/Bulbasaur.png/revision/latest?cb=20141002083518&path-prefix=en'

    }, 
    {
        name: 'charmander',
        img:'https://vignette1.wikia.nocookie.net/nintendo/images/5/56/Charmander.png/revision/latest?cb=20141002083351&path-prefix=en'

    },
    {
        name: 'squirtle',
        img:'https://vignette2.wikia.nocookie.net/nintendo/images/e/e3/Squirtle.png/revision/latest?cb=20141002083243&path-prefix=en'

    },
    {
        name: 'pikachu',
        img:'https://vignette2.wikia.nocookie.net/nintendo/images/7/77/Pikachu.png/revision/latest?cb=20141002082401&path-prefix=en'

    }
];

//game variables
const gameVariables = {
    randomNumber: 0,
    randomPokemon: '',
    lettersInPlay:'',
    arrayOfSpaces: [],

};
//choose random pokemon and display line spaces for letters
function createPuzzle() {
    gameVariables.randomNumber = Math.floor(pokemon.length * Math.random());
    gameVariables.randomPokemon = pokemon[gameVariables.randomNumber].name;
    gameVariables.lettersInPlay = gameVariables.randomPokemon.toUpperCase().split('');
    
    console.log(gameVariables.lettersInPlay);

}

createPuzzle();