import React from 'react';
import './SearchBar.css';

import SearchIcon from './SearchIcon.svg';

export default ({ placeholder, className }) => {
	return (
		<div className={className ? className + ' SearchBar' : 'SearchBar'}>
			<form onSubmit={() => null}>
				<img className="icon" src={SearchIcon} />
				<input
					type="text"
					className="input"
					placeholder={placeholder} />
			</form>
		</div>
	);
}