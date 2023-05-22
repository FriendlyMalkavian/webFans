import { FC } from "react";
import './settingName.scss';

interface ISettingName {
    settingType: number;
}

const SettingName: FC<ISettingName> = ({ settingType }) => {
    const settingName: string = (
        settingType === 1 ? 'Profile' : 
        settingType === 2 ? 'Location' : ''
    );
    const settingDescription: string = (
        settingType === 1 ? 'Fill basic information about you' : 
        settingType === 2 ? 'Fill basic information about your location(it might not be a truth)' : ''
    );
    return(
        <div className="setting-name-wrapper">
            <div className="setting-name">
                {settingName}
            </div>
            <div className="setting-name-description">
                {settingDescription}
            </div>
        </div>
    );
}

export default SettingName;