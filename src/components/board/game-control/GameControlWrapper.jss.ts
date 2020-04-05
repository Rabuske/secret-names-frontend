import { JSSThemeEditor } from '../../../theme';
import { createUseStyles, Styles } from 'react-jss';

export const boardStyles : Styles = {
    messageWaitingHost : {
        textAlign: "center",
        paddingTop: "10px"
    },
    startButton : {
        padding: "25px",
        paddingTop: "5%",
        textAlign: "center",
        display: 'flex',
        flexDirection: 'column',
        overflow: "hidden",
    },
    regularPlayerContainer: {
        textAlign: "center",
        paddingTop: "15px",
        display: 'flex',
        flexDirection: 'column',
    },        
    mapOwnerContainer: {
        padding: "5px",
        textAlign: "center",
        display: 'flex',
        flexDirection: 'column',
    },    
}

const styles = ({ space, parameters }: JSSThemeEditor): Styles => boardStyles;

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'GameControl',
});

