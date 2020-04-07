import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    container :{
        display: "flex",
        flexDirection: "column",
        marginLeft: "25%",
        marginRight: "25%",
        marginTop: "10%",
    },
    containerItem: {
        textAlign: "center",
        marginTop: "25px",
        position: "relative",
    },    
});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'ConnectionPage',
  });
  