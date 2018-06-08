import React from 'react';
import './MenuItem.css';

export default ({children, active, onClick}) => {
	return (
		<li className={active ? 'MenuItem active' : 'MenuItem'}
			onClick={onClick}>
			<span className="text">{children}</span>
		</li>
	);
};
