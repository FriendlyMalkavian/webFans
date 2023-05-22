import { FC, useContext, useEffect, useState } from "react";
import { Modules } from "../../../../../..";
import { imgPath } from "../../../../../../services/modules/FileModule/FileModule";
import ThemeChangerButton from "../../../../ThemeChangeButton/ThemeChangeButton";
import CoverSkeleton from "../../../../imagesSkeleton/CoverSkeleton/CoverSkeleton";
import './userMiniView.scss';

const UserMiniView: FC = () => {
    const [path, setPath] = useState<imgPath>(null);
    const userModule = useContext(Modules).userModule;
    
    useEffect(() => {
        userModule.mediator.subscribe(userModule.EVENTS.ON_USER_DATA_UPDATE, setPath);
    }, []);

    function onError() { return setPath(null); }

    return(
        <div className="user-mini-view">
            <div className="mini-view-pop-up-menu-image-wrapper">
                <div className="mini-view-pop-up-menu-cover-color"/>
                { 
                    path ? 
                        <img 
                            className="mini-view-pop-up-menu-cover" 
                            src={path.cover}
                            alt="Mini view pop-up menu cover"
                            onError={onError}
                        /> :
                    <CoverSkeleton/>
                }
            </div>
            <div className="change-theme-button-main-page">
                <ThemeChangerButton/>
            </div>
        </div>
    );
}

export default UserMiniView;