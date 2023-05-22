import { FC } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ManageProfileBlock from './ManageProfileBlock/ManageProfileBlock';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import LoginButton from './LoginButton/LoginButton';
import MessageButton from './MessageButton/MessageButton';
import './header.scss';

const Header: FC = () => {
    const token = localStorage.getItem('token')

    return(
        <div className='main-page-header'>
            <HeaderLogo/>
            <SearchBar/>
            { !token ? <LoginButton/> : null }
            { token ? <MessageButton/> : null }
            { token ? <ManageProfileBlock/> : null }
        </div>
    );
}

export default Header;