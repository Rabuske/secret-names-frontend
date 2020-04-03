import { Player } from "./player";
import { Team } from "./team";

export interface Room{
    name: string;
    host: Player;    
    teamA: Team;
    teamB: Team;
}