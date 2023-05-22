import { FC } from 'react';
import DragAndDropInput from './dragAndDropInput/DragAndDropInput';
import './profileValues.scss';

const ProfileValues: FC = () => {
    return(
        <div className="setting-value-type profile-settings-type-values">
            <DragAndDropInput inputType={1}/>
            <DragAndDropInput inputType={2}/>
        </div>
    );
}

export default ProfileValues;