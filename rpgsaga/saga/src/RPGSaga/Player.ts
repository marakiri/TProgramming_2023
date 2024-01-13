export abstract class Player {
    public debuffs: string; // статус наложенный на противника

    constructor(
        public maxHealth: number,
        public strength: number,
        public name: string,
        public abilityName: string,
        public maxAbilityUsages: number,


    ) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.strength = strength;
        this.name = name;
        this.abilityName = abilityName;
        this.maxAbilityUsages = maxAbilityUsages;

    }

    public currentHealth: number;
    public abilityLeft: number = this.maxAbilityUsages;


    public abstract ability(): [string, number];

    public attack(): [string, number] {
        return ['наносит урон', this.strength];
    }

    public getDamage(damage: number): boolean {
        this.currentHealth -= damage;
        return this.checkDeath();
    }


    public setDebuff(debuffName: string): string {
        this.debuffs = debuffName;
        return this.debuffs
    }


    public checkStatus(): [string, number] {
        switch (this.debuffs) {
            case 'Огненная стрела':
                return ['Огненная стрела', 3.0]; // периодический урон от абилки
            case 'Заворожение':
                return ['Заворожение', 0.0]; // периодический урон от абилки
            default:
                return [' ', 0.0];
        }
    }

    public checkDeath(): boolean {
        if (this.currentHealth <= 0) {
            return true;
        } else {
            return false;
        }
    }

    public update(): void {
        this.abilityLeft = this.maxAbilityUsages;
        this.currentHealth = this.maxHealth;
        this.debuffs = "";
    }
}