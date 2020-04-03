import React from 'react';
import { GameCard } from './GameCard';
import { useStyles } from './Board.jss';

export const Board : React.FC = () =>{
    const classes = useStyles();

    return (
        <div className={classes.gridContainer}>
            {Array.from(Array(25).keys()).map(() => (
                <div className={classes.gridItem}><GameCard /></div>                
            ))}
        </div>
    )
}