import { Message } from "../../models/chat/message";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatState{  
    userId: string;
    userName: string;
    messages: Array<Message>;
    typedText: string;
}

const initialState : ChatState = {
    userId: '',
    userName: 'Type your username here',
    messages: [],
    typedText: '',
}

export const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        sendMessageToChat : (state: ChatState, action: PayloadAction<{text: string}>): void => {
            const newMessage : Message = {
                text: action.payload.text,
                userName: state.userName
            } 
            const messages = state.messages;
            messages.push(newMessage);
        },

        receiveMessage : (state: ChatState, action: PayloadAction<{text: string, userName: string}>): void => {
            const newMessage : Message = {
                text: action.payload.text,
                userName: action.payload.userName
            } 
            const messages = state.messages;
            messages.push(newMessage);
        }
    }
})

const { reducer } = chatSlice;

export default reducer;
