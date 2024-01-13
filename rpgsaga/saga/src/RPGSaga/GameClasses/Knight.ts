import { Player } from "../Player";

export class Knight extends Player {
    timeOfAction: number = 1;

    constructor(health: number, strength: number, name: string) {
        super(health, strength, name, "Удар возмездия", 2);
    }

    public toString(): string {
        return "(Рыцарь) " + this.name;
    }

    public ability(): [string, number] {
        if (this.abilityLeft > 0) {
            this.abilityLeft--;
            return [this.abilityName, Math.floor(this.strength * 1.3)]; // название абилки и урон от неё
        } else {
            return this.attack();
        }
    }


}
