import { FC, useContext, useState } from "react";
import { Modules } from "../../../../..";
import { imgPath } from "../../../../../services/modules/FileModule/FileModule";
import AvatarSkeleton from "../../../imagesSkeleton/AvatarSkeleton/AvatarSkeleton";
import './userImage.scss';

const UserImage: FC = () => {
    const [path, setPath] = useState<imgPath>(null);
    const userModule = useContext(Modules).userModule;
    userModule.mediator.subscribe(userModule.EVENTS.ON_USER_DATA_UPDATE, setPath);

    function onError() { return setPath(null); }
    
    return(
        <div className="user-image-mini">
            {
                path ? 
                    <img 
                        className="user-header-mini-avatar-image" 
                        src={path.avatar}
                        alt="header avatar"
                        onError={onError}
                    /> :
                <AvatarSkeleton/>
            }
        </div>
    );
}

export default UserImage;