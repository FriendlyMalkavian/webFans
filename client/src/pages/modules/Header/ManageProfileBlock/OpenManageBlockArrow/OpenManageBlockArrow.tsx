import { FC } from "react";
import './openManageBlockArrow.scss';

const OpenManageBlockArrow: FC = () => {
    return(
        <svg className="open-manage-block-arrow" viewBox="0 0 25 50" xmlns="http://www.w3.org/2000/svg">
            <path className="manage-block-arrow-elem" d="M1 20L12.5 25.5L24 20L12.5 29L1 20Z" fill="#D9D9D9"/>
            <path className="manage-block-arrow-elem" d="M6.47619 23.75V20.75L7.57143 24.5L8.5 28.4375L6.47619 23.75Z" fill="#D9D9D9"/>
            <path className="manage-block-arrow-elem" d="M18.5238 23.75V20.75L17.4286 24.5L16.5 28.4375L18.5238 23.75Z" fill="#D9D9D9"/>
        </svg>
    );
}

export default OpenManageBlockArrow;