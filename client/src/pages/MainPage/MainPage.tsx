import { FC } from 'react';
import ContentWrapper from './ContentWrapper/ContentWrapper';
import Header from '../modules/Header/Header';
import ShadowBlock from '../modules/ShadowBlock/ShadowBlock';

import './mainPage.scss';

const MainPage: FC = () => {
    return(
        <div className="main-page">
            <Header/>
            <ContentWrapper/>
            <ShadowBlock/>
        </div>
    );
}

export default MainPage;