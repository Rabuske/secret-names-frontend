import React from 'react';
import { BeforeStartHost } from "./BeforeStartHost";
import { BeforeStartRegularPlayer } from "./BeforeStartRegularPlayer";
import { AfterStartMapOwner } from './AfterStartMapOwner';
import { AfterStartRegularPlayer } from './AfterStartRegularPlayer';
import { useSelector } from 'react-redux';
import { hasGameStartedSelector, playerSelector, isTheKnowAllSelector } from '../../../redux/game/selectors';

export const GameControlWrapper : React.FC = () => {
    const hasGameStarted = useSelector(hasGameStartedSelector);
    const player = useSelector(playerSelector); 
    const isTheKnowAll = useSelector(isTheKnowAllSelector);

    return(
        <div>
            {!hasGameStarted && !player.isHost ? <BeforeStartRegularPlayer/> : '' }
            {!hasGameStarted && player.isHost ? <BeforeStartHost /> : '' }
            {hasGameStarted && isTheKnowAll ? <AfterStartMapOwner /> : '' }
            {hasGameStarted && !isTheKnowAll ? <AfterStartRegularPlayer /> : '' }
        </div>
    )
}
