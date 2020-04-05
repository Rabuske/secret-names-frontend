import { JSSThemeEditor } from '../../theme';
import { createUseStyles, Styles } from 'react-jss';
import { boardStyles } from './Board.jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    notRevealed: {
        extend: boardStyles.gridItem,
        backgroundColor: "#FAE5D3"
    },
    teamA: {
        extend: boardStyles.gridItem,
        backgroundColor: parameters.sapAccentColor5
    },
    teamB: {
        extend: boardStyles.gridItem,
        backgroundColor: parameters.sapAccentColor2
    },
    civilian: {
        extend: boardStyles.gridItem,
        backgroundColor: parameters.sapAccentColor1
    },
    assassin: {
        extend: boardStyles.gridItem,
        backgroundColor: parameters.sapAccentColor10
    },
    revealed: {
        border: "solid",
        borderWidth: "5px 5px 5px 5px",
        boxSizing: "border-box",
        borderColor: "#663300",
    },    
    word: {
        fontWeight: "bold",
    },
    revealedLabel: {
        paddingTop: '5px',
        paddingLeft: '5px',
        color: parameters.sapPrimary3
    }
});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'Card',
  });