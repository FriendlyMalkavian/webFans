import { FC } from 'react';
import ThemeChangerButton from '../../../../modules/ThemeChangeButton/ThemeChangeButton';
import Inputs from '../Inputs/Inputs';

import './signUpBlock.scss';

const SignUpBlock: FC = () => {
    const types = ['name', 'login', 'password'];

    return(
        <div className="sign-up-block">
            <span className='login-title'>SIGN UP</span>
            <ThemeChangerButton/>
            <Inputs types={types} title={'sign up'} routeButton={{class: 'route-to-sign-in', title: 'Sign In'}}/>
        </div>
    );
}

export default SignUpBlock;