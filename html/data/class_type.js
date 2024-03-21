class Type {
    constructor(typeData) {
        this.form = typeData.form;
        this.pokemon_id = typeData.pokemon_id;
        this.pokemon_name = typeData.pokemon_name;
        this.types = typeData.type;
    }

    toString() {
        return `Pokemon ID: ${this.pokemon_id}, Name: ${this.pokemon_name}, Form: ${this.form}, Types: ${this.types}`;
    }
}