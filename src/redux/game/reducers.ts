import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../models/game/room';
import { Player } from '../../models/game/player';

export interface GameState{
    player: Player;
    room: Room;
}

const initialState : GameState = {
    player: { 
        userName: 'User',
    },
    room: {
        name: 'Room',
        host: {userName: ''},
        teamA: { name: "Team A", players: [] },
        teamB: { name: "Team A", players: [] },
    }
}

export const connectionSlice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        // Middleware is responsible for connecting 
        setPlayer: (state: GameState, action: PayloadAction<{userName: string}>): void => { 
            state.player = { userName: action.payload.userName };
        },

        updateGame: (state: GameState, action: PayloadAction<{room: Room}>): void => { 
            state.room = action.payload.room;
        },
    }
})

const { reducer } = connectionSlice;

export default reducer;
