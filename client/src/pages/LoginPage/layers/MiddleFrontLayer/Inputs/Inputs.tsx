import { FC, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteButton from './RouteButton/RouteButton';
import { Modules } from '../../../../..';
import './inputs.scss';

type IRouteButton = {
    class: string, title: string
}
interface IInputs {
    types: string[], title: string, routeButton: IRouteButton 
}

const Inputs: FC<IInputs> =  ({ types, title, routeButton }) => {
    const [message, setMessage] = useState('Login is already in use');
    const [show, setShow] = useState(false);
    const [cover, setCover] = useState('');
    const userModule = useContext(Modules).userModule;
    const navigate = useNavigate();

    function send(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.keyCode === 13) {
            return( 
                types.length === 2 ? document.querySelector<HTMLButtonElement>('.login-button-login-page')?.click() : 
                types.length === 3 ? document.querySelector<HTMLButtonElement>('.login-button-registration-page')?.click() : null
            );
        }
    }

    async function signIn() {
        const loginInput = document.querySelector<HTMLInputElement>('.login-input-login-page');
        const passwordInput = document.querySelector<HTMLInputElement>('.password-input-login-page');
        if(loginInput && passwordInput) {
            const isLogin = await userModule.login(loginInput, passwordInput);
            if(isLogin) {
                succsessInput('login-input-cover', [loginInput, passwordInput]);
                const tl2 = setTimeout(() => {
                    setCover('');
                    navigate(userModule.routes.content.path);
                    clearTimeout(tl2);
                }, 1100);
            } else {
                showErrorMessage(loginInput, passwordInput);
            }
        }
    }

    async function signUp() {
        const nameInput = document.querySelector<HTMLInputElement>('.name-input-registration-page');
        const loginInput = document.querySelector<HTMLInputElement>('.login-input-registration-page');
        const passwordInput = document.querySelector<HTMLInputElement>('.password-input-registration-page');
        if(nameInput && loginInput && passwordInput) {
            const isRegistration = await userModule.registration(nameInput, loginInput, passwordInput);
            if(isRegistration) {
                return succsessInput('registration-input-cover', [nameInput, loginInput, passwordInput], true);
            }
            return showErrorMessage(loginInput);
        }
    }

    function succsessInput(type: string, inputs: HTMLInputElement[], registration: boolean = false) {
        setCover(type);
        const tl = setTimeout(() => {
            inputs.forEach(input => input.value = '');
            if(registration) {
                setCover('');
                document.querySelector<HTMLButtonElement>('.route-to-sign-in')?.click();
            }
            clearTimeout(tl);
        }, 500);
    }

    function showErrorMessage(loginInput: HTMLInputElement, passwordInput?: HTMLInputElement) {
        passwordInput ? setMessage('Invalid login or password') : setMessage('Login is already in use');
        setShow(true);
        const tl1 = setTimeout(() => {
            loginInput.value = '';
            loginInput.focus();
            if(passwordInput) {
                passwordInput.value = '';
            }
            clearTimeout(tl1);
        }, 300);
        const tl2 = setTimeout(() => {
            setShow(false);
            clearTimeout(tl2);
        }, 1700);
    }

    return(
        <div className='info-submit-block'>
            <div className={`info-message ${show ? 'show-info-message' : ''}`}>{message}</div>
            <div className='inputs-form'>
                { types.map(type => {
                    return (
                        <div key={type} className={`input-wrapper ${type}-input-wrapper-${types.length === 2 ? 'login-page' : 'registration-page'}`}>
                            <div className={`input-cover ${cover}`}/>
                            <input
                                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {send(e)}}
                                className={`user-input ${type}-input-${types.length === 2 ? 'login-page' : 'registration-page'}`} 
                                key={type} 
                                name={type}
                                type={type}
                                placeholder={type}
                            />
                        </div>
                    );
                })}
            </div>
            <div className='login-buttons-block'>
                <button
                    className={`login-button ${types.length === 2 ? 'login-button-login-page' : 'login-button-registration-page'}`}
                    onClick={ types.length === 2 ? signIn : signUp }
                >
                    <span className='login-button-title'>{title}</span>
                    <div className='login-button-border border-top'/>
                    <div className='login-button-border border-bottom'/>
                    <div className='login-button-border border-left'/>
                    <div className='login-button-border border-right'/>
                    <div className='login-button-back'/>
                </button>
                <RouteButton 
                    buttonClass={routeButton.class} 
                    title={routeButton.title}
                />
            </div>

        </div>
    );
}

export default Inputs;