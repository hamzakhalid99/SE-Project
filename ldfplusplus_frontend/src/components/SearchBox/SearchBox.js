import React from 'react';
import './SearchBox.css';
const SearchBox = ({search, onSearchChange}) => {
		return (
			<div className="post-container">
                <div>
                    <input className="posttitle" placeholder="search" type="search" onChange={onSearchChange}/>
                    <input className="post-green-button-discussion" value="Search" type="submit" />
                </div>  
            </div>
		)
}
export default SearchBox;