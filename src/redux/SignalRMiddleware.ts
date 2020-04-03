import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from "redux";
import { connectToServer, connectionAccepted} from './connection/actions'
import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
  HubConnection
} from '@aspnet/signalr';
import { updateGame, setPlayer } from "./game/actions";
import { store } from "../store";
import { receiveMessage, sendMessageToChat } from "./chat/actions";
import { Room } from "../models/game/room";

let _connection : HubConnection;

const startSignalRConnection = (room : string, userName: String) => _connection.start()
  .then(() => {
    _connection.invoke('RegisterNewUser', userName, room);
  })
  .catch(err => console.error('SignalR Connection Error: ', err));

const createSignalRConnection = (token: string) : void => {
  const url = process.env.REACT_APP_HUB_URL || 'https://localhost:5001/hub/game';
  const protocol = new JsonHubProtocol();
  const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;
  const options = {
    transport,
    logMessageContent: true,
    logger: LogLevel.Trace,
    accessTokenFactory: () => token
  };
  // create the connection instance
  _connection = new HubConnectionBuilder()
    .withUrl(url, options)
    .withHubProtocol(protocol)
    .build();
}

const onConnectionAccepted = (validUserName: string) : void => {
  store.dispatch(connectionAccepted());
  store.dispatch(setPlayer({userName : validUserName}));
}

const onUpdate = (room : Room) => {
  store.dispatch(updateGame({ room : room }));
}

// I don't like these games
const onChatMessageSent = (text : string, userName : string) => {
  store.dispatch(receiveMessage({text: text, userName: userName}));
} 

export const SignalRMiddleware: Middleware<Dispatch> = ({dispatch}: MiddlewareAPI) => next => (action: AnyAction) => {
  switch(action.type){
    case connectToServer.type:
      const userName = action.payload.userName as string;
      const room = action.payload.room as string;

      createSignalRConnection(userName);
      startSignalRConnection(room, userName);

      _connection.on("connectionAccepted", onConnectionAccepted);
      _connection.on("updateGame", onUpdate);

      _connection.on("chatMessageSent", onChatMessageSent);

      // event handlers, you can use these to dispatch actions to update your Redux store
      //connection.on('OperationProgress', onNotifReceived);
      //connection.on('UploadProgress', onNotifReceived);
      //connection.on('DownloadProgress', onNotifReceived);

      // re-establish the connection if connection dropped
      //connection.onclose(() => setTimeout(5000));
      break;
 
    case sendMessageToChat.type:
      _connection.invoke("SendChatMessage", action.payload.text);
      
      break;
    default:
      return next(action);
  }
};