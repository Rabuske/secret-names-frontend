import { Store } from '../../store';
import { createSelector } from "@reduxjs/toolkit";

export const isConnectedSelector = createSelector(
    (store: Store) : boolean => store.connection.isConnected,
    (state: boolean) => state
);