function getPokemonDetails() {
    all_pokemons = Pokemon.import_pokemon();
    console.log(all_pokemons);
    let ID = all_pokemons.pokemon_id;
    let NOM = all_pokemons.pokemon_name;
    let ATTACK = all_pokemons.base_attack;
    let DEFENSE = all_pokemons.base_defense;
    let STAMINA = all_pokemons.base_stamina;
    let TYPES = all_pokemons.types;
    /* On renvoie la GEN par rapport à l'ID du pokemon */



    let ID_number = ID.toString();

    if (ID_number.length < 2 && ID_number.length > 0) {
        ID_number = ID_number.toString().padStart(3, '00');
    }
    else if (ID_number.length > 1 && ID_number.length < 3) {
        ID_number = ID_number.toString().padStart(3, '0');
    }

    var image = document.createElement('img');
    image.src = `../webp/images/${ID}.webp`;
    document.getElementById('imageContainer').appendChild(image);

    /*// Variable contenant le nombre
let number = 733;

// Convertir le nombre en chaîne de caractères
let numberString = number.toString();

// Vérifier la longueur de la chaîne
if (numberString.length < 2) {
    // Ajouter un zéro devant si la longueur est inférieure à 2
    numberString = "0" + numberString;
}

// Afficher le résultat
console.log(numberString); // Cela affichera le nombre avec au moins 2 caractères dans la console*/



}














/* POUR LA GEN :

let generation1 = generation["Generation 1"];
let generation2 = generation["Generation 2"];
let generation3 = generation["Generation 3"];
let generation4 = generation["Generation 4"];
let generation5 = generation["Generation 5"];
let generation6 = generation["Generation 6"];
let generation7 = generation["Generation 7"];
let generation8 = generation["Generation 8"];

for (let pokemon of generation7) {
    if (pokemon.id === 733) {
        let generation_number = pokemon.generation_number;
        console.log("generation_number:", generation_number);
        break;
    }
}*/

