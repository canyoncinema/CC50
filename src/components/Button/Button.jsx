import React, { Component } from 'react';
import './Button.css';


export default ({onClick, size, className, children}) => {
	return (
		<div className={`Button${size ? ' ' + size : ''}${className ? ' ' + className : ''}`}>
			{children}
		</div>
	);
};