import { FC } from "react";
import LocationValues from "./locationValues/LocationValues";
import ProfileValues from "./profileValues/ProfileValues";
import './settingsValues.scss';

interface ISettingsValues {
    settingType: number;
        // 1 - general profile
        // 2 - location
}

const SettingsValues: FC<ISettingsValues> = ({ settingType }) => {
    return(
        <div className="setting-values">
            {
                settingType === 1 ? <ProfileValues/> : 
                settingType === 2 ? <LocationValues/> : ''
            }
        </div>
    );
}

export default SettingsValues;