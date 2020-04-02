import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    contentContainer: {
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'column',
        position: 'absolute',
        width: '50%',
        height: '30%',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '10%',
        justifyContent: 'space-around',
    },


});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'ConnectionPage',
  });
  