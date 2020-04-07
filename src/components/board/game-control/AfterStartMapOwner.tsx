import React, { useState } from 'react';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { Text } from '@ui5/webcomponents-react/lib/Text';
import { Input } from '@ui5/webcomponents-react/lib/Input';
import { InputType } from '@ui5/webcomponents-react/lib/InputType';
import { Event } from '@ui5/webcomponents-react-base';
import { useDispatch, useSelector } from 'react-redux';
import { submitClue } from '../../../redux/game/actions';
import { useStyles } from './GameControlWrapper.jss';
import { isPlayerInTeamCurrentlyPlayingSelector, isClueSubmittedSelector} from '../../../redux/game/selectors';


export const AfterStartMapOwner : React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [clue, setClue] = useState("");
    const [numberOfWords, setNumberOfWords] = useState("");
    const isClueSubmitted = useSelector(isClueSubmittedSelector);
    const isPlayerInTeamCurrentlyPlaying = useSelector(isPlayerInTeamCurrentlyPlayingSelector);
    
    const handleSubmitClueClick = (event: Event) => {
        if(numberOfWords.length === 0){
            return;
        }
        dispatch(submitClue({clue:clue, numberOfWords:numberOfWords}));
        setClue("");
        setNumberOfWords("");
    }

    const onNumberOfWordsChanged = (event: Event) => {
        setNumberOfWords(event.parameters.value);
    }

    const isSubmitClueDisabled = () => {
        const numberOfWordsNumeric : number =  Number.parseInt(numberOfWords);
        if(clue.length === 0){ 
            return true;
        } 

        if(numberOfWordsNumeric > 25 || numberOfWordsNumeric < 0){
            return true;
        }

        if(isClueSubmitted){
            return true;
        }

        return false;
    }

    const playerCurrentPlayingView = () => {
        return(
            <div>
                <Input 
                    value={clue} 
                    onChange={(event) => setClue(event.parameters.value)}
                    onInput={(event) => setClue(event.parameters.value)}                    
                    disabled={isClueSubmitted}
                    placeholder={"Enter here your clue"}
                />
                <Input                
                    type={InputType.Number} 
                    placeholder={"Enter here the number of words associated with the clue"}
                    onChange={onNumberOfWordsChanged}
                    value={numberOfWords.toString()}
                    disabled={isClueSubmitted}
                />
                <Button
                    design={ButtonDesign.Accept}
                    disabled={isSubmitClueDisabled()}
                    onClick={handleSubmitClueClick}
                >
                    Submit Clue
                </Button>
            </div>
        )
    }

    const playerNotCurrentlyPlayingView = () => {
        return(
            <Text>Other team is playing!</Text>
        )
    }

    return(
        <div className={classes.mapOwnerContainer}>
            {isPlayerInTeamCurrentlyPlaying? playerCurrentPlayingView() : playerNotCurrentlyPlayingView()}
        </div>
    )
}