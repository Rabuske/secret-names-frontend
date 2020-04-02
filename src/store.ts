import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import chat, { ChatState } from './redux/chat/reducers';
import connection, { ConnectionState } from './redux/connection/reducers';
import game, { GameState } from './redux/game/reducers';
import { SignalRMiddleware } from './redux/SignalRMiddleware';

export interface Store {
  chat: ChatState;
  connection: ConnectionState;
  game: GameState;
}

export const store = configureStore({
  reducer: {
    chat,
    connection,
    game,
  },
  middleware: [...getDefaultMiddleware({
    serializableCheck: false,
  }), SignalRMiddleware],
});
