import React from 'react';
import { Text } from '@ui5/webcomponents-react/lib/Text';
import { Label } from '@ui5/webcomponents-react/lib/Label';
import { Card } from '../../models/game/card'
import { useStyles } from './GameCard.jss';
import { TEAM_A, CIVILIAN, ASSASSIN, UNKNOWN } from '../../models/game/agent';
import { TEAM_B } from '../../models/game/agent';
import { Event } from '@ui5/webcomponents-react-base';
import { CheckBox } from '@ui5/webcomponents-react/lib/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { submitVoteForWord, removeVoteForWord } from '../../redux/game/actions';
import { clueSelector } from '../../redux/game/selectors';

interface GameCartProps{
    card: Card;
    isMapOwner: boolean;
    hasBeenVotedByPlayer: boolean;
    isFromTeamPlaying: boolean;
}

export const GameCard : React.FC<GameCartProps> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { card, isMapOwner, hasBeenVotedByPlayer, isFromTeamPlaying } = props;
    const clue = useSelector(clueSelector);

    const onVoteStateChange = (event : Event) => {
        if(event.parameters.checked){
            dispatch(submitVoteForWord({word: card.word}));
        } else {
            dispatch(removeVoteForWord({word: card.word}));
        }
    }

    const getClassName = () => {
        let className = classes.notRevealed;
        switch(card.agent){
            case TEAM_A:
                className = classes.teamA
                break;
            case TEAM_B:
                className = classes.teamB
                break;
            case CIVILIAN:
                className = classes.civilian
                break;
            case ASSASSIN:
                className = classes.assassin
                break;
            case UNKNOWN:
                className = classes.notRevealed
                break;
        }
        if(card.hasBeenRevealed){
            className += " " + classes.revealed;
        }
        return className;
    }

    const shouldDisplayCheckBox = () => {
        if(card.hasBeenRevealed){
            return false;
        }

        if(isMapOwner){
            return false;
        }

        if(!clue){
            return false;
        }

        if(!isFromTeamPlaying){
            return false;
        }

        return true;
    }

    return(
        <div className={getClassName()}>
            {shouldDisplayCheckBox()? <CheckBox checked={hasBeenVotedByPlayer} onChange={onVoteStateChange}/> : <p></p>}
            <Text style={{fontWeight: "bold"}}>{card.word}</Text>
            {card.hasBeenRevealed ? <Label className={classes.revealedLabel}>Revealed</Label> : ''}
        </div>
    )
}