import React from 'react';
import './Tag.css';

const Tag = ({children, disabled, onClick}) =>
	<div disabled={disabled}
		className="Tag"
		onClick={onClick}>
		{children}
	</div>;

export default Tag;
