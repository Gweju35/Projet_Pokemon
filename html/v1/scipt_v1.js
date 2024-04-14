// Import des données Pokémon depuis le fichier pokemons.js
let listePokemons = Pokemon.import_pokemon();

// endroit où on va afficher les Pokémons
let tbody = document.getElementById('tableauPokemon'); 

// On parcourt la liste d'objets des Pokémons et on créer une ligne de tableau pour chaque
for (let pokemonId in listePokemons) {
    let pokemon = listePokemons[pokemonId];
    let generation = findGeneration(pokemon.pokemon_id); // on cherche la gen du Pokémon

    // on créer une nouvelle ligne de tableau
    let row = tbody.insertRow();

    // on remplis les cellules de la ligne avec les données 
    let cellID = row.insertCell(0);
    cellID.textContent = pokemon.pokemon_id; // id du Pokémon

    let cellNom = row.insertCell(1);
    cellNom.textContent = pokemon.pokemon_name; // nom du Pokémon

    let cellGen = row.insertCell(2);
    cellGen.textContent = generation; // génération du Pokémon

    let cellTypes = row.insertCell(3);
    cellTypes.textContent = pokemon.types.join(', '); // types du Pokémon

    let cellStamina = row.insertCell(4);
    cellStamina.textContent = pokemon.base_stamina; // stamina du Pokémon

    let cellAttack = row.insertCell(5);
    cellAttack.textContent = pokemon.base_attack; // attaque du Pokémon

    let cellDefense = row.insertCell(6);
    cellDefense.textContent = pokemon.base_defense; // défense du Pokémon

    let idFormat = idPokemonImage(pokemon); // on formate l'id du Pokémon pour retrouver l'image
    let cellImage = row.insertCell(7);
    let img = document.createElement('img'); // on créer la balise img
    img.src = `../webp/images/${idFormat}.webp`; // image du Pokémon
    img.alt = pokemon.pokemon_name; 
    cellImage.appendChild(img); 
}

// Fonction pour trouver le generation_number d'un Pokémon grâce à son ID
function findGeneration(pokemonId) {
    for (let genName in generation) {
        let pokemonsInGen = generation[genName];
        for (let pokemon of pokemonsInGen) {
            if (pokemon.id === pokemonId) {
                return pokemon.generation_number;
            }
        }
    }
    return "Génération inconnue";
}

// Fonction pour formater l'ID du Pokémon pour retrouver l'image
function idPokemonImage(pokemon) {
    let idNumber = pokemon.pokemon_id.toString();

    if (idNumber.length < 2 && idNumber.length > 0) { // Si l'ID a 1 seul chiffre on lui rajoute '00' devant
        idNumber = idNumber.toString().padStart(3, '00'); // 3 devient 003
    }

    else if (idNumber.length > 1 && idNumber.length < 3) { // Si l'ID a 2 chiffres on lui rajoute '0' devant
        idNumber = idNumber.toString().padStart(3, '0'); // 11 devient 011
    } 

    return idNumber;
}