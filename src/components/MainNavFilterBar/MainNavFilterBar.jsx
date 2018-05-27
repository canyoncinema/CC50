import React from 'react';
import './MainNavFilterBar.css';

import Search from '../Search/Search';
import SearchMenu from '../SearchMenu/SearchMenu';
import SearchBar from '../SearchBar/SearchBar';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';

export default ({ style }) => {
	return (
		<div className="MainNavFilterBar" style={style}>
			<Search />
			<div className="view-bar">
				View:
			</div>
			<ViewModeButtons />
		</div>
	);
}