import { Player } from "./player";

export interface Team {
    name: string;
    players: Player[];
}

export const TEAM_A = "Team A";
export const TEAM_B = "Team B";