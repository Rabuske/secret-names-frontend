import { JSSThemeEditor } from '../theme';
import { createUseStyles, Styles } from 'react-jss';

const styles = ({ space, parameters }: JSSThemeEditor): Styles => ({
    panelContent:{
        backgroundColor: parameters.sapBackgroundColor,
        borderRadius: space.tiny,
        boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.2)',
    },
});

export const useStyles = createUseStyles<JSSThemeEditor, keyof ReturnType<typeof styles>>(styles, {
    name: 'SecretNames',
  });
  