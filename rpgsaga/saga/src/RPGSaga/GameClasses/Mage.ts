import { Player } from "../Player";


export class Mage extends Player {
    timeOfAction: number = 1;

    constructor(health: number, strength: number, name: string) {
      super(health, strength, name, "Заворожение", 2); 
    }

    public toString(): string {
      return "(Маг) " + this.name;
    }

    public ability(): [string, number] {
      if (this.abilityLeft > 0) {
        this.abilityLeft--;
        return [this.abilityName, 0.0]; // название абилки и урон от неё
      } else {
        return this.attack();
      }
    }


}