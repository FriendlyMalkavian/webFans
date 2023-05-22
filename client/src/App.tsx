import { useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Modules } from '.';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MainPage from './pages/MainPage/MainPage';
import MessangerPage from './pages/MessangerPage/MessangerPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ProfileSettingsWrapper from './pages/SettingsPage/SettingsBlock/ProfileSettingsWrapper';
import ROUTES from './pages/routes/routes';

import './app.scss';

export default function App() {
    const routes = ROUTES;
    const userModule = useContext(Modules).userModule;

    useEffect(() => {
        (async () => {
            if(!await userModule.autoLogin()) {
                localStorage.removeItem('guid');
                localStorage.removeItem('token');
            }
        })();
    });
    
    return (
        <div className="app">
            <Routes>
                <Route 
                    path={routes.main.path}
                    element={<MainPage/>}
                />
                <Route 
                    path={routes.login.path}
                    element={<LoginPage/>}
                />
                <Route 
                    path={routes.content.path}
                    element={<MainPage/>}
                />
                <Route 
                    path={routes.messanger.path}
                    element={<MessangerPage/>}
                />
                <Route 
                    path={'/settings'}
                    element={<SettingsPage/>}
                >
                    <Route 
                        path={'profile'}
                        element={<ProfileSettingsWrapper settingType={1}/>}
                    />
                    <Route 
                        path={'location'}
                        element={<ProfileSettingsWrapper settingType={2}/>}
                    />
                </Route>
                <Route 
                    path={routes.notFound.path}
                    element={<NotFoundPage/>}
                />
            </Routes>
        </div>
    );
}