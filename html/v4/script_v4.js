// Import des données Pokémon depuis le fichier pokemons.js
let listePokemons = Pokemon.import_pokemon();

// Import des données de génération depuis le fichier generation.js
let generationData = Pokemon.importGeneration();

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

    pokemon.generation = generation;
    row.setAttribute('data-pokemon', JSON.stringify(pokemon)); // sert pour l'affichage de la popup
}

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

// page précédente
document.getElementById('prevPageButton').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
    }
});

// page suivante
document.getElementById('nextPageButton').addEventListener('click', function () {
    const totalPages = Math.ceil(getFilteredRows().length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
    }
});

/*--------- Informations Pokémons Popup ----------*/

document.addEventListener('DOMContentLoaded', function () {
    let tbody = document.getElementById('tableauPokemon');
    let popup = document.getElementById('popupEvent');
    // on ajoute un évènement de clic sur chaque ligne du tableau
    tbody.addEventListener('click', function (event) {
        let target = event.target;
        // on vérifie si la cible du clic est une ligne du tableau
        if (target.tagName === 'TD') {
            // on récupère les infos du Pokémon à partir du <tr>
            let pokemonData = JSON.parse(target.parentNode.getAttribute('data-pokemon'));
            // on affiche les infos dans la popup
            displayPopup(popup, pokemonData); // fonction définie plus bas
        }
    });
});


// Fonction pour afficher les informations du Pokémon dans la popup
function displayPopup(popup, pokemonData) {
    // on vide le contenu précédent de la popup
    popup.innerHTML = '';

    // attaques chargées
    let chargedMovesContent = pokemonData.attacks.charged_moves.map(move => `<li>${move.name} (${move.type})</li>`).join('');
    // attaques rapides
    let fastMovesContent = pokemonData.attacks.fast_moves.map(move => `<li>${move.name} (${move.type})</li>`).join('');

    let typesContent = pokemonData.types.map(type => {
        // on obtinet la classe de couleur correspondant au type
        let colorClass = getTypeColorClass(type);
        return `<div class="type ${colorClass}">
                    <img src="../icons/${type}.svg" alt="${type}">        
                    <p>${type}</p>
                </div>`;
    }).join('');


    // on génère le nouveau contenu de la popup
    let popupContent = `
    <div id="close"><p>×</p></div>
    <div class="container">
        <div class="bio">
            <div class="image">
                <img src="../webp/images/${idPokemonImage(pokemonData)}.webp" alt="${pokemonData.pokemon_name}"></img>
                <p>${pokemonData.pokemon_name}</p>
            </div>
            <div class="infos">
                <div class="id">
                    <p>ID: ${pokemonData.pokemon_id}</p>
                    <p>Generation: ${pokemonData.generation}</p>
                </div>
                <div class="types">
                    ${typesContent}
                </div>
                <div class="stats">
                    <p>Stamina: ${pokemonData.base_stamina}</p>
                    <p>Attack: ${pokemonData.base_attack}</p>
                    <p>Defense: ${pokemonData.base_defense}</p>
                </div>
            </div>
        </div>
        <div class="buttonAttacks">
            <button id="showChargedMoves" class="active">Charged Moves</button>
            <button id="showFastMoves">Fast Moves</button>
        </div>
        <div class="attacks">
            <div id="chargedAttacksContent" class="attacks-content">
                <ul>
                    ${chargedMovesContent}
                </ul>
            </div>
            <div id="fastAttacksContent" class="attacks-content" style="display: none;">
                <ul>
                    ${fastMovesContent}
                </ul>
            </div>
            </div>
    </div>`;

    // on ajoute le nouveau contenu à la popup
    popup.innerHTML = popupContent;

    // écouteur pour fermer la popup
    let closePopup = document.getElementById('close');
    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // écouteur pour afficher les attaques chargées
    let showChargedMovesButton = document.getElementById('showChargedMoves');
    showChargedMovesButton.addEventListener('click', function () {
        document.getElementById('chargedAttacksContent').style.display = 'block';
        document.getElementById('fastAttacksContent').style.display = 'none';
        showChargedMovesButton.classList.add('active');
        showFastMovesButton.classList.remove('active');
    });

    // écouteur pour afficher les attaques rapides
    let showFastMovesButton = document.getElementById('showFastMoves');
    showFastMovesButton.addEventListener('click', function () {
        document.getElementById('chargedAttacksContent').style.display = 'none';
        document.getElementById('fastAttacksContent').style.display = 'block';
        showChargedMovesButton.classList.remove('active');
        showFastMovesButton.classList.add('active');
    });

    // on affiche la popup
    popup.style.display = 'block';
}

// Fonction pour obtenir la classe de couleur correspondant au type
function getTypeColorClass(type) {
    switch (type.toLowerCase()) {
        case 'bug':
            return 'bug';
        case 'dark':
            return 'dark';
        case 'dragon':
            return 'dragon';
        case 'electric':
            return 'electric';
        case 'fairy':
            return 'fairy';
        case 'fighting':
            return 'fighting';
        case 'fire':
            return 'fire';
        case 'flying':
            return 'flying';
        case 'ghost':
            return 'ghost';
        case 'grass':
            return 'grass';
        case 'ground':
            return 'ground';
        case 'ice':
            return 'ice';
        case 'normal':
            return 'normal';
        case 'poison':
            return 'poison';
        case 'psychic':
            return 'psychic';
        case 'rock':
            return 'rock';
        case 'steel':
            return 'steel';
        case 'water':
            return 'water';
        default:
            return '';
    }
}

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

// Création de la liste déroulante des types pour les filtres
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
    const nameFilter = document.getElementById('filtre_nom').value.toLowerCase().trim();
    const generationFilter = document.getElementById('filtre_gen').value;
    const typeFilter = document.getElementById('filtre_type').value;
    const rows = tbody.getElementsByTagName('tr');

    // on créer une copie
    let filteredRows = [...rows];

    // on applique le filtre par nom
    if (nameFilter) {
        filteredRows = filteredRows.filter(row => {
            const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase().trim();
            return filterByName(name, nameFilter);
        });
    }

    // on applique le filtre par génération
    if (generationFilter) {
        filteredRows = filteredRows.filter(row => {
            const gen = row.querySelector('td:nth-child(3)').textContent;
            return gen === generationFilter;
        });
    }

    // on applique le filtre par type
    if (typeFilter) {
        filteredRows = filteredRows.filter(row => {
            const types = row.querySelector('td:nth-child(4)').textContent.split(', ');
            return types.includes(typeFilter);
        });
    }

    // on affiche les lignes filtrées
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = filteredRows.includes(rows[i]) ? '' : 'none';
    }

    currentPage = 1;
    showPage(currentPage);
    updatePagination();
}

// Fonction pour filtrer les Pokémon par nom
function filterByName(pokemonName, searchTerm) {
    // on convertit les deux chaînes en minuscules
    pokemonName = pokemonName.toLowerCase();
    searchTerm = searchTerm.toLowerCase();

    // on vérifie si le nom du Pokémon commence par le terme de recherche
    if (pokemonName.startsWith(searchTerm)) {
        return true;
    } else {
        return false;
    }
}

// Ajout d'événements pour les filtres
document.getElementById('filtre_gen').addEventListener('change', filterPokemons);
document.getElementById('filtre_type').addEventListener('change', filterPokemons);
document.getElementById('filtre_nom').addEventListener('input', filterPokemons); 

// Fonction pour obtenir les lignes filtrées en fonction de la génération et du type sélectionné
function getFilteredRows() {
    const generationFilter = document.getElementById('filtre_gen').value;
    const typeFilter = document.getElementById('filtre_type').value;
    const nameFilter = document.getElementById('filtre_nom').value.toLowerCase().trim();
    const rows = tbody.getElementsByTagName('tr');
    const filteredRows = [];
    for (let i = 0; i < rows.length; i++) {
        const gen = rows[i].querySelector('td:nth-child(3)').textContent;
        const types = rows[i].querySelector('td:nth-child(4)').textContent.split(', ');
        const name = rows[i].querySelector('td:nth-child(2)').textContent.toLowerCase().trim();
        if ((generationFilter === "" || gen === generationFilter) && (typeFilter === "" || types.includes(typeFilter)) && (nameFilter === "" || filterByName(name, nameFilter))) {
            filteredRows.push(rows[i]);
        }
    }
    return filteredRows;
}

// Gestion de la pagination
const rowsPerPage = 25;
let currentPage = 1;

// Initialisation des filtres et de la pagination
creation_liste_filtre();
creation_liste_type();
showPage(currentPage);
updatePagination();