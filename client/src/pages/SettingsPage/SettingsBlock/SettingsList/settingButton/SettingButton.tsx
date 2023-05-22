import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../routes/routes';
import './settingButton.scss';

interface ISettingButton {
    buttonType: number;
        // 1 - general progile settings
        // 2 - loaction setting
}

const SettingButton: FC<ISettingButton> = ({ buttonType }) => {
    const navigate = useNavigate();
    const routes = ROUTES;
    const buttonClassName = (
        buttonType === 1 ? 'general-setting-button' : 
        buttonType === 2 ? 'location-setting-button' : ''
    );
    const coverClassName = (
        buttonType === 1 ? 'general-setting-button-cover' : 
        buttonType === 2 ? 'location-setting-button-cover' : ''
    );
    const ButtonTitle = (
        buttonType === 1 ? 'Profile' : 
        buttonType === 2 ? 'Location' : ''
    );
    
    function routeToOtherSettingType() {
        switch(buttonType) {
            case 1:
                return navigate(routes.settingsProfile.path);
            case 2: 
                return navigate(routes.settingsLocation.path);
            default: return;
        }
    }

    return(
        <div 
            className={`setting-button-wrapper ${coverClassName}`}
        >
            <div className={`setting-button-cover`}></div>
            <button
                className={`setting-button ${buttonClassName}`}
                onClick={routeToOtherSettingType}
            >
                {ButtonTitle}
            </button>
        </div>
    );
}

export default SettingButton;