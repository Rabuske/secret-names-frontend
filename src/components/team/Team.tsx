import React, { useState } from 'react';
import { List } from '@ui5/webcomponents-react/lib/List';
import { GroupHeaderListItem } from '@ui5/webcomponents-react/lib/GroupHeaderListItem';
import { ListItemTypes } from '@ui5/webcomponents-react/lib/ListItemTypes';
import { StandardListItem as ListItem } from '@ui5/webcomponents-react/lib/StandardListItem';
import { useStyles } from './Team.jss';
import { teamASelector, teamBSelector } from '../../redux/game/selectors';
import { useSelector } from 'react-redux';
import { TEAM_A } from '../../models/game/team';

interface TeamProps{
    teamName: string;
}

export const Team : React.FC<TeamProps> = (props) => {
    const teamName = props.teamName;
    const classes = useStyles();
    const team = useSelector(teamName === TEAM_A ? teamASelector : teamBSelector)

    return(
        <div className={classes.container}>
            <List className={classes.membersArea} infinite-scroll>
                <GroupHeaderListItem>{team.name}</GroupHeaderListItem>
                {team.players.map( (player) => 
                    <ListItem type={ListItemTypes.Inactive}>{player.userName}</ListItem>
                )}
            </List>
        </div>
    );
}