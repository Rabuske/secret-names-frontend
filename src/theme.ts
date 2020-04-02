import { JSSTheme } from '@ui5/webcomponents-react/interfaces/JSSTheme';

const themeGame = {
  space: {
    tiny: '4px' as '4px',
    small: '8px' as '8px',
    regular: '16px' as '16px',
    medium: '24px' as '24px',
    large: '32px' as '32px',
  },
};

type ThemeGame = typeof themeGame;

export interface JSSThemeEditor extends JSSTheme, ThemeGame {}

export const createTheme = (theme: JSSTheme): JSSThemeEditor => ({
  ...theme,
  ...themeGame,
});
