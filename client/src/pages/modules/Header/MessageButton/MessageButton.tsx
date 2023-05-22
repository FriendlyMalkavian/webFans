import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routes";
import MessageIcon from "./MessageIcon/MessageIcon";
import './messageButton.scss';

const MessageButton: FC = () => {
    const navigte = useNavigate();
    function routeToChat() { return navigte(ROUTES.messanger.path); }

    return(
        <button
            onClick={routeToChat}
            className="message-button"
        >
            <MessageIcon/>
        </button>
    );
}

export default MessageButton;