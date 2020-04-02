import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    container: {
        width: '100%',
        height: '90%',
        display: 'flex',
        marginBottom: '1%',
        marginLeft: '2%',
        marginRight: '2%',
        flexDirection: 'column',
    },

    messagesArea: {
        overflowY: 'auto',
        backgroundColor: parameters.sapNeutralBackground,
        marginRight: '4%',
        marginBottom: '5px',
    },

    inputArea:{
        display: 'flex',
        marginRight: '4%',
        marginTop: 'auto',
        bottom: '0',
    }
});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'Chat',
  });
  