// Import des données Pokémon depuis le fichier pokemons.js
let listePokemons = Pokemon.import_pokemon();
let tbody = document.getElementById('tableauPokemon');

// Fonction pour trouver le numéro de génération d'un Pokémon grâce à son ID
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

    if (idNumber.length < 2 && idNumber.length > 0) { 
        idNumber = idNumber.toString().padStart(3, '00'); 
    } else if (idNumber.length > 1 && idNumber.length < 3) { 
        idNumber = idNumber.toString().padStart(3, '0'); 
    } 

    return idNumber;
}

// Création de la liste déroulante des générations pour les filtres
function creation_liste_filtre() {
    var liste_filtre = document.getElementById('filtre_gen');
    
    var defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Génération";
    liste_filtre.appendChild(defaultOption);
    
    for (let num_gen in generation) {
        var option = document.createElement('option');
        num = num_gen.split(" ");
        option.value = num[1];
        option.textContent = num_gen;
        liste_filtre.appendChild(option);
    }
    
    liste_filtre.addEventListener('change', function() {
        filterByGenerationAndPaginate(this.value);
    });
}

// Fonction pour filtrer les Pokémon par génération
function filterByGeneration(generation) {
    var rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        var gen = rows[i].querySelector('td:nth-child(3)');
        if (generation === "" || gen.textContent === generation) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Fonction pour afficher une page spécifique de résultats tout en appliquant le filtre de génération
function showPage(page) {
    const filteredRows = getFilteredRows();
    for (let i = 0; i < filteredRows.length; i++) {
        if (i < (page - 1) * rowsPerPage || i >= page * rowsPerPage) {
            filteredRows[i].style.display = 'none';
        } else {
            filteredRows[i].style.display = '';
        }
    }
}

// Fonction pour obtenir les lignes filtrées en fonction de la génération sélectionnée
function getFilteredRows() {
    const generationFilter = document.getElementById('filtre_gen').value;
    const rows = tbody.getElementsByTagName('tr');
    const filteredRows = [];
    for (let i = 0; i < rows.length; i++) {
        const gen = rows[i].querySelector('td:nth-child(3)').textContent;
        if (generationFilter === "" || gen === generationFilter) {
            filteredRows.push(rows[i]);
        }
    }
    return filteredRows;
}

// Fonction pour mettre à jour l'état des boutons de pagination après avoir appliqué le filtre de génération
function updatePagination() {
    const filteredRows = getFilteredRows();
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const prevButton = document.getElementById('prevPageButton');
    const nextButton = document.getElementById('nextPageButton');
    const nb_page = document.getElementById('nb_page');
    
    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }

    nb_page.textContent = currentPage + " / " + totalPages;
}

// Fonction pour filtrer les Pokémon par génération et mettre à jour l'affichage de la pagination
function filterByGenerationAndPaginate(generation) {
    filterByGeneration(generation);
    currentPage = 1; // Revenir à la première page après le filtrage
    showPage(currentPage);
    updatePagination();
}

// Affichage initial des Pokémon
for (let pokemonId in listePokemons) {
    let pokemon = listePokemons[pokemonId];
    let generation = findGeneration(pokemon.pokemon_id);

    let row = tbody.insertRow();
    let cellID = row.insertCell(0);
    cellID.textContent = pokemon.pokemon_id;

    let cellNom = row.insertCell(1);
    cellNom.textContent = pokemon.pokemon_name;

    let cellGen = row.insertCell(2);
    cellGen.textContent = generation;

    let cellTypes = row.insertCell(3);
    cellTypes.textContent = pokemon.types.join(', ');

    let cellStamina = row.insertCell(4);
    cellStamina.textContent = pokemon.base_stamina;

    let cellAttack = row.insertCell(5);
    cellAttack.textContent = pokemon.base_attack;

    let cellDefense = row.insertCell(6);
    cellDefense.textContent = pokemon.base_defense;

    let idFormat = idPokemonImage(pokemon);
    let cellImage = row.insertCell(7);
    let img = document.createElement('img');
    img.src = `../webp/images/${idFormat}.webp`;
    img.alt = pokemon.pokemon_name;
    cellImage.appendChild(img);
}

// Gestion de la pagination

const rows = tbody.getElementsByTagName('tr');
const rowsPerPage = 25;
let currentPage = 1;

// Initialisation des filtres et de la pagination
creation_liste_filtre();
showPage(currentPage);
updatePagination();

// Ajout des écouteurs d'événements pour les boutons de pagination
document.getElementById('prevPageButton').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
    }
});

document.getElementById('nextPageButton').addEventListener('click', function() {
    const totalPages = Math.ceil(getFilteredRows().length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
    }
});
