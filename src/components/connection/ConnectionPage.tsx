import React, { useState } from 'react';
import { Input } from '@ui5/webcomponents-react/lib/Input';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { Spinner } from '@ui5/webcomponents-react/lib/Spinner';
import { Text } from '@ui5/webcomponents-react/lib/Text';
import { Event } from '@ui5/webcomponents-react-base';
import { useDispatch, useSelector } from 'react-redux';
import { connectToServer } from '../../redux/connection/actions';
import { useStyles } from './ConnectionPage.jss';
import { connectionStatusSelector } from '../../redux/connection/selectors';
import { ConnectionStatus } from '../../models/connection/ConnectionStatus';

export const ConnectionPage : React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const connectionStatus = useSelector(connectionStatusSelector);

    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');

    const handleConnectionClick = (event : Event): void =>{
        event.cancel();
        dispatch(connectToServer({userName: userName, room: room}));
    }

    const isConnectionButtonEnabled = () : boolean =>{
        return userName.length === 0 || room.length === 0 || connectionStatus !== ConnectionStatus.Disconnected;
    }

    const ConnectingComponent : React.FC = () => {
        return connectionStatus === ConnectionStatus.Connecting ? 
            <div className={classes.containerItem}>
                <Spinner className={classes.containerItem}/>
                <Text className={classes.containerItem}>Connecting to Server...</Text>
            </div>
        : null
    }

    return (
        <div className={classes.container}>
            <Input className={classes.containerItem} placeholder={"Enter Your UserName"} value={userName} onInput={(event): void => setUserName(event.parameters.value)}/>
            <Input className={classes.containerItem} placeholder={"Enter the Name of the Room"} value={room} onInput={(event): void => setRoom(event.parameters.value)}/>
            <Button 
                className={classes.containerItem}
                onClick={handleConnectionClick} 
                disabled={isConnectionButtonEnabled()}
                design={ButtonDesign.Emphasized}>
                    Create or Join Room
            </Button>
            <ConnectingComponent/>
        </div>
    );
}
