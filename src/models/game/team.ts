import { Player } from "./player";

export interface Team {
    players: Player[];
    name: string;
    id: string;
}