import { Player } from "./player";

export interface Room{
    roomName: string;
    otherPlayers: Player[];
}