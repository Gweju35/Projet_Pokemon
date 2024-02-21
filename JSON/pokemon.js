class Pokemon {
    constructor(base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name) {
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.base_stamina = base_stamina;
        this.form = form;
        this.pokemon_id = pokemon_id;
        this.pokemon_name = pokemon_name;
    }

    get base_attack() {
        return this.base_attack;
    }

    get base_defense() {
        return this.base_defense;
    }

    get base_stamina() {
        return this.base_stamina;
    }

    get form() {
        return this.form;
    }

    get pokemon_id() {
        return this.pokemon_id;
    }

    get pokemon_name() {
        return this.pokemon_name;
    }

    toString() {
        return `Pokemon: ${this.pokemon_name}, ID: ${this.pokemon_id}, Form: ${this.form}, 
        Base Attack: ${this.base_attack}, Base Defense: ${this.base_defense}, Base Stamina: ${this.base_stamina}`;
    }
    
    import_pokemon(data) {
        let all_pokemons = {};
    
        data.forEach(pokemonData => {
            let pokemon = new Pokemon(
                pokemonData.base_attack,
                pokemonData.base_defense,
                pokemonData.base_stamina,
                pokemonData.form,
                pokemonData.pokemon_id,
                pokemonData.pokemon_name
            );
            all_pokemons[pokemonData.pokemon_id] = pokemon;
        });
    
        return all_pokemons;
    }
    
    // Utilisation de la fonction
    // let all_pokemons = import_pokemon(pokemon);
    
}