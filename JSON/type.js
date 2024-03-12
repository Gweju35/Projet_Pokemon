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

    static import_types(source, type_effectiveness) {
        source.forEach(pokemonTypeData => {
            if (pokemonTypeData.form === "Normal") {
                pokemonTypeData.type.forEach(typeName => {
                    if (!Type.all_types[typeName]) {
                        let effectiveness = type_effectiveness[typeName] || {};
                        Type.all_types[typeName] = new Type(typeName, effectiveness);
                    }
                });
            }
        });
        return Type.all_types;
    }

    static getEffectiveness(attackingType, defendingType) {
            return Type.all_types[attackingType].effectiveness[defendingType];

    }
}


