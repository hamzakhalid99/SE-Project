import React from 'react';
import './SearchBox.css';
const SearchBox = ({search, searchChange}) => {
		return (
			<div className="post-container">
                <div>
                    <input className="posttitle" placeholder="search" type="search" onChange={searchChange}/>
                    <input className="post-green-button-discussion" value="Post" type="submit" />
                </div>  
            </div>
		)
}
export default SearchBox;