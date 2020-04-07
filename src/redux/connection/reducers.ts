import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConnectionStatus } from '../../models/connection/ConnectionStatus';

export interface ConnectionState{
    connectionId: string;
    connectionStatus: ConnectionStatus,
}

const initialState : ConnectionState = {
    connectionId: '',
    connectionStatus: ConnectionStatus.Disconnected,
}

export const connectionSlice = createSlice({
    initialState,
    name: 'connection',
    reducers: {
        // Middleware is responsible for connecting 
        connectToServer : (state: ConnectionState, action: PayloadAction<{userName: string, room: string}>): void => { 

        },
        
        setConnectionStatus : (state: ConnectionState, action: PayloadAction<ConnectionStatus>): void => { 
            state.connectionStatus = action.payload;
        },
    }
})

const { reducer } = connectionSlice;

export default reducer;
