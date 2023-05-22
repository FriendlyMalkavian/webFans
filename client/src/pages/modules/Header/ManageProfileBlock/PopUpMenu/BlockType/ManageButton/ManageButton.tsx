import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modules } from '../../../../../../../index';
import GearIcon from './GearIcon/GearIcon';
import LogoutIcon from './LogoutIcon/LogoutIcon';
import './manageButton.scss'; 
interface IManageButton {
    type: string;
}

const ManageButton: FC<IManageButton> = ({ type }) => {
    const navigate = useNavigate();
    const userModule = useContext(Modules).userModule;
    const routes = userModule.routes;

    function label() {
        switch(type) {
            case 'logout' :
                return 'Sign Out';
            case 'settings' :
                return 'Settings';
            default : return null;
        }
    }

    function onClickRoute() {
        switch(type) {
            case 'logout' :
                return logout();
            case 'settings' :
                return routeToSettingsPage();
            default : return null;
        }
    }

    function logout() {
        showShadowBlock();
        setTimeout(async () => {
            await userModule.logout();
            return navigate(routes.login.path);
        }, 500);
    }

    function routeToSettingsPage() {
        const tl = setTimeout(() => {
            navigate(routes.settingsProfile.path);
            clearTimeout(tl);
        }, 500);
    }

    function showShadowBlock() {
        return userModule.mediator.call(userModule.EVENTS.SHOW_SHADOW_BLOCK, '');
    }

    return(
        <button
            className={`manage-button ${type}-manage-button`}
            onClick={onClickRoute}
        >
            {
                type === 'settings' ? 
                    <GearIcon/> : 
                type === 'logout' ? 
                    <LogoutIcon/> : 
                ''
            }
            { label() }
        </button>
    );
}

export default ManageButton;