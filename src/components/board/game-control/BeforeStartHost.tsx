import React from 'react';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { useSelector } from 'react-redux';
import { teamASelector, teamBSelector } from '../../../redux/game/selectors';
import { useDispatch } from 'react-redux';
import { startGame } from '../../../redux/game/actions';
import { useStyles } from './GameControlWrapper.jss';


export const BeforeStartHost : React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const teamA = useSelector(teamASelector);
    const teamB = useSelector(teamBSelector);

    const isStartButtonDisabled = () =>{
        return teamA.players.length < 2 || teamB.players.length < 2;
    }

    const handleStartGameClick = () => {
        dispatch(startGame());
    }

    return(
        <div className={classes.startButton}>
            <Button
                design={ButtonDesign.Accept}
                disabled={isStartButtonDisabled()}
                onClick={handleStartGameClick}
            >
                Start Game
            </Button>
        </div>
    )
}