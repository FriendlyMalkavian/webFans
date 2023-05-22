import { FC, useState, useContext, useEffect } from "react";
import { Modules } from "../../../..";
import { imgPath } from "../../../../services/modules/FileModule/FileModule";
import AvatarSkeleton from "../../../modules/imagesSkeleton/AvatarSkeleton/AvatarSkeleton";
import './profileImage.scss';

const ProfileImage: FC = () => {
    const [path, setPath] = useState<imgPath>(null);
    const userModule = useContext(Modules).userModule;

    useEffect(() => {
        userModule.mediator.subscribe(userModule.EVENTS.ON_USER_DATA_UPDATE, setPath);
    }, []);

    function onError() { return setPath(null); }

    return(
        <div className="profile-image">
            <div className="settings-profile-image-wrapper">
                {
                    path ? 
                        <img 
                            className="user-options-mini-avatar-image" 
                            src={path.avatar}
                            alt="Profile image on settings page"
                            onError={onError}
                        /> :
                    <AvatarSkeleton/>
                }
            </div>
            <div className="settings-profile-name">SETTINGS</div>
            <div className="settings-user-name">{userModule.user.name}</div>
        </div>
    );
}

export default ProfileImage;