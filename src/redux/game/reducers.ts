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
        isHost: false
    },
    room: {
        otherPlayers: [],
        roomName: 'Room'
    }
}

export const connectionSlice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        // Middleware is responsible for connecting 
        setRoomName: (state: GameState, action: PayloadAction<{roomName: string}>): void => { 
            state.room.roomName = action.payload.roomName;
        },

        setUserName: (state: GameState, action: PayloadAction<{userName: string}>): void => { 
            state.player.userName = action.payload.userName;
        },

        setIsHost: (state: GameState, action: PayloadAction<{isHost: boolean}>): void => { 
            state.player.isHost = action.payload.isHost;
        },

        addUserToRoom: (state: GameState, action: PayloadAction<string>): void => { 
            const newPlayer : Player = { 
                userName: action.payload,
                isHost: false
            }
            const players = state.room.otherPlayers;
            players.push(newPlayer);
        },

        removeUserFromRoom: (state: GameState, action: PayloadAction<string>): void => { 
            const nameOfPlayerToRemove = action.payload;
            state.room.otherPlayers = state.room.otherPlayers.filter(player => player.userName !== nameOfPlayerToRemove);
        },        
    }
})

const { reducer } = connectionSlice;

export default reducer;
