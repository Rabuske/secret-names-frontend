import React from 'react';
import { BeforeStartHost } from "./BeforeStartHost";
import { BeforeStartRegularPlayer } from "./BeforeStartRegularPlayer";
import { AfterStartMapOwner } from './AfterStartMapOwner';
import { AfterStartRegularPlayer } from './AfterStartRegularPlayer';
import { useSelector } from 'react-redux';
import { hasGameStartedSelector, playerSelector, isTheKnowAllSelector, isPlayerInTeamCurrentlyPlayingSelector } from '../../../redux/game/selectors';

export const GameControlWrapper : React.FC = () => {
    const hasGameStarted = useSelector(hasGameStartedSelector);
    const player = useSelector(playerSelector); 
    const isTheKnowAll = useSelector(isTheKnowAllSelector);
    const isInTeamCurrentlyPlaying = useSelector(isPlayerInTeamCurrentlyPlayingSelector)

    return(
        <div>
            {!hasGameStarted && !player.isHost ? <BeforeStartRegularPlayer/> : '' }
            {!hasGameStarted && player.isHost ? <BeforeStartHost /> : '' }
            {hasGameStarted && isTheKnowAll && isInTeamCurrentlyPlaying ? <AfterStartMapOwner /> : '' }
            {hasGameStarted && (!isTheKnowAll || !isInTeamCurrentlyPlaying)  ? <AfterStartRegularPlayer /> : '' }
        </div>
    )
}
