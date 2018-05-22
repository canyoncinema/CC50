import React from 'react';
import './SearchMenuItem.css';

export default ({children, onClick}) => {
	return (
		<li className="SearchMenuItem" onClick={onClick}>
			<span className="text">{children}</span>
		</li>
	);
};
