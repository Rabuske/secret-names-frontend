import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },

    membersArea: {
        overflowY: 'auto',
    },

});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'Chat',
  });
  