import { FC, useContext, useEffect, useState } from "react";
import { Modules } from "../../../..";
import { IPrivate, IPrivateMessages } from "../../../../services/modules/ChatModule/ChatModule";
import './privateMessagesChooser.scss';

const PrivateMessagesChooser: FC = () => {
    const chatModule = useContext(Modules).chatModule;
    const [messages, setMessages] = useState<IPrivateMessages>(chatModule.getPrivateMessages());

    useEffect(() => {
        chatModule.mediator.subscribe(chatModule.EVENTS.ON_PRIVATE_MESSAGES_RECIVED, setMessages);
        return () => {
            chatModule.mediator.unsubscribe(chatModule.EVENTS.ON_PRIVATE_MESSAGES_RECIVED, setMessages);
        }
    });

    return(
        <div className="private-messages-choose-wrapper">
            {
                Object.values(messages).map((message: IPrivate, index: number) => {
                    const mess = Object.values(message);
                    return (
                        <div key={index} className="private-message-wrapper">
                            <div className="private-name">{mess[0].name}</div>
                            <div className="private-message">{JSON.parse(mess[0].message)}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default PrivateMessagesChooser;