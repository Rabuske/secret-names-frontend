import { Player } from "./player";
import { Team } from "./team";
import { Board } from "./board";
import { Round } from "./round";

export interface Room{
    name: string;
    host: Player;    
    teamA: Team;
    teamB: Team;
    board: Board;
    round: Round;
    hasGameStarted: boolean;
}