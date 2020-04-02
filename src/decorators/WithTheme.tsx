import React from 'react';
import { ThemeProvider as GameThemeProvider } from 'react-jss';
import { ThemeProvider as UI5ThemeProvider } from '@ui5/webcomponents-react/lib/ThemeProvider';
import { createTheme } from '../theme';

export const withTheme = (Component: React.ComponentType): React.ComponentType => {
  const WrappedComponent: React.FC = () => (
    <UI5ThemeProvider withToastContainer>
      <GameThemeProvider theme={createTheme}>
        <Component />
      </GameThemeProvider>
    </UI5ThemeProvider>
  );
  WrappedComponent.displayName = `withTheme`;
  return WrappedComponent;
};
