import { FC } from "react";
import SettingButton from "./settingButton/SettingButton";
import './settingsList.scss';

const SettingsList: FC = () => {

    return(
        <div className="settings-list">
            <SettingButton buttonType={1}/>
            <SettingButton buttonType={2}/>
        </div>
    );
}

export default SettingsList;