import { FC } from 'react';
import CONFIG from '../../../../config';
import './coverSkeleton.scss';

const CoverSkeleton: FC = () => {
    const config = new CONFIG;
    return(
        <img className='cover-skeleton-image' src={`${config.SERVER_PATH}/assets/usersCover/skeletCover.webp`} alt="default image"/>  
    );
}

export default CoverSkeleton;