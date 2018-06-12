import React from 'react';
import { Link } from 'react-router-dom';
import './BrowseLink.css';

export default ({text, search}) => {
	const hrefVal = search ? `/collection/${search}` : '/collection';
	return (
		<div className="BrowseLink">
			<Link className="white" to={hrefVal}>
					{text}<span className="arrow">></span>
		  </Link>
	  </div>
	);
};