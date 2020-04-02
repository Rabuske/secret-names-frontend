import { chatSlice } from "./reducers";

const { actions } = chatSlice;

export const {
    sendMessageToChat,
    receiveMessage
} = actions;