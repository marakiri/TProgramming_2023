import { Player } from "./Player";


export class Logger {
    public static WriteWinner(winner: Player): void {
      console.log(`${winner} ПОБЕДИЛ!`);
    }

    public static WriteRound(round: number): void {
      console.log(`Раунд ${round}.`);
    }

    public static WriteFight(fightMembers: Player[]): void {
      console.log(`${fightMembers[0]} VS ${fightMembers[1]}`);
    }

    public static WriteAction(firstP: Player, secondP: Player, playerAction: [string, number]): void {
      switch (playerAction[0]) {
        case "наносит урон":
          console.log(`${firstP} наносит урон ${playerAction[1]} противнику ${secondP}`);
          break;
        case "Удар возмездия":
          console.log(`${firstP} применяет (${playerAction[0]}) и наносит урон ${playerAction[1]} по противнику ${secondP}`);
          break;
        case "Огненная стрела":
          console.log(`${firstP} применяет (${playerAction[0]}) и наносит урон ${playerAction[1]} по противнику ${secondP} `);
          break;
        case "Заворожение":
          console.log(`${firstP} применяет (${playerAction[0]}) по противнику ${secondP}`);
          break;
      }
    }

    public static WriteStatusAbility(inputP: Player, playerStatus: [string, number]): void {
      switch (playerStatus[0]) {
        case "Огненная стрела":
          console.log(`${inputP} получает периодический урон ${playerStatus[1]} от (${playerStatus[0]})`);
          break;
        case "Заворожение":
          console.log(`${inputP} пропускает ход из-за (${playerStatus[0]})`);
          break;
      }
    }


    public static WriteDeath(firstP: Player, secondP: Player): void {
    console.log();
      console.log(`${firstP} погибает`);
      console.log();
    }
  }