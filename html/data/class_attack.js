class Attack {
    constructor(attackData) {
        this.move_id = attackData.move_id;
        this.name = attackData.name;
        this.type = attackData.type;
        this.power = attackData.power;
        this.duration = attackData.duration;
        this.energy_delta = attackData.energy_delta;
        this.stamina_loss_scaler = attackData.stamina_loss_scaler;
        this.critical_chance = attackData.critical_chance;
    }

    static all_attacks = {};

    toString() {
        return `Attack ID: ${this.move_id}, Name: ${this.name}, Type: ${this.type}, 
        Power: ${this.power}, Duration: ${this.duration}, Energy Delta: ${this.energy_delta}, 
        Stamina Loss Scaler: ${this.stamina_loss_scaler}, Critical Chance: ${this.critical_chance}`;
    }
}