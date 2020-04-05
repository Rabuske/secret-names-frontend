import { createSelector } from "@reduxjs/toolkit";
import { Store } from '../../store';
import { Player } from '../../models/game/player';
import { Room } from '../../models/game/room';
import { Team } from "../../models/game/team";
import { Card } from "../../models/game/card";
import { Round } from "../../models/game/round";
import { TEAM_A, TEAM_B } from "../../models/game/agent";
import { Vote } from "../../models/game/vote";

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

export const isHostSelector = createSelector(
    (store: Store) : boolean => store.game.room.host.userName === store.game.player.userName,
    (state :boolean) => state
)

export const cardSelector = createSelector(
    (store: Store) : Card[] => store.game.room.board.cards,
    (state: Card[]) => state
)

export const isTheKnowAllSelector = createSelector(
    (store: Store) : boolean => 
        (store.game.room.board.knowAllForTeamA.userName === store.game.player.userName 
        || store.game.room.board.knowAllForTeamB.userName === store.game.player.userName),
    (state: boolean) => state
)

export const knowAllForTeamASelector = createSelector(
    (store: Store) : Player => store.game.room.board.knowAllForTeamA,
    (state: Player) => state
)

export const knowAllForTeamBSelector = createSelector(
    (store: Store) : Player => store.game.room.board.knowAllForTeamB,
    (state: Player) => state
)

export const roundSelector = createSelector(
    (store: Store) : Round => store.game.room.round,
    (state: Round) => state
)

export const isPlayerInTeamCurrentlyPlayingSelector = createSelector(
    (store: Store) : boolean => {
        if(store.game.room.round.team === TEAM_A){
            return store.game.room.teamA.players.filter(player => player.userName === store.game.player.userName).length > 0;
        }
        if(store.game.room.round.team === TEAM_B){
            return store.game.room.teamB.players.filter(player => player.userName === store.game.player.userName).length > 0;
        }
        return false;
    },
    (state: boolean) => state
)

export const hasGameStartedSelector = createSelector(
    (store: Store) : boolean => store.game.room.hasGameStarted,
    (state: boolean) => state
)

export const votesSelector = createSelector(
    (store: Store) : Vote[] => store.game.room.round.votes,
    (state: Vote[]) => state
)

export const clueSelector = createSelector(
    (store: Store) : string => store.game.room.round?.clue,
    (state: string) => state
)

export const isClueSubmittedSelector = createSelector(
    (store: Store) : boolean => store.game.room.round?.isClueSubmitted,
    (state: boolean) => state
)
