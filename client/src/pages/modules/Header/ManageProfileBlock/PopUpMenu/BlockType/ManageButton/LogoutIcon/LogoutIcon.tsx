import { FC } from 'react';

const LogoutIcon: FC = () => {
    return(
        <svg className='menu-logout-icon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='logout-door' d="M0 0H10V1H1V15H10V16H0V0Z" fill="#D9D9D9"/>
            <path className='logout-arrow' d="M3 7.375H12.4545L11.2727 5.5L16 8L11.2727 10.5L12.4545 8.625H3V7.375Z" fill="#D9D9D9"/>
        </svg>
    );
}

export default LogoutIcon;