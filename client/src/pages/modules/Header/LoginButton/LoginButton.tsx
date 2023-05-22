import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modules } from "../../../..";
import ROUTES from "../../../routes/routes";
import './loginButton.scss';

const LoginButtons: FC = () => {
    const navigate = useNavigate();
    const userModule = useContext(Modules).userModule;

    function routeToLoginPage() {
        userModule.mediator.call(userModule.EVENTS.SHOW_SHADOW_BLOCK, '');
        setTimeout(() => {
            return navigate(ROUTES.login.path);
        }, 500);
    }
    
    return(
        <div className="suggest-to-login-button-wrapper">
            <div className="route-to-login-particle"/>
            <button 
                className="header-route-to-login-page-button"
                onClick={routeToLoginPage}
            >LOGIN</button>
        </div>
    );
}


export default LoginButtons; 