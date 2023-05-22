import { FC } from 'react';
import StarrySky from './StarrySky/StarrySky';
import './backLayer.scss';

const LayerBack: FC = () => {
    return(
        <div
            className={'layer-back'}
            data-swiper-parallax={'34%'}
        >
            <StarrySky/>
        </div>
    );
}

export default LayerBack;