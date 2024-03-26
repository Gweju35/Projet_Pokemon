let all_pokemons = Pokemon.import_pokemon(); // Liste tous les pokémons + leur type et attaques
// console.table(all_pokemons);

let all_types = Pokemon.getTypes(); // Liste tous les types de pokémons
// console.table(all_types);

let all_attacks = Pokemon.getAttacks(); // Liste toutes les attaques
// console.table(all_attacks);

let effectiveness = Pokemon.importEffectiveness(); // Tableau de rapport d'efficacité entre les types de pokémons
// console.table(effectiveness);

function test(){
    console.clear();
    console.table(all_pokemons);
}


// Donne la liste des Pokémons par type
function testGetPokemonsByType() {
    console.clear();
    let testInput = document.getElementById("testInput").value;
    let typePokemons = Pokemon.getPokemonsByType(testInput, all_pokemons);
    console.table(typePokemons);
}


// Donne la liste des Pokémons par attaque
function testGetPokemonsByAttack() {
    console.clear();
    let testInput = document.getElementById("testInput").value; 
    let attackPokemons = Pokemon.getPokemonsByAttack(testInput, all_pokemons);
    console.table(attackPokemons);
}


// Donne la liste des attaques par type
function testGetAttacksByType() {
    console.clear();
    let testInput = document.getElementById("testInput").value; 
    let attackTypes = Pokemon.getAttacksByType(testInput, all_attacks);
    console.table(attackTypes);
}


// Donne la liste des Pokémons triés par nom dans l'ordre alphabétique
function testSortPokemonByName() {
    console.clear();
    let sortedPokemonByName = Pokemon.sortPokemonByName(all_pokemons);
    console.table(sortedPokemonByName);
}


// Donne la liste des Pokémons triés dans l’ordre décroissant d’endurance (stamina)
function testSortPokemonByStamina() {
    console.clear();
    let sortedPokemonByStamina = Pokemon.sortPokemonByStamina(all_pokemons);
    console.table(sortedPokemonByStamina);
}


// Donne la liste des Pokémons pour lesquels l’attaque choisie est la plus efficace
function testGetWeakestEnemies() {
    console.clear();
    let testInput = document.getElementById("testInput").value; 
    let weakestPokemon = Pokemon.getWeakestEnemies(testInput, all_pokemons, all_attacks, effectiveness);
    console.table(weakestPokemon);
}


// Donne la liste des types d’attaque les plus efficaces contre un Pokémon donné
function testGetBestAttackTypesForEnemy() {
    console.clear();
    let testInput = document.getElementById("testInput").value; 
    let bestAttackTypes = Pokemon.getBestAttackTypesForEnemy(testInput, effectiveness, all_pokemons);
    console.table(bestAttackTypes);
}