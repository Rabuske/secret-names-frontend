import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConnectionState{
    connectionId: string;
    isConnected: boolean
}

const initialState : ConnectionState = {
    connectionId: '',
    isConnected: false
}

export const connectionSlice = createSlice({
    initialState,
    name: 'connection',
    reducers: {
        // Middleware is responsible for connecting 
        connectToServer : (state: ConnectionState, action: PayloadAction<{userName: string, room: string}>): void => { 

        },
        
        connectionAccepted :  (state: ConnectionState, action: PayloadAction): void => { 
            state.isConnected = true;
        },

        disconnect :  (state: ConnectionState, action: PayloadAction): void => { 
            state.isConnected = false;
        },
    }
})

const { reducer } = connectionSlice;

export default reducer;
