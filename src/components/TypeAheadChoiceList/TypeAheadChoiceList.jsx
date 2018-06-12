import React from 'react';
import './TypeAheadChoiceList.css';

const TypeAheadChoiceList = ({ isOpen, children, setRef }) => {
	console.log('isOpen', isOpen);
	return (
		<ul
			ref={setRef}
			className={ isOpen ? 'TypeAheadChoiceList active' : 'TypeAheadChoiceList'}>
			{children}
		</ul>
	);
}

export default TypeAheadChoiceList;