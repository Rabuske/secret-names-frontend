import React from 'react';
import { Text } from '@ui5/webcomponents-react/lib/Text';
import { useStyles } from './GameControlWrapper.jss';

export const BeforeStartRegularPlayer : React.FC = () => {
    const classes = useStyles();

    return(
        <div className={classes.messageWaitingHost}>
            <Text>Waiting for the Host to start the game once everyone has joined...</Text> 
        </div>
    )
}