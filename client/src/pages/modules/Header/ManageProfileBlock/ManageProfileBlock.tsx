import { FC, useRef, useState, useEffect } from 'react';
import OpenManageBlockArrow from './OpenManageBlockArrow/OpenManageBlockArrow';
import UserImage from './UserImage/UserImage';
import PopUpMenu from './PopUpMenu/PopUpMenu';
import './manageProfileBlock.scss';

const ManageProfileBlock: FC = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const arrowButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        document.addEventListener('click', onDocumentClickHandler);
        return function() {
            document.removeEventListener('click', onDocumentClickHandler);
        }
    });

    function onDocumentClickHandler(e: any) {
        const clickTarget = e.target;
        const isButtonClick = arrowButton.current?.contains(clickTarget);
        const isPopUpMenuClick = checkClickTarget(clickTarget);

        if(isButtonClick) {
            isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);;
            return;
        }

        if(!isPopUpMenuClick && !isButtonClick) {
            setIsOpenMenu(false);
            return;
        }
        return;
    }

    function checkClickTarget(clickTarget:HTMLElement) {
        const popUpMenu = document.querySelector('.pop-up-menu');
        if(popUpMenu?.contains(clickTarget)) {
            return true;
        }
        return false;
    }


    return(
        <div
            className='manage-profile-block'
        >   
            <UserImage/>
            <button
                className={`manage-arrow-button ${ isOpenMenu ? 'opened-pop-up-menu' : '' }`}
                ref={arrowButton}
            >
                <OpenManageBlockArrow/>
            </button>
            <PopUpMenu isOpen={isOpenMenu}/>
        </div>
    );
}

export default ManageProfileBlock;