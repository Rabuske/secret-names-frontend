import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';

export const boardStyles : Styles = {
    gridContainer : {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto',
        padding: '2px',
    },
    gridItem : {
        minHeight: '5.5em',
        minWidth: "20%",
        margin: '0.2em',
        borderRadius: '0.5em',
        textAlign: "center",
        display: 'flex',
        flexDirection: 'column',
        overflow: "hidden",
    }    
}

const styles = ({ space, parameters }: JSSThemeEditor): Styles => boardStyles;

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'Board',
});

