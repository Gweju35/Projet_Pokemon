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

// Fonction pour trier les Pokémon par colonne
function sortPokemons(column) {
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = column.dataset.sort === 'asc';

    // Tri des lignes en fonction de la valeur de la colonne
    rows.sort((rowA, rowB) => {
        let valueA = rowA.querySelector(`td:nth-child(${column.cellIndex + 1})`).textContent;
        let valueB = rowB.querySelector(`td:nth-child(${column.cellIndex + 1})`).textContent;

        // Tri numérique pour les colonnes numériques
        if (!isNaN(valueA) && !isNaN(valueB)) {
            return isAscending ? valueA - valueB : valueB - valueA;
        }

        // Tri alphabétique pour les colonnes de texte
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    // Inversion du sens du tri pour la prochaine fois
    column.dataset.sort = isAscending ? 'desc' : 'asc';

    // Suppression des anciennes lignes
    rows.forEach(row => tbody.removeChild(row));

    // Ajout des lignes triées
    rows.forEach(row => tbody.appendChild(row));
}

// Ajout d'événements de clic pour le tri des colonnes
document.querySelectorAll('th').forEach(header => {
    if (header.id !== 'urlHeader') { // Exclure l'en-tête de l'image
        header.addEventListener('click', () => {
            sortPokemons(header);
            // Retirer la classe de surbrillance de toutes les cellules d'en-tête
            document.querySelectorAll('th').forEach(th => th.classList.remove('highlight'));
            // Ajouter la classe de surbrillance à la cellule de l'en-tête de colonne cliquée
            header.classList.add('highlight');
        });
    }
});

// Création de la liste déroulante des générations pour les filtres
function creation_liste_filtre() {
    var liste_filtre_gen = document.getElementById('filtre_gen');
    
    var defaultOptionGen = document.createElement('option');
    defaultOptionGen.value = "";
    defaultOptionGen.textContent = "Génération";
    liste_filtre_gen.appendChild(defaultOptionGen);
    
    for (let num_gen in generation) {
        var optionGen = document.createElement('option');
        num = num_gen.split(" ");
        optionGen.value = num[1];
        optionGen.textContent = num_gen;
        liste_filtre_gen.appendChild(optionGen);
    }

    liste_filtre_gen.addEventListener('change', filterPokemons);
}

function creation_liste_type() {
    var liste_filtre_type = document.getElementById('filtre_type');
    var typesUniques = new Set(); // pour récupérer les valeurs en unique

    var defaultOptionType = document.createElement('option');
    defaultOptionType.value = "";
    defaultOptionType.textContent = "Type";
    liste_filtre_type.appendChild(defaultOptionType);

    for (let type of Pokemon.getTypes()) {
        var un_type = type.types;
        // vérifie si il est unique 
        if (!typesUniques.has(un_type)) {
            var optionType = document.createElement('option');
            optionType.value = un_type;
            optionType.textContent = un_type;
            liste_filtre_type.appendChild(optionType);
            typesUniques.add(un_type);
        }
    }

    liste_filtre_type.addEventListener('change', filterPokemons);
}

// Fonction pour filtrer les Pokémon par génération, type et/ou nom
function filterPokemons() {
    const generationFilter = document.getElementById('filtre_gen').value;
    const typeFilter = document.getElementById('filtre_type').value;
    const nameFilter = document.getElementById('filtre_nom').value.toLowerCase().trim();
    const rows = tbody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const gen = rows[i].querySelector('td:nth-child(3)').textContent;
        const types = rows[i].querySelector('td:nth-child(4)').textContent.split(', ');
        const name = rows[i].querySelector('td:nth-child(2)').textContent.toLowerCase().trim();
        
        const generationMatch = generationFilter === "" || gen === generationFilter;
        const typeMatch = typeFilter === "" || types.includes(typeFilter);
        const nameMatch = nameFilter === "" || name.toLowerCase().indexOf(nameFilter) !== -1;

        if (generationMatch && typeMatch && nameMatch) {
                rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }

    currentPage = 1; 
    showPage(currentPage); 
    updatePagination(); 
}

// Fonction pour filtrer les Pokémon par génération et/ou par type
function filterByGenerationAndType(generation, type) {
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const gen = rows[i].querySelector('td:nth-child(3)').textContent;
        const types = rows[i].querySelector('td:nth-child(4)').textContent.split(', ');
        if ((generation === "" || gen === generation) && (type === "" || types.includes(type))) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
    showPage();
    updatePagination();
}

// Fonction pour afficher une page spécifique de résultats
function showPage(page) {
    const rowsPerPage = 25;
    const filteredRows = getFilteredRows();
    for (let i = 0; i < filteredRows.length; i++) {
        if (i < (page - 1) * rowsPerPage || i >= page * rowsPerPage) {
            filteredRows[i].style.display = 'none';
        } else {
            filteredRows[i].style.display = '';
        }
    }
}

// Fonction pour obtenir les lignes filtrées en fonction de la génération et du type sélectionnés
function getFilteredRows() {
    const generationFilter = document.getElementById('filtre_gen').value;
    const typeFilter = document.getElementById('filtre_type').value;
    const rows = tbody.getElementsByTagName('tr');
    const filteredRows = [];
    for (let i = 0; i < rows.length; i++) {
        const gen = rows[i].querySelector('td:nth-child(3)').textContent;
        const types = rows[i].querySelector('td:nth-child(4)').textContent.split(', ');
        if ((generationFilter === "" || gen === generationFilter) && (typeFilter === "" || types.includes(typeFilter))) {
            filteredRows.push(rows[i]);
        }
    }
    return filteredRows;
}

// Fonction pour mettre à jour l'état des boutons de pagination
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
const rowsPerPage = 25;
let currentPage = 1;

// Initialisation des filtres et de la pagination
creation_liste_filtre();
creation_liste_type();
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