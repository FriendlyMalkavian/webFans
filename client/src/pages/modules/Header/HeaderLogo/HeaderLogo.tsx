import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routes';
import './headerLogo.scss';

const HeaderLogo: FC = () => {
    const navigate = useNavigate();
    function routeToMainPage() { return navigate(ROUTES.content.path); }

    return(
        <div 
            className='header-logo'
            onClick={routeToMainPage}
        >
            Здесь должно быть ваше лого
        </div>
    );
}

export default HeaderLogo;