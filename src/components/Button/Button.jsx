import React from 'react';
import './Button.css';


export default ({onClick, size, className, children}) => {
	return (
		<div
			onClick={onClick}
			className={[
				'Button',
				size,
				className
			].join(' ')}
		>
			{children}
		</div>
	);
};