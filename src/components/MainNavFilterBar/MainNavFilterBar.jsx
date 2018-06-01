import React from 'react';
import './MainNavFilterBar.css';

import Search from '../Search/Search';
import ViewModeButtons from '../ViewModeButtons/ViewModeButtons';

export default ({ style }) => {
	return (
		<div className="MainNavFilterBar" style={style}>
			<Search id={1} />
			<div className="view-bar">
				View:
			</div>
			<ViewModeButtons />
		</div>
	);
}