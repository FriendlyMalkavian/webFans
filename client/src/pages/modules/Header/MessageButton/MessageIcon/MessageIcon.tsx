import { FC } from "react";
import './messageIcon.scss';

const MessageIcon: FC = () => {
    return(
        <svg className="message-icon" viewBox="0 0 30 50" xmlns="http://www.w3.org/2000/svg">
            <path className="messge-icon-lower-part" d="M24.5 20.8427V31C24.5 31.2761 24.2761 31.5 24 31.5H6C5.72386 31.5 5.5 31.2761 5.5 31V20.8427C5.5 20.446 5.93987 20.2073 6.27249 20.4235L14.1825 25.565C14.6796 25.8881 15.3204 25.8881 15.8175 25.565L23.7275 20.4235C24.0601 20.2073 24.5 20.446 24.5 20.8427Z" stroke="#D9D9D9"/>
            <path className="messge-icon-upper-part" d="M5 19H25V21L24 20H6L5 21V19Z" fill="#D9D9D9"/>
        </svg>
    );
}

export default MessageIcon;