import React from 'react';
import './Hero.css';

export default ({active, children}) => {
	return (
		<div className={active ? 'Hero' : ''}>
			{children}
		</div>
	);
};