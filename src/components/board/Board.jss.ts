import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    gridContainer : {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto',
        padding: '2px',
    },

    gridItem : {
        padding: '7px'
    }
});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'Board',
  });