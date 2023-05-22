import { FC, useState, useContext, useEffect, useRef } from "react";
import { IMessages, Message } from '../../../../services/modules/ChatModule/ChatModule';
import { User } from "../../../../services/modules/UserModule/UserModule";
import { Modules } from "../../../..";
import './messagesWrapper.scss';

const MessagesWrapper: FC = () => {
    const { chatModule, userModule } = useContext(Modules);
    const [messages, setMessages] = useState<IMessages>(chatModule.getMessages());
    const [user, setUser] = useState<User>(userModule.getInnerUser());
    const [scrolling, setScrolling] = useState<boolean>(true);
    const messageWrapper = useRef<HTMLDivElement>(null);
    const messageItem = useRef<HTMLDivElement>(null);

    const messagesArr = Object.values(messages);

    useEffect(() => {
        const { ON_CACHE_MESSAGES_RECIVED, ON_NEW_MESSAGE, ON_USER_LOGIN } = chatModule.EVENTS;

        if ( user.guid === '' )                  { userModule.mediator.subscribe(ON_USER_LOGIN, setUser) };
        if ( Object.keys(messages).length <= 0 ) { chatModule.mediator.subscribe(ON_CACHE_MESSAGES_RECIVED, setMessages); }

        chatModule.mediator.subscribe(ON_NEW_MESSAGE, setMessages);

        return () => {
            chatModule.mediator.unsubscribe(ON_CACHE_MESSAGES_RECIVED, setMessages);
            chatModule.mediator.unsubscribe(ON_NEW_MESSAGE, setMessages);
            userModule.mediator.unsubscribe(ON_USER_LOGIN, setUser);
        }
    });

    async function onScroll() {
        const scrollTop = messageWrapper.current?.scrollTop || 0;
        const height = messageItem.current?.clientHeight || 0;
        if(scrollTop <= -(height * messagesArr.length - 15) && scrolling) {
            setScrolling(false);
            const recivedMessages = await chatModule.getNewBatchOfMessages(messagesArr.length);
            if(recivedMessages) {
                setMessages(recivedMessages);
                setScrolling(true);
            }
        }
    }

    function onMessageClickHandler(key: any, selfMessage: boolean) {
        if(selfMessage) { chatModule.pullMessageToEdit(key) };
    }

    return(
        <div className="messages-wrapper" onScroll={onScroll} ref={messageWrapper}>
            {
                messagesArr.reverse().map((message:Message) => {
                    return(
                        <div
                            key={message.id} 
                            className={`message-item ${ message.senderId === user?.id ? 'your-message' : ''}`}
                            ref={messageItem}
                            onClick={() => onMessageClickHandler(message.id, message.senderId === user?.id)}
                        >
                            <div className={`message-image`}></div>
                            <div className="message-block">
                                <p className="message-line">
                                    {`${message.message}`}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MessagesWrapper;