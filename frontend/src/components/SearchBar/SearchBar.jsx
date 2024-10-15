//frontend/src/componenets/SearchBar/SearchBar.jsx
import "./SearchBar.css";


import { useState } from "react";

const SearchBar = ({ onSearch, placeholder }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search_div twenty_padding">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder={placeholder || "Search..."}
                className="search_input center "
            />
        </div>
    );
};

export default SearchBar;
