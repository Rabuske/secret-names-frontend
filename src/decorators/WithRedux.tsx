import { Provider as StoreProvider } from 'react-redux';
import React from 'react';
import { Store } from '@reduxjs/toolkit';

export const withRedux = (store: Store) => (Component: React.ComponentType): React.ComponentType => {
  const WrappedComponent: React.FC = () => (
    <StoreProvider store={store}>
      <Component />
    </StoreProvider>
  );
  WrappedComponent.displayName = `withRedux`;
  return WrappedComponent;
};
