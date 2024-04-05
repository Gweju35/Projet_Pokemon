class Attack {

    constructor (charged_moves, fast_moves, pokemon_moves) {
        this._charged_moves = charged_moves;
        this._fast_moves = fast_moves;
        this._pokemon_moves = pokemon_moves;
    }

    static all_attacks = {};

    get charged_moves() {
        return this._charged_moves;
    }

    get fast_moves() {
        return this._fast_moves;
    }

    get pokemon_moves() {
        return this._pokemon_moves;
    }

    toString() {
        return `Attack: ${this._pokemon_moves}`;
    }

    /* static import_attacks(source, type_effectiveness) {
        source.forEach(pokemonTypeData => {
            if (pokemonTypeData.form === "Normal") {
                pokemonTypeData.type.forEach(typeName => {
                    if (!Attack.all_attacks[typeName]) {
                        let effectiveness = type_effectiveness[typeName] || {};
                        Attack.all_attacks[typeName] = new Attack(typeName, effectiveness);
                    }
                });
            }
        });
        return Attack.all_attacks;
    }*/
}