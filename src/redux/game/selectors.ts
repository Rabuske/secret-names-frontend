import { createSelector } from "@reduxjs/toolkit";
import { Store } from '../../store';
import { Player } from '../../models/game/player';
import { Room } from '../../models/game/room';

export const roomSelector = createSelector(
    (store: Store) : Room => store.game.room,
    (state: Room) => state
);

export const playerSelector = createSelector(
    (store: Store) : Player => store.game.player,
    (state: Player) => state
);
