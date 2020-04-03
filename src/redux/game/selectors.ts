import { createSelector } from "@reduxjs/toolkit";
import { Store } from '../../store';
import { Player } from '../../models/game/player';
import { Room } from '../../models/game/room';
import { Team } from "../../models/game/team";

export const roomSelector = createSelector(
    (store: Store) : Room => store.game.room,
    (state: Room) => state
);

export const playerSelector = createSelector(
    (store: Store) : Player => store.game.player,
    (state: Player) => state
);

export const teamASelector = createSelector(
    (store: Store) : Team => store.game.room.teamA,
    (state: Team) => state
);

export const teamBSelector = createSelector(
    (store: Store) : Team => store.game.room.teamB,
    (state: Team) => state
);