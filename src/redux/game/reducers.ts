import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../models/game/room';
import { Player } from '../../models/game/player';
import { TEAM_A, TEAM_B } from '../../models/game/agent';

export interface GameState{
    player: Player;
    room: Room;
}

const initialState : GameState = {
    player: { 
        userName: 'User',
        isHost: false
    },
    room: {
        name: 'Room',
        host: {userName: '', isHost: false},
        teamA: { name: "Team A", players: [], id: TEAM_A },
        teamB: { name: "Team B", players: [], id: TEAM_B },
        board: { 
            cards: [],
            knowAllForTeamA: { userName: '', isHost: false},
            knowAllForTeamB: { userName: '', isHost: false},
        },
        round: {
            clue: '',
            remainingGuesses: 0,
            team: '',
            votes: [],
            isClueSubmitted: false,
            numberOfWordsRelatedToGuess: 0,
        },
        hasGameStarted: false,
    }
}

export const connectionSlice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        // Middleware is responsible for connecting 
        switchTeamMember : (state: GameState, action: PayloadAction<{userName: string}>): void => { 

        },

        startGame : (state: GameState, action: PayloadAction): void => { 

        },

        submitClue : (state: GameState, action: PayloadAction<{clue: string, numberOfWords: string}>): void => { 

        },

        submitVoteForWord : (state: GameState, action: PayloadAction<{word : string}>): void => { 

        },

        removeVoteForWord: (state: GameState, action: PayloadAction<{word : string}>): void => { 

        },

        passTurn: (state: GameState, action: PayloadAction): void => { 

        },

        setPlayer: (state: GameState, action: PayloadAction<{userName: string, isHost:boolean}>): void => { 
            state.player = { 
                userName: action.payload.userName,
                isHost: action.payload.isHost
            };
        },

        updateGame: (state: GameState, action: PayloadAction<{room: Room}>): void => { 
            state.room = action.payload.room;
            state.player.isHost = state.room.host.userName === state.player.userName;
        },
    }
})

const { reducer } = connectionSlice;

export default reducer;
