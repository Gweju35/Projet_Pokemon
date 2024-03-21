class Pokemon {
    constructor(pokemonData) {
        this.pokemon_id = pokemonData.pokemon_id;
        this.pokemon_name = pokemonData.pokemon_name;
        this.base_attack = pokemonData.base_attack;
        this.base_defense = pokemonData.base_defense;
        this.base_stamina = pokemonData.base_stamina;
        this.form = pokemonData.form;
        this.types = [];
        this.attacks = {
            fast_moves: [],
            charged_moves: []
        };
    }


    toString() {
        let fastMoveString = this.attacks.fast_moves.map(move => move.name).join(", ");
        let chargedMoveString = this.attacks.charged_moves.map(move => move.name).join(", ");
        return `Pokemon ID: ${this.pokemon_id}, Name: ${this.pokemon_name}, Form: ${this.form}, Attack: ${this.base_attack}, 
                Defense: ${this.base_defense}, Stamina: ${this.base_stamina}, Types: ${this.types.join(", ")}, 
                Fast Moves: ${fastMoveString}, Charged Moves: ${chargedMoveString}`;
    }


    // Importe les pokémons, + types et attaques
    static import_pokemon() {
        let all_pokemons = {};
        let all_types = {};
        let all_attacks = {};

        // On créer les objets Type
        for (let typeData of pokemon_types) {
            let typeObj = new Type(typeData);
            let typeKey = `${typeData.pokemon_id}_${typeData.form}`;
            if (!(typeKey in all_types)) {
                all_types[typeKey] = typeObj;
            }
        }

        // On lie les types et les attaques à chaque Pokémon
        for (let pokemonData of pokemon) {
            if (pokemonData.form === "Normal") {
                let pokemonObj = new Pokemon(pokemonData);
                let typeKey = `${pokemonData.pokemon_id}_${pokemonData.form}`;
                // On lie les types au Pokémon
                if (typeKey in all_types) {
                    pokemonObj.types = all_types[typeKey].types;
                }
                // On lie les attaques fast et charged au Pokémon
                let pokemonMoves = pokemon_moves.find(move => move.pokemon_id === pokemonData.pokemon_id && move.form === pokemonData.form);
                if (pokemonMoves) {
                    // Partie fast attaques
                    pokemonMoves.fast_moves.forEach(fastMoveName => {
                        let attack = new Attack({
                            name: fastMoveName,
                            type: "Fast"
                        });
                        if (!(fastMoveName in all_attacks)) {
                            all_attacks[fastMoveName] = attack;
                        }
                        pokemonObj.attacks.fast_moves.push(all_attacks[fastMoveName]);
                    });
                    // Partie charged attaques
                    pokemonMoves.charged_moves.forEach(chargedMoveName => {
                        let attack = new Attack({
                            name: chargedMoveName,
                            type: "Charged"
                        });
                        if (!(chargedMoveName in all_attacks)) {
                            all_attacks[chargedMoveName] = attack;
                        }
                        pokemonObj.attacks.charged_moves.push(all_attacks[chargedMoveName]);
                    });
                }
                all_pokemons[pokemonData.pokemon_id] = pokemonObj;
            }
        }
        return all_pokemons;
    }


    // On importe le tableau de rapport d'efficacité entre les types de pokémons
    // ** Sert pour la méthode testGetWeakestEnemies() et testGetBestAttackTypesForEnemy()
    static importEffectiveness() {
        return type_effectiveness;
    }


    // Renvoie la liste des types des pokemons
    static getTypes() {
        let allTypes = [];
        for (let typeData of pokemon_types) {
            for (let type of typeData.type) {
                let newType = new Type({
                    form: typeData.form,
                    pokemon_id: typeData.pokemon_id,
                    pokemon_name: typeData.pokemon_name,
                    type: type
                });
                if (!allTypes.some(t => t.toString() === newType.toString())) {
                    allTypes.push(newType);
                }
            }
        }
        return allTypes;
    }
    


    // Renvoie la liste de toutes les attaques 
    static getAttacks() {
        let allAttacks = [];
        let seenAttacks = new Set(); // Utilisé pour éviter les doublons
        // fast attaques
        for (let move of fast_moves) {
            let attack = new Attack(move);
            if (!seenAttacks.has(attack.toString())) {
                allAttacks.push(attack);
                seenAttacks.add(attack.toString());
            }
        }
        // charged attaques
        for (let move of charged_moves) {
            let attack = new Attack(move);
            if (!seenAttacks.has(attack.toString())) {
                allAttacks.push(attack);
                seenAttacks.add(attack.toString());
            }
        }
        return allAttacks;
    }


    // Donne la liste des Pokémons possédant le type passé en argument
    static getPokemonsByType(typeName, all_pokemons) {
        let pokemonsByType = [];
        let typeFound = false; // variable pour vérifier si le type existe
        for (let pokemonId in all_pokemons) {
            let pokemon = all_pokemons[pokemonId];
            if (pokemon.types.includes(typeName)) { // on vérifie si le type existe dans le tableau des types 
                pokemonsByType.push(pokemon);
                typeFound = true;
            }
        }
        if (!typeFound) {
            console.error("Le type spécifié n'existe pas.");
        }
        
        return pokemonsByType;
    }
    

    // Donne la liste des Pokémons possédant l'attaque passée en argument
    static getPokemonsByAttack(attackName, all_pokemons) {
        let pokemonsByAttack = [];
        let attackFound = false; // variable pour vérifier si l'attaque existe
        for (let pokemonId in all_pokemons) {
            let pokemon = all_pokemons[pokemonId];
            let allAttacks = [].concat(pokemon.attacks.fast_moves, pokemon.attacks.charged_moves); // concaténation des 2 tableaux d'attaques en 1
            if (allAttacks.some(function(attack) { return attack.name === attackName; })) { // on vérifie si l'attaque existe dans le tableau des attaques
                pokemonsByAttack.push(pokemon);
                attackFound = true;
            }
        }
        if (!attackFound) {
            console.error("L'attaque spécifiée n'existe pas.");
        }
        return pokemonsByAttack;
    }
    
    
    // Donne la liste des attaques par type
    static getAttacksByType(typeName, allAttacks) {
        let attacksByType = [];
        for (let attack of allAttacks) {
            if (attack.type === typeName) {
                attacksByType.push(attack);
            }
        }
    
        if (attacksByType.length === 0) { 
            // Si la longueur du tableau est de 0, c'est qu'on a pas trouvé d'attaque correspondant au type
            // --> donc le type n'existe pas
            console.error(`Le type spécifié n'existe pas.`);
        }
    
        return attacksByType;
    }
    

    // Donne la liste des Pokémons triés par nom dans l'ordre alphabétique
    static sortPokemonByName(all_pokemons) {
        let sortedPokemons = Object.values(all_pokemons).slice(); // on copie de la liste des pokémons
        sortedPokemons.sort((a, b) => { // on trie les pokémons par nom dans l'ordre aplhabetique
            const nameA = a.pokemon_name.toLowerCase();
            const nameB = b.pokemon_name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        return sortedPokemons;
    }


    // Donne la liste des Pokémons triés dans l’ordre décroissant de stamina
    static sortPokemonByStamina(all_pokemons) {
        let sortedPokemons = Object.values(all_pokemons).slice(); // on copie de la liste des pokémons
        sortedPokemons.sort((a, b) => b.base_stamina - a.base_stamina); // on trie les pokémons par ordre décroissant de stamina
        return sortedPokemons;
    }


    // Donne la liste des Pokémons pour lesquels l’attaque choisie est la plus efficace
    static getWeakestEnemies(nomAttaque, all_pokemons, all_attacks, effectiveness) {
        let typeAttaque = "";
        for (let attack of all_attacks) {
            if (attack.name === nomAttaque) {
                typeAttaque = attack.type;
                break;
            }
        }
        if (typeAttaque === "") { // Si la variable est toujours vide à la fin des boucle for, c'est que l'attaque n'existe pas
            console.error("L'attaque spécifiée n'existe pas.");
            return [];
        }
        // on cherche le type de Pokémon le plus vulnérable à l'attaque
        let typePlusVulnerable = "";
        let efficaciteMax = -1;
        for (let type in effectiveness) {
            if (effectiveness[type][typeAttaque] > efficaciteMax) {
                typePlusVulnerable = type;
                efficaciteMax = effectiveness[type][typeAttaque];
            }
        }
        // on cherche les Pokémons ayant le type le plus vulnérable à l'attaque
        let weakestEnemies = [];
        for (let pokemonId in all_pokemons) {
            let pokemon = all_pokemons[pokemonId];
            if (pokemon.types.includes(typePlusVulnerable)) {
                weakestEnemies.push(pokemon);
            }
        }
        return weakestEnemies;
    }

    
    // Donne la liste des types d’attaque les plus efficaces contre un Pokémon donné
    static getBestAttackTypesForEnemy(nomPokemon, effectiveness, all_pokemons) {
        let pokemon = Object.values(all_pokemons).find(p => p.pokemon_name === nomPokemon); // on cherche le pokémon dans la liste
        if (!pokemon) { // on vérifie s'il existe
            console.error("Le Pokémon spécifié n'existe pas.");
            return [];
        }
        let typesPokemon = pokemon.types; // on récupère le ou les types du pokémon
        let bestAttackTypes = [];
        typesPokemon.forEach(typePokemon => {
            // on cherche les types les plus efficaces contre celui ou ceux du Pokémon
            let bestAttacksForType = [];
            for (let type in effectiveness) {
                if (effectiveness[type][typePokemon] > 1) {
                    bestAttacksForType.push(type);
                }
            }
            bestAttackTypes.push({ type: typePokemon, bestAttacks: bestAttacksForType });
        });
        return bestAttackTypes;
    }
}