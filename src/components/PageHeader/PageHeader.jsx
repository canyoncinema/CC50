import React from 'react';
import './PageHeader.css';

const PageHeader = ({ headline }) => {
	return (
		<div className="PageHeader">
			<h1>{headline}</h1>
		</div>
	);
};

export default PageHeader;