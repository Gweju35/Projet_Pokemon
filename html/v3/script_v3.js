// Importez les données des Pokémon ici depuis votre fichier pokemons.js
let listePokemons = Pokemon.import_pokemon();
console.log(listePokemons);
let tbody = document.getElementById('tableauPokemon');
let generationData = Pokemon.importGeneration();

for (let pokemonId in listePokemons) {
    let pokemon = listePokemons[pokemonId];
    let generation = findGeneration(pokemon.pokemon_id, generationData);

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

    pokemon.generation = generation;
    row.setAttribute('data-pokemon', JSON.stringify(pokemon));

}

// Fonction pour trouver le generation_number d'un Pokémon grâce à son ID
function findGeneration(pokemonId, generationData) {
    for (let genName in generationData) {
        let pokemonsInGen = generationData[genName];
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

// Définition de la fonction showPage
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
document.getElementById('prevPageButton').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateButtons();
    }
});

// page suivante
document.getElementById('nextPageButton').addEventListener('click', function () {
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
    // Ajoutez un événement de clic à chaque ligne du tableau
    tbody.addEventListener('click', function (event) {
        let target = event.target;
        // Vérifiez si la cible du clic est une ligne du tableau
        if (target.tagName === 'TD') {
            // Récupérez les informations du Pokémon à partir de la ligne parente (tr)
            let pokemonData = JSON.parse(target.parentNode.getAttribute('data-pokemon'));
            // Affichez les informations du Pokémon dans la popup
            displayPopup(popup, pokemonData);
        }
    });
});


// Fonction pour afficher les informations du Pokémon dans la popup
function displayPopup(popup, pokemonData) {
    // Vider le contenu précédent de la popup
    popup.innerHTML = '';

    // Générer le contenu des attaques chargées avec les types
    let chargedMoves = pokemonData.attacks.charged_moves.map(move => `${move.name} (${move.type})`).join(', ');

    // Générer le contenu des attaques rapides avec les types
    let fastMoves = pokemonData.attacks.fast_moves.map(move => `${move.name} (${move.type})`).join(', ');

    let typesContent = pokemonData.types.map(type => {
        // Obtenez la classe de couleur correspondant au type
        let colorClass = getTypeColorClass(type);
        // Retourne un div avec le type et la classe de couleur
        return `<div class="type ${colorClass}">
                    <img src="../icons/${type}.svg" alt="${type}">        
                    <p>${type}</p>
                </div>`;
    }).join('');


    // Générer le nouveau contenu de la popup
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
            <div class="attacks">
                <p>Charged Moves: ${chargedMoves}</p>
                <p>Fast Moves: ${fastMoves}</p>
            </div>
        </div>
    `;

    // Ajouter le nouveau contenu à la popup
    popup.innerHTML = popupContent;

    // Ajouter l'écouteur d'événements pour fermer la popup
    let closePopup = document.getElementById('close');
    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Afficher la popup
    popup.style.display = 'block';
}


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