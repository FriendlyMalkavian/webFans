import { FC } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './middleLayer.scss';

const MiddleLayer: FC = () => {
    return(
        <div
            className="slider-layer layer-middle"
            data-swiper-parallax={'24%'}
        >
            <Footer/>
            <Header/>
        </div>
    );
}

export default MiddleLayer