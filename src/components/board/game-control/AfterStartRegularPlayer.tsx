import React from 'react';
import { Text } from '@ui5/webcomponents-react/lib/Text';
import { useStyles } from './GameControlWrapper.jss';
import { useSelector, useDispatch } from 'react-redux';
import { roundSelector, isPlayerInTeamCurrentlyPlayingSelector } from '../../../redux/game/selectors';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { passTurn } from '../../../redux/game/actions';

export const AfterStartRegularPlayer : React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const round = useSelector(roundSelector);
    const isPlayerInTeamCurrentlyPlaying = useSelector(isPlayerInTeamCurrentlyPlayingSelector);

    const getTextForClueDisplay = () => {
        if(!round.clue){
            return isPlayerInTeamCurrentlyPlaying? "Waiting for your teammate to enter the clue" : "Waiting for the other team to enter the clue!";
        }
        return `The clue is ${round.clue}, related to ${round.numberOfWordsRelatedToGuess} words`;
    }

    const getTextForRemainingGuessesDisplay = () => {
        if(!round.clue){
            return "";
        }
        return isPlayerInTeamCurrentlyPlaying? `Your team can guess ${round.remainingGuesses} times` : `The other team can guess ${round.remainingGuesses} times`;
    }

    const handlePassButtonClick = () => {
        dispatch(passTurn());
    } 

    return(
        <div className={classes.regularPlayerContainer}>
            <Text>{getTextForClueDisplay()}</Text>
            <Text>{getTextForRemainingGuessesDisplay()}</Text>
            <p></p>
            {isPlayerInTeamCurrentlyPlaying && round.isClueSubmitted? 
                <Button design={ButtonDesign.Reject} onClick={handlePassButtonClick}>Pass</Button>
            :''}
        </div>
    )
}