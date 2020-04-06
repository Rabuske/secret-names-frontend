import { connectionSlice } from "./reducers";

const { actions } = connectionSlice;

export const {
    updateGame,
    setPlayer,
    switchTeamMember,
    startGame,
    submitClue,
    submitVoteForWord,
    removeVoteForWord,
    passTurn,
} = actions;