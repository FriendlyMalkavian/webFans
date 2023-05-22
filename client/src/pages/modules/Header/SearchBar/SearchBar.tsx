import { FC } from "react";
import SearchIcon from "./SearchIcon/SearchIcon";
import './searchBar.scss';

const SearchBar: FC = () => {
    return(
        <form 
            className="input-serach-wrapper"
        >
            <SearchIcon/>
            <input className='serach-content-input'/>
        </form>
    );
}

export default SearchBar;