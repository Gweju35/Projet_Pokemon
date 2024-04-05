class Type {
    constructor(name, effectiveness) {
        this._name = name;
        this._effectiveness = effectiveness;
    }

    static all_types = {}; // Cette syntaxe n'est pas prise en charge dans certaines versions de JavaScript

    get name() {
        return this._name;
    }

    get effectiveness() {
        return this._effectiveness;
    }

    toString() {
        return `Type: ${this._name}`;
    }

    static getEffectiveness(attackingType, defendingType) {
        return Type.all_types[attackingType].effectiveness[defendingType];
    }
}

