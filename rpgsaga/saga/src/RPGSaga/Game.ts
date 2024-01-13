import { Archer } from './GameClasses/Archer';
import { Knight } from './GameClasses/Knight';
import { Mage } from './GameClasses/Mage';
import { Logger } from './Logger';
import { Player } from './Player';
import { Random } from './Random';

export class Game {
    static Start(): void {
        const p_number: number = 2;
        const playerList: Player[] = Game.PLayerListGenerator(p_number);
        Game.PlayGame(playerList);
    }

    public static PlayGame(playerList: Player[]): void {
        for (let i = 1; playerList.length !== 1; i++) {
            Logger.WriteRound(i);
            Game.PlayRound(playerList);
        }

        Logger.WriteWinner(playerList[0]);
    }

    public static PlayRound(playerList: Player[]): void {
        for (let i = 0; i < playerList.length / 2; i++) {
            const fightMembers: [Player, Player] = [playerList[i * 2], playerList[i * 2 + 1]];
            Logger.WriteFight(fightMembers);
            playerList[i * 2] = Game.PlayFight(fightMembers);
        }

        for (let i = 1; i < playerList.length; i++) {
            playerList.splice(i, 1);
        }
    }

    public static PlayFight(fightMembers: [Player, Player]): Player {
        for (let i = 0; true; i++) {
            let playerStatus = fightMembers[i % 2].checkStatus(); // реализация чередования игроков(0 и 1), playerStatus - содержит в себе массив с 2 значениями: наложенный статус и урон от этого статуса
            //console.log(playerStatus, fightMembers[i % 2], fightMembers[(i+1) % 2]);
            Logger.WriteStatusAbility(fightMembers[i % 2], playerStatus);
            let checkDeath: boolean = fightMembers[i % 2].getDamage(playerStatus[1]); // получаем статсут игрока жив/мертв от наложенного статуса
            if (checkDeath) {
                Logger.WriteDeath(fightMembers[i % 2], fightMembers[(i + 1) % 2]);
                fightMembers[i % 2].update();
                fightMembers[(i + 1) % 2].update();
                return fightMembers[(i + 1) % 2];
            }

            if (playerStatus[0] === 'Заворожение') {
                continue;
                }

                const playerAction: [string, number] = Game.PlayerDoAction(fightMembers[i % 2]); // playerAction - содержит в себе выбор игрока: абилка/обычная атака
                checkDeath = fightMembers[(i + 1) % 2].getDamage(playerAction[1]); // получаем статсут игрока жив/мертв от полученного урона
                Logger.WriteAction(fightMembers[i % 2],fightMembers[(i + 1) % 2],  playerAction); // выводится действие первого игрока по второму
                fightMembers[(i + 1) % 2].setDebuff(playerAction[0]);

                if (checkDeath) {
                    Logger.WriteDeath(fightMembers[(i + 1) % 2], fightMembers[i % 2]);
                    fightMembers[i % 2].update();
                    fightMembers[(i + 1) % 2].update();
                    return fightMembers[i % 2];
                }
            }
        }

    public static PlayerDoAction(inputP: Player): [string, number] {
        const rnd: number = Random(0, 2);
        switch (rnd) {
            case 0:
                return inputP.ability();
            default:
                return inputP.attack();
        }
    }


    public static PLayerListGenerator(count: number): Player[] {
        let playerList: Player[] = [];
        let names = ['Itachi', 'Sasuke', 'Naruto', 'Kakashi', 'Jiraiya', 'Orochimaru', 'Gaara', 'Shikamaru', 'Neji'];
        let types_of_members = ['Wizard', 'Archer', 'Knight'];

        for (let i = 0; i < count; i++) {
            const health: number = Random(100, 300);
            const strength: number = Random(5, 50);
            const rnd: number = Random(0, names.length - 1);
            const member = types_of_members[Random(0, 2)];
            switch (member) {
                case 'Wizard':
                    playerList.push(new Mage(health, strength, names[rnd]));
                    break;
                case 'Archer':
                    playerList.push(new Archer(health, strength, names[rnd]));
                    break;
                case 'Knight':
                    playerList.push(new Knight(health, strength, names[rnd]));
                    break;
            }
        }

        return playerList;
    }
}