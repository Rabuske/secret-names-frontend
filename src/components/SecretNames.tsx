import React from 'react';
import {Chat} from './chat/Chat'
import {Board} from './board/Board'
import { useSelector } from 'react-redux';
import { isConnectedSelector } from '../redux/connection/selectors';
import { ConnectionPage } from './connection/ConnectionPage';

const Game: React.FC<boolean> = props => {
    const isConnected = props;

    if(isConnected){
        return (
            <div>
                <Chat/>
                <Board/>
            </div>
        );
    } else {
        return <ConnectionPage/>
    }
}

export const SecretNames : React.FC = () =>{
    return Game(useSelector(isConnectedSelector));
}