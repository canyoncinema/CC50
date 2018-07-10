import React from 'react';
import CaretLeft from './caret-left.svg';
import CaretRight from './caret-right.svg';
import CaretDown from './caret-down.svg';
import CaretDownDark from './caret-down-dark.svg';
import './Caret.css';

export default ({ className, isDisabled, onClick, theme, direction, width, height }) => {
	return (
		<span className={['Caret', className, direction].join(' ')}
			onClick={onClick}
			disabled={isDisabled}>
			<img src={direction === 'left' ?
			CaretLeft :
			direction === 'right' ? 
			CaretRight :
			direction === 'down' && theme === 'dark' ?
			CaretDownDark :
			direction === 'down' || direction === 'up' ?
			CaretDown :
			null
			}
			style={{
				height,
				width
			}}
			alt={direction} />
		</span>
	);
};
