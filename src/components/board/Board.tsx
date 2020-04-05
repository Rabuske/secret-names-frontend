import React from 'react';
import { GameCard } from './GameCard';
import { useStyles } from './Board.jss';
import { cardSelector, isTheKnowAllSelector, votesSelector, playerSelector, isPlayerInTeamCurrentlyPlayingSelector } from '../../redux/game/selectors';
import { useSelector } from 'react-redux';
import { Card } from '../../models/game/card';

export const Board : React.FC = () =>{
    const classes = useStyles();
    const isMapOwner = useSelector(isTheKnowAllSelector);
    const cards = useSelector(cardSelector);
    const votes = useSelector(votesSelector);
    const player = useSelector(playerSelector);
    const isPlayerInTeamCurrentlyPlaying = useSelector(isPlayerInTeamCurrentlyPlayingSelector);

    const hasBeenVotedByPlayer = (card: Card) => {
        return votes.filter(vote => vote.userName === player.userName && vote.word === card.word).length > 0;
    }
    
    return (
        <div className={classes.gridContainer}>
            {cards.map((card) => (
                <div className={classes.gridItem}>
                    <GameCard card={card} isMapOwner={isMapOwner} hasBeenVotedByPlayer={hasBeenVotedByPlayer(card)} isFromTeamPlaying={isPlayerInTeamCurrentlyPlaying}/>
                </div>
            ))}
        </div>
    )
}