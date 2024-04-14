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

// Fonction pour afficher les Pokémons par page
function showPage(page) {
    for (let i = 0; i < rows.length; i++) {
        if (i < (page - 1) * rowsPerPage || i >= page * rowsPerPage) {
            rows[i].style.display = 'none';
        } else {
            rows[i].style.display = '';
        }
    }
}

// les boutons
function updateButtons() {
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const prevButton = document.getElementById('prevPageButton');
    const nextButton = document.getElementById('nextPageButton');
    const nb_page = document.getElementById('nb_page');
    
    // Désactive le bouton précédent sur la première page
    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    // Désactive le bouton suivant sur la dernière page
    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }

    nb_page.textContent = currentPage + " / " + totalPages;
}

const rows = tbody.getElementsByTagName('tr');
const rowsPerPage = 25;
let currentPage = 1;

showPage(currentPage);
updateButtons();

// page précédente
document.getElementById('prevPageButton').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateButtons();
    }
});

// page suivante
document.getElementById('nextPageButton').addEventListener('click', function() {
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateButtons();
    }
});