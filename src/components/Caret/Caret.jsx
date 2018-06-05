import React from 'react';
import CaretLeft from './caret-left.svg';
import CaretRight from './caret-right.svg';
import CaretDown from './caret-down.svg';
import './Caret.css';

export default ({ className, onClick, direction, width, height }) => {
	return (
		<span className={['Caret', className, direction].join(' ')}
			onClick={onClick}>
			<img src={direction === 'left' ?
			CaretLeft :
			direction === 'right' ? 
			CaretRight :
			direction === 'down' ?
			CaretDown :
			null
			} alt={direction} />
		</span>
	);
};
