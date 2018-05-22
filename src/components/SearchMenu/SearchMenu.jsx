import React from 'react';
import './SearchMenu.css';

import Caret from '../Caret/Caret';

export default () => {
	return (
		<span className="SearchMenu">
			<span className="text">All</span><Caret />
		</span>
	);
};
