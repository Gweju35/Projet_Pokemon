class Pokemon {
    constructor(base_attack, base_defense, base_stamina, form, pokemon_id, pokemon_name) {
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._form = form;
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
    }

    static all_pokemons = {};

    get base_attack() {
        return this._base_attack;
    }

    get base_defense() {
        return this._base_defense;
    }

    get base_stamina() {
        return this._base_stamina;
    }

    get form() {
        return this._form;
    }

    get pokemon_id() {
        return this._pokemon_id;
    }

    get pokemon_name() {
        return this._pokemon_name;
    }

    toString() {
        return `Pokemon: ${this._pokemon_name}, ID: ${this._pokemon_id}, Form: ${this._form}, 
        Base Attack: ${this._base_attack}, Base Defense: ${this._base_defense}, Base Stamina: ${this._base_stamina}`;
    }

    static import_pokemon(source) {
        source.forEach(pokemonData => {
            let pokemon = new Pokemon(pokemonData.base_attack, pokemonData.base_defense, pokemonData.base_stamina, pokemonData.form, pokemonData.pokemon_id, pokemonData.pokemon_name);
            if (!Pokemon.all_pokemons[pokemon.pokemon_id]) {
                Pokemon.all_pokemons[pokemon.pokemon_id] = [];
            }
            Pokemon.all_pokemons[pokemon.pokemon_id].push(pokemon);
        });
        return Pokemon.all_pokemons;
    }
}

console.log(Pokemon.import_pokemon(pokemons.pokemon));