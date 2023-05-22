import { FC } from 'react';
import SignInBlock from './SignInBlock/SignInBlock';
import SignUpBlock from './SignUpBlock/SignUpBlock';
import './middleFrontLayer.scss';

interface IMiddleFrontLayer {
    slideNumber: number;
}

const MiddleFrontLayer: FC<IMiddleFrontLayer> = ({ slideNumber }) => {
    return(
        <div 
            data-swiper-parallax={'8%'} 
            className="layer-middle-front slider-layer" 
        >
            {slideNumber ? <SignUpBlock/> : <SignInBlock/>}
            <div className={`particle right-top-praticle`}></div>
            <div className={`particle right-bottom-praticle`}></div>
            <div className={`particle left-top-praticle`}></div>
            <div className={`particle left-bottom-praticle`}></div>
        </div>
    );
}

export default MiddleFrontLayer;