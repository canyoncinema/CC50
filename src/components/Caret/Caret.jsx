import React from 'react';
import './Caret.css';
import CaretSvg from './Caret.svg';

export default ({ className, onClick, direction, width, height }) => {
	return (
		<span className={['Caret', className, direction].join(' ')}
			onClick={onClick}>
			<svg width={width || '8px'} height={ height || '14px'} viewBox="0 0 15 28" version="1.1">
		    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.8">
	        <g fill="#FFFFFF" fillRule="nonzero">
            <polygon id="Shape" points="0.175 2.85833333 3.44166667 0.145833333 14.9916667 14 3.44166667 27.8541667 0.175 25.1416667 9.47916667 14"></polygon>
	        </g>
		    </g>
			</svg>
		</span>
	);
};
