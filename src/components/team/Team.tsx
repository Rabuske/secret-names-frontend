import React from 'react';
import { List } from '@ui5/webcomponents-react/lib/List';
import { GroupHeaderListItem } from '@ui5/webcomponents-react/lib/GroupHeaderListItem';
import { ListItemTypes } from '@ui5/webcomponents-react/lib/ListItemTypes';
import { StandardListItem as ListItem } from '@ui5/webcomponents-react/lib/StandardListItem';
import { useStyles } from './Team.jss';
import { teamASelector, teamBSelector, isHostSelector, knowAllForTeamASelector, knowAllForTeamBSelector } from '../../redux/game/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Event } from '@ui5/webcomponents-react-base';


import '@ui5/webcomponents-icons/dist/icons/map-2';
import { switchTeamMember } from '../../redux/game/actions';
import { TEAM_A, TEAM_B } from '../../models/game/agent';

interface TeamProps{
    teamID: string;
}

export const Team : React.FC<TeamProps> = (props) => {
    const { teamID } = props;
    const classes = useStyles();
    const team = useSelector(teamID === TEAM_A ? teamASelector : teamBSelector);
    const knowAllPlayer = useSelector(teamID === TEAM_B ? knowAllForTeamBSelector : knowAllForTeamASelector);
    const isHost= useSelector(isHostSelector);
    const dispatch = useDispatch();
    
    const canChangeMember = () => {
        return isHost //&& !game.hasStarted;
    }

    const getListType = () => canChangeMember()? ListItemTypes.Active : ListItemTypes.Inactive;

    const onListItemClick = (event: Event) => {
        dispatch(switchTeamMember({userName:event.parameters.item.textContent}));        
    }

    return(
        <div className={classes.container}>
            <List onItemClick={onListItemClick}>
                <GroupHeaderListItem className={team.id === TEAM_A? classes.teamAHeader : classes.teamBHeader}>
                    {team.name}
                </GroupHeaderListItem>
                <div className={classes.membersArea}>
                    {team.players.map((player) => 
                        <ListItem 
                            type={getListType()} 
                            icon={knowAllPlayer.userName === player.userName? 'map-2' : ''}
                            iconEnd={true}
                            description={player.isHost? "Host" : ''}
                            info={knowAllPlayer.userName === player.userName? "Has the Map" : ""}
                            key={player.userName}

                        >
                            {player.userName}
                        </ListItem>
                    )}
                </div>
            </List>
        </div>
    );
}