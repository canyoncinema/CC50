import React from 'react';
import './SearchBar.css';

import SearchIcon from './SearchIcon.svg';

export default () => {
	return (
		<div className="SearchBar">
			<img className="icon" src={SearchIcon} />
			<form onSubmit={() => null}>
				<input
					type="text"
					className="input"
					placeholder="Search films, filmmakers, curated programs, and ephemera" />
			</form>
		</div>
	);
}