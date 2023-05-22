import { FC } from 'react';
import './starrySky.scss';

const StarrySky: FC = () => {
    return(
        <div className="starry-sky">
            <span className={'star star-1'}/>
            <span className={'star star-2'}/>
            <span className={'star star-3'}/>
            <span className={'star star-4'}/>
            <span className={'star star-5'}/>
            <span className={'star star-6'}/>
            <span className={'star star-7'}/>
        </div>
    );
}

export default StarrySky;