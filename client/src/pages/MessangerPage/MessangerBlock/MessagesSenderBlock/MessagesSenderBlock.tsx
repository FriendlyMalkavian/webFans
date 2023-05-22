import { FC, useRef, useContext, useState, useEffect } from "react";
import { Modules } from "../../../..";
import { Message } from "../../../../services/modules/ChatModule/ChatModule";
import './messagesSenderBlock.scss';

const MessagesSenderBlock: FC = () => {
    const messageSenderRef = useRef<HTMLTextAreaElement>(null);
    const [isParagraph, setIsParagraph] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editId, setEditId] = useState<number|null>(null);
    const chatModule = useContext(Modules).chatModule;

    useEffect(() => {
        chatModule.mediator.set(chatModule.TRIGGERS.EDIT_MESSAGE, editMessage);
    }, []);
    
    async function sendMessage() {
        if(messageSenderRef.current) {
            const messageStr = messageSenderRef.current.value;

            if(editMode && editId) {
                const isEdit = await chatModule.editMessage(messageStr, editId);
                if(!isEdit) { console.log('message wasn`t edited') };
            } else {
                const isSent = await chatModule.sendMessage(messageStr);
                if(!isSent) { console.log('message wasn`t sent') };
            }
            messageSenderRef.current.value = '';
        }
        if(editMode) { setEditMode(false) }
    }

    function sendOnEnterKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            const message = messageSenderRef.current?.value;
            if(message !== '') {
                const loginButton = document.querySelector<HTMLButtonElement>('.send-message-button');
                setIsParagraph(false);
                return loginButton?.click();
            }
        } else if(e.keyCode === 13 && e.shiftKey) {
            setIsParagraph(true);
        }
    }

    function editMessage(message: Message) {
        if(message && messageSenderRef.current) {
            setEditMode(true);
            setEditId(message.id);
            messageSenderRef.current.value = JSON.parse(message.message);
        }
    }

    return(
        <div className="messages-sender-block">
            <div className={`send-messages-input-wrapper ${isParagraph ? 'enlarge-input-wrapper' : ''}`}>
                <textarea
                    className="send-messages-input"
                    ref={messageSenderRef}
                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => sendOnEnterKey(e)}
                />
            </div>
            <button 
                className="send-message-button"
                onClick={sendMessage}
            >Send</button>
        </div>
    );
}

export default MessagesSenderBlock;