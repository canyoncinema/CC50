import React, { Component } from 'react';
import './Button.css';


export default ({onClick, size, className, children}) => {
	return (
		<div
			onClick={onClick}
			className={size ?
				'Button ' + size
				: className ?
				'Button ' + className :
				'Button'
			}>
			{children}
		</div>
	);
};