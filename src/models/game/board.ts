import { Player } from "./player";
import { Card } from "./card";

export interface Board{
    knowAllForTeamA: Player;
    knowAllForTeamB: Player;
    cards: Card[];
}