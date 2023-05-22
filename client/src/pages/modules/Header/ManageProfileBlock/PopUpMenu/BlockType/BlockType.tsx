import { FC } from 'react';
import ManageButton from './ManageButton/ManageButton';
import './blockType.scss';

interface IBlock {
    blockType: string,
    buttonsType: string[]
}

const BlockType: FC<IBlock> = ({ blockType, buttonsType }) => {
    return(
        <div className={`${blockType}-block pop-up-menu-block`}>
            {buttonsType.map(button => {
                return <ManageButton key={button} type={button}/>
            })}
        </div>
    );
}

export default BlockType;