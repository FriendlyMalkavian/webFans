import { FC } from "react";
import Header from "../modules/Header/Header";
import ShadowBlock from "../modules/ShadowBlock/ShadowBlock";
import MessangerBlock from "./MessangerBlock/MessangerBlock";
import './messangerPage.scss';

const MessangerPage: FC = () => {

    return(
        <div className="messanger-page">
            <ShadowBlock/>
            <Header/>
            <MessangerBlock/>
        </div>
    );
}

export default MessangerPage;