import React from 'react';
import { Text } from '@ui5/webcomponents-react/lib/Text';
import { useStyles } from './GameControlWrapper.jss';
import { useSelector } from 'react-redux';
import { roundSelector, isPlayerInTeamCurrentlyPlayingSelector } from '../../../redux/game/selectors';

export const AfterStartRegularPlayer : React.FC = () => {
    const classes = useStyles();
    const round = useSelector(roundSelector);
    const isPlayerInTeamCurrentlyPlaying = useSelector(isPlayerInTeamCurrentlyPlayingSelector);

    const getTextForClueDisplay = () => {
        if(!round.clue){
            return isPlayerInTeamCurrentlyPlaying? "Waiting for your teammate to enter the clue" : "Waiting for the other team to enter the clue!";
        }
        
        return `The clue is ${round.clue}`;
    }

    const getTextForRemainingGuessesDisplay = () => {
        if(!round.clue){
            return "";
        }
        
        return isPlayerInTeamCurrentlyPlaying? `Your team can guess ${round.remainingGuesses} times` : `The other team can guess ${round.remainingGuesses} times`;
    }

    return(
        <div className={classes.regularPlayerContainer}>
            <Text>{getTextForClueDisplay()}</Text>
            <p></p>
            <Text>{getTextForRemainingGuessesDisplay()}</Text>
        </div>
    )
}