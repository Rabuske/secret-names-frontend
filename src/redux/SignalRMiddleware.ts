import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from "redux";
import { connectToServer, setConnectionStatus} from './connection/actions'
import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
  HubConnection
} from '@aspnet/signalr';
import { updateGame, setPlayer, switchTeamMember, startGame, submitClue, submitVoteForWord, removeVoteForWord, passTurn } from "./game/actions";
import { store } from "../store";
import { receiveMessage, sendMessageToChat } from "./chat/actions";
import { Room } from "../models/game/room";
import { MessageToast } from '@ui5/webcomponents-react/lib/MessageToast';
import { ConnectionStatus } from "../models/connection/ConnectionStatus";

let _connection : HubConnection;

const startSignalRConnection = (room : string, userName: String) => _connection.start()
  .then(() => {
    _connection.invoke('RegisterNewUser', userName, room);
  })
  .catch(err => {
    MessageToast.error("Cannot Connect to Server");
    store.dispatch(setConnectionStatus(ConnectionStatus.Disconnected));
  });

const createSignalRConnection = (token: string) : void => {
  const url = process.env.REACT_APP_HUB_URL as string;
  const protocol = new JsonHubProtocol();
  const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;
  const options = {
    transport,
    logMessageContent: process.env.NODE_ENV === "development",
    logger: process.env.NODE_ENV === "development" ? LogLevel.Trace : LogLevel.Critical,
    accessTokenFactory: () => token,
  };
  // create the connection instance
  _connection = new HubConnectionBuilder()
    .withUrl(url, options)
    .withHubProtocol(protocol)
    .build();
}

const onConnectionAccepted = (validUserName: string, isHost: boolean) : void => {
  store.dispatch(setConnectionStatus(ConnectionStatus.Connected));
  store.dispatch(setPlayer({userName : validUserName, isHost: isHost }));
}

const onUpdate = (room : Room) => {
  store.dispatch(setConnectionStatus(ConnectionStatus.Connected));
  store.dispatch(updateGame({ room : room }));
}

const onChatMessageSent = (text : string, userName : string) => {
  store.dispatch(receiveMessage({text: text, userName: userName}));
} 

const onDisplayMessage = (messageType: string, messageText : string) => {
  switch (messageType) {
    case "ERROR":
      MessageToast.error(messageText);
      break;
    case "SUCCESS":
      MessageToast.success(messageText);
      break;
    case "WARNING":
      MessageToast.success(messageText);
      break;
    default:
      MessageToast.show(messageText);
      break;
  }
}

export const SignalRMiddleware: Middleware<Dispatch> = ({dispatch}: MiddlewareAPI) => next => (action: AnyAction) => {
  switch(action.type){
    case connectToServer.type:
      const userName = action.payload.userName as string;
      const room = action.payload.room as string;
      store.dispatch(setConnectionStatus(ConnectionStatus.Connecting));

      createSignalRConnection(userName);
      startSignalRConnection(room, userName);

      _connection.on("connectionAccepted", onConnectionAccepted);
      _connection.on("updateGame", onUpdate);

      _connection.on("chatMessageSent", onChatMessageSent);
      _connection.on("displayMessage", onDisplayMessage);

      _connection.onclose(() => store.dispatch(setConnectionStatus(ConnectionStatus.Disconnected)));

      break;
 
    case sendMessageToChat.type:
      _connection.invoke("SendChatMessage", action.payload.text);
      
      break;
    
    case switchTeamMember.type:
      _connection.invoke("SwitchTeamMember", action.payload.userName);
      break;

    case startGame.type:
      _connection.invoke("StartGame");
      break;

    case submitClue.type:
      _connection.invoke("ReceiveClue", action.payload.clue, action.payload.numberOfWords);
      break;

    case submitVoteForWord.type:
      _connection.invoke("VoteForWord", action.payload.word);
      break;

    case removeVoteForWord.type:
      _connection.invoke("RemoveVoteForWord");
      break;
    
    case passTurn.type:
      _connection.invoke("PassTurn");
      break;
    default:
      return next(action);
  }
};