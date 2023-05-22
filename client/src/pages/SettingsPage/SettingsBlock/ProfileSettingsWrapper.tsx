import { FC, useState, useContext } from 'react';
import { Modules } from '../../..';
import { imgPath } from '../../../services/modules/FileModule/FileModule';
import ProfileImage from './ProfileImage/ProfileImage';
import SettingName from './SettingName/SettingName';
import SettingsList from './SettingsList/SettingsList';
import SettingsValues from './SettingValues/SettingsValues';
import CoverSkeleton from '../../modules/imagesSkeleton/CoverSkeleton/CoverSkeleton';
import './profileSettingsWrapper.scss';

interface IProfileSettingsWrapper {
    settingType: number;
        // 1 - profile general
        // 2 - location
}

const ProfileSettingsWrapper: FC<IProfileSettingsWrapper> = ({ settingType }) => {
    const [path, setPath] = useState<imgPath>(null);
    const userModule = useContext(Modules).userModule;
    userModule.mediator.subscribe(userModule.EVENTS.ON_USER_DATA_UPDATE, setPath);

    function onError() { return setPath(null); }

    return(
        <div className="profile-settings-wrapper">
            <div className="settings-img-wrapper">
                {
                    path ? 
                        <img 
                            className='profile-settings-background-image-cover'
                            src={path.cover}
                            alt="Cover image on settings page"
                            onError={onError}
                        /> :
                    <CoverSkeleton/>
                }
                {
                    path ? 
                        <img 
                            className='profile-settings-background-image-cover-blur-version'
                            src={path.cover}
                            alt="blured cover image on settings page"
                        /> : 
                    <CoverSkeleton/>
                }
            </div>
            <ProfileImage/>
            <SettingName settingType={settingType}/>
            <SettingsList/>
            <SettingsValues settingType={settingType}/>
        </div>
    );
}

export default ProfileSettingsWrapper;