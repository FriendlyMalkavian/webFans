import { FC } from 'react';
import './searchIcon.scss';

const SearchIcon: FC = () => {
    return(
        <svg className='search-icon' viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
            <circle className='magnifier' cx="4" cy="4" r="3.75"/>
            <line className='magnifier' x1="6.17678" y1="6.82322" x2="10.1768" y2="10.8232"/>
        </svg>
    );
}

export default SearchIcon;