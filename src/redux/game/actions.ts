import { connectionSlice } from "./reducers";

const { actions } = connectionSlice;

export const {
    setIsHost,
    setRoomName,
    setUserName,
    addUserToRoom,
    removeUserFromRoom,
} = actions;