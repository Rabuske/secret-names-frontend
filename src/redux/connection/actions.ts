import { connectionSlice } from "./reducers";

const { actions } = connectionSlice;

export const {
    connectToServer,
    connectionAccepted,
} = actions;