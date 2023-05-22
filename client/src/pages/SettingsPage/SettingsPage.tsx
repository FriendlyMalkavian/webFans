import { Outlet } from 'react-router-dom'; 
import { FC } from 'react';
import Header from '../modules/Header/Header';
import ShadowBlock from '../modules/ShadowBlock/ShadowBlock';
import './settingsPage.scss';

const SettingsPage: FC = () => {
    return(
        <div className="settings-page">
            <ShadowBlock/>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default SettingsPage;