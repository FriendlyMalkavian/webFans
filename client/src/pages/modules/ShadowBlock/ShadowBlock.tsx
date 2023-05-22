import { FC, useState, useContext, useEffect } from "react";
import { Modules } from "../../..";
import './shadowBlock.scss';

const ShadowBlock: FC = () => {
    const [activeShadow, setActiveShadow] = useState(false);
    const userModule = useContext(Modules).userModule;
    
    useEffect(() => {
        userModule.mediator.subscribe(userModule.EVENTS.SHOW_SHADOW_BLOCK, showShadowBlock);
    }, []);

    function showShadowBlock() {
        setActiveShadow(true);
        const tl = setTimeout(() => {
            setActiveShadow(false);
            clearTimeout(tl);
        }, 500);
    }

    return ( 
        <div className={`shadow-block ${activeShadow ? 'shadow-active' : ''}`}/> 
    );
}

export default ShadowBlock;