import React from 'react';
import './Caret.css';

export default ({ direction }) => {
	return (
		<span className={'Caret ' + direction}>></span>
	);
};
