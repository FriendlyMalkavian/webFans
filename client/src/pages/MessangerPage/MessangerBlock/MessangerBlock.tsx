import { FC } from 'react';
import PrivateMessagesChooser from './PrivateMessagesChooser/PrivateMessagesChooser';
import MessagesSenderBlock from './MessagesSenderBlock/MessagesSenderBlock';
import MessagesWrapper from './MessagesWrapper/MessagesWrapper';
import './messangerBlock.scss';

const MessangerBlock: FC = () => {
    return(
        <div className="messanger-block">
            <PrivateMessagesChooser/>
            <div className="chat-wrapper">
                <MessagesWrapper/>
                <MessagesSenderBlock/>
            </div>
        </div>
    );
}

export default MessangerBlock;