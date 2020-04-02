import { createSelector } from "@reduxjs/toolkit";
import { Store } from '../../store';
import { Message } from '../../models/chat/message';

export const chatMessagesSelector = createSelector(
    (store: Store) : Message[] => store.chat.messages,
    (state: Message[]) => state
);