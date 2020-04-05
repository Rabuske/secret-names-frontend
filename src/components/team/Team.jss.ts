import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflowY: 'auto',
    },

    membersArea: {
        display: 'flex',
        flexDirection: 'column',
    },

    teamAHeader: {
        backgroundColor: parameters.sapAccentColor5
    },

    teamBHeader: {
        backgroundColor: parameters.sapAccentColor2
    }
});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'Chat',
  });
  