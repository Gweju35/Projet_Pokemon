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
        // on obtient la classe de couleur correspondant au type
        let colorClass = getTypeColorClass(type);
        return `<div class="type ${colorClass}">
                    <img src="../icons/${type}.svg" alt="${type}">        
                    <p>${type}</p>
                </div>`;
    }).join('');

    let premierType = pokemonData.types[0].toLowerCase();
    let classePremierType = `active${premierType}`;

    let popupEvent = document.getElementById('popupEvent');
    let classePremierTypeBorder = `border${premierType}`;
    popupEvent.classList.forEach(className => {
        if (className.startsWith('border') || className === 'popup') {
            popupEvent.classList.remove(className);
        }
    });
    popupEvent.classList.add('popup', classePremierTypeBorder);


    // on génère le nouveau contenu de la popup
    let popupContent = `
    <div id="close" class="${classePremierType}"><p>×</p></div>
    <div class="container">
        <div class="bio">
            <div class="image" id="borderImage">
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
            <button id="showChargedMoves" class="${classePremierType}">Charged Moves</button>
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
        showChargedMovesButton.classList.add(classePremierType);
        showFastMovesButton.classList.remove(classePremierType);
    });

    // écouteur pour afficher les attaques rapides
    let showFastMovesButton = document.getElementById('showFastMoves');
    showFastMovesButton.addEventListener('click', function () {
        document.getElementById('chargedAttacksContent').style.display = 'none';
        document.getElementById('fastAttacksContent').style.display = 'block';
        showChargedMovesButton.classList.remove(classePremierType);
        showFastMovesButton.classList.add(classePremierType);
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


