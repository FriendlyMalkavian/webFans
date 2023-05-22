import { FC } from "react";
import BlockType from "./BlockType/BlockType";
import UserMiniView from "./UserMiniView/UserMiniView";
import './popUpMenu.scss';

interface IPopUpMenu {
    isOpen: boolean;
}

const PopUpMenu: FC<IPopUpMenu> = ({isOpen}) => {
    const settingsType = ['settings', 'logout'];
    return(
        <div className={`pop-up-menu ${isOpen ? 'pop-up-show' : 'pop-up-hide'}`}>
            <UserMiniView/>
            <BlockType blockType="settings" buttonsType={settingsType}/>
        </div>
    );
}

export default PopUpMenu;