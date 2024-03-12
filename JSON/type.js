/* À partir des fichiers pokemon_type.json et type_effectiveness.json, proposez une
classe Type. Ce type permettra donc de connaître l’efficacité d’un type d’attaque contre
un type de défenseur. N’oubliez pas la méthode toString(). De même que pour les
Pokémons, on ne gardera que les types des formes dont la valeur est Normal. Une
variable de classes nommée all_types contiendra l’ensemble des types de Pokémons
et sera indexé par le nom du type. */

class Type {
    constructor(name, effectiveness) {
        this._name = name;
        this._effectiveness = effectiveness;
    }

    static all_types = {};

    get name() {
        return this._name;
    }

    get effectiveness() {
        return this._effectiveness;
    }

    toString() {
        return `Type: ${this._name}`;
    }

    static import_types(pokemon_types, type_effectiveness) {
        pokemon_types.forEach(pokemonTypeData => {
            if (pokemonTypeData.form === "Normal") {
                pokemonTypeData.type.forEach(typeName => {
                    if (!Type.all_types[typeName]) {
                        Type.all_types[typeName] = new Type(typeName, type_effectiveness[typeName]);
                    }
                });
            }
        });
        return Type.all_types;
    }
}
