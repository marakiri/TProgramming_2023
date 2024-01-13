import { Player } from "../Player";


export class Archer extends Player {

    constructor(health: number, strength: number, name: string) {
        super(health, strength, name, "Огненная стрела", 2);
    }

    public toString(): string {
        return "(Лучник) " + this.name;
    }

    public ability(): [string, number] {
        if (this.abilityLeft > 0) {
            this.abilityLeft--;
            return [this.abilityName, 5.0]; // название абилки и урон от неё
        } else {
            return this.attack();
        }
    }


}