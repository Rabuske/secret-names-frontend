import React, { useRef, useEffect } from 'react';
import { Message } from '../../models/chat/message';
import { useSelector, useDispatch } from 'react-redux';
import { chatMessagesSelector } from '../../redux/chat/selectors';
import { Input } from '@ui5/webcomponents-react/lib/Input';
import { Text } from '@ui5/webcomponents-react/lib/Text';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { Event } from '@ui5/webcomponents-react-base';
import '@ui5/webcomponents-icons/dist/icons/post';
import '@ui5/webcomponents-icons/dist/icons/add';
import { sendMessageToChat } from '../../redux/chat/actions';
import { useStyles } from './Chat.jss';

interface ChatProps{
    messageText: string;
    setMessageText: (messageText : string) => void;
}

//export const Chat : React.FC<ChatProps> = props =>{
export const Chat : React.FC = () =>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const messageAreaRef = useRef(null);

    const messages : Message[] = useSelector(chatMessagesSelector);
    const [ messageText, setMessageText ] = React.useState<string>('');

    const handleAddMessage = (event : Event): void =>{
        event.cancel();
        if (messageText.length === 0) {
          return;
        }
        dispatch(sendMessageToChat({text: messageText}));
        setMessageText('');
    }

    useEffect(() => {
        //@ts-ignore
        messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    });

    return (
        <div className={classes.container}>
            <div className={classes.messagesArea} ref={messageAreaRef}>
                {messages.map((message, index) => 
                    <p>
                        <Text><b>{message.userName + ': '}</b>{message.text}</Text>
                    </p>
                )}
            </div>
            <div className={classes.inputArea}>
                <Input                
                    value={messageText}
                    placeholder={'Enter Your Message'}
                    onInput={(event): void => setMessageText(event.parameters.value)}
                    onSubmit={handleAddMessage}
                />
                <Button
                    design={ButtonDesign.Emphasized}
                    onClick={handleAddMessage}
                    icon={"add"}
                />
            </div>
        </div>
        
    );
}