import { Store } from '../../store';
import { createSelector } from "@reduxjs/toolkit";
import { ConnectionStatus } from '../../models/connection/ConnectionStatus';

export const connectionStatusSelector = createSelector(
    (store: Store) : ConnectionStatus => store.connection.connectionStatus,
    (state: ConnectionStatus) => state
);