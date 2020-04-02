import React from 'react';
import { Message } from '../../models/chat/message';
import { useSelector, useDispatch } from 'react-redux';
import { chatMessagesSelector } from '../../redux/chat/selectors';
import { isConnectedSelector } from '../../redux/connection/selectors';
import { TimelineItem } from '@ui5/webcomponents-react/lib/TimelineItem';
import { Timeline } from '@ui5/webcomponents-react/lib/Timeline';
import { Input } from '@ui5/webcomponents-react/lib/Input';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import { ButtonDesign } from '@ui5/webcomponents-react/lib/ButtonDesign';
import { Event } from '@ui5/webcomponents-react-base';
import '@ui5/webcomponents-icons/dist/icons/post';
import { sendMessageToChat } from '../../redux/chat/actions';

interface ChatProps{
    messageText: string;
    setMessageText: (messageText : string) => void;
}

//export const Chat : React.FC<ChatProps> = props =>{
export const Chat : React.FC = () =>{
    const dispatch = useDispatch();

    const messages : Message[] = useSelector(chatMessagesSelector);
    const isConnected: boolean = useSelector(isConnectedSelector);
    const [ messageText, setMessageText ] = React.useState<string>('');

    const handleAddMessage = (event : Event): void =>{
        event.cancel();
        if (messageText.length === 0) {
          return;
        }
        dispatch(sendMessageToChat({text: messageText}));
        setMessageText('');

        //
        //if (timelineRef.current) {
          //timelineRef.current.scrollTo(0, 0);
        //}
    }

    let chatMessageItems = messages.map((message, index) => (
        <TimelineItem
            key={index}
            data-testid={`timeline-item-${index}`}
            titleText={message.userName}
            icon="post">
        <div>{message.text}</div>
       </TimelineItem>
    ));

    return (
        <div>
            <Timeline data-testid="timeline-component">
                {chatMessageItems}
            </Timeline>
            <Input                
                value={messageText}
                placeholder={'Enter Your Message'}
                disabled={!isConnected}
                onInput={(event): void => setMessageText(event.parameters.value)}
                //data-testid="add-query-input"
                onSubmit={handleAddMessage}
           />
            <Button
                //className={classes.queryButton}
                design={ButtonDesign.Emphasized}
                onClick={handleAddMessage}
                disabled={!isConnected}
                //data-testid="add-query-button"
            >
                Send Message
            </Button>

        </div>
        
    );
}