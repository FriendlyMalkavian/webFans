import { FC } from 'react';
import CONFIG from '../../../../config';
import './avatarSkeleton.scss';

const AvatarSkeleton: FC = () => {
    const config = new CONFIG;
    return(
        <img className='avatar-skeleton-image' src={`${config.SERVER_PATH}/assets/usersAvatar/skeletAvatar.webp`} alt="default image"/>  
    );
}

export default AvatarSkeleton;