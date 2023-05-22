import { FC } from "react";
import './userInfoInput.scss';

interface IUserInfoInput {
    inputType: number;
        // 1 - name
        // 2 - one line description
}
const UserInfoInput: FC<IUserInfoInput> = ({ inputType }) => {
    const className = (
        inputType === 1 ? '-name' : 
        inputType === 2 ? '-line-description' : ''
    );
    return(
        <div 
            className={`user-info-input-wrapper-settings profile${className}-setting-input-wrapper`}
        >
            <input
                className={`user-info-input-settings profile${className}-setting-input-wrapper`}
                type={'text'}
            />
        </div>
    );
}

export default UserInfoInput;