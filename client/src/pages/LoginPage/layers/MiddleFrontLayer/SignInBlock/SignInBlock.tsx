import { FC } from 'react';
import ThemeChangerButton from '../../../../modules/ThemeChangeButton/ThemeChangeButton';
import Inputs from '../Inputs/Inputs';

import './signInBlock.scss';

const SignInBlock: FC = () => {
    const types = ['login', 'password'];

    return(
        <div className='sign-in-block'>
            <span className='login-title'>SIGN IN</span>
            <ThemeChangerButton/>
            <Inputs types={types} title={'sign in'} routeButton={{class: 'route-to-sign-up', title: 'Sign Up'}}/>
        </div>
    );
}

export default SignInBlock;