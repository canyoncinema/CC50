import React, { Component } from 'react';
import './BrowseLink.css';

export default ({text, search}) => {
	const hrefVal = search ? `/collection?s=${search}` : '/collection';
	return (
		<a href={hrefVal}>
			<div className="BrowseLink">
				{text}<span className="arrow">></span>
	    </div>
	   </a>
	);
};