import React, { useState } from 'react';
import { Input } from '@ui5/webcomponents-react/lib/Input';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { Event } from '@ui5/webcomponents-react-base';
import { useDispatch } from 'react-redux';
import { connectToServer } from '../../redux/connection/actions';
import { useStyles } from './ConnectionPage.jss';

export const ConnectionPage : React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');

    const handleConnectionClick = (event : Event): void =>{
        event.cancel();
        dispatch(connectToServer({userName: userName, room: room}));
    }

    const isConnectionButtonEnabled = () : boolean =>{
        return userName.length === 0 || room.length === 0;
    }

    return (
        <div className={classes.contentContainer}>
            <Input placeholder={"Enter Your UserName"} value={userName} onInput={(event): void => setUserName(event.parameters.value)}/>
            <Input placeholder={"Enter the Name of the Room"} value={room} onInput={(event): void => setRoom(event.parameters.value)}/>
            <Button 
                onClick={handleConnectionClick} 
                disabled={isConnectionButtonEnabled()}
                design={ButtonDesign.Emphasized}>
                    Create or Join Room
            </Button>
        </div>
    );
}
