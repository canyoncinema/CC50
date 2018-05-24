import React from 'react';
import './DarkBox.css';

export default ({header, description}) => (
	<div className="DarkBox on-hover h-100">
	  <h3 className="hover-effect">{header}</h3>
	  <p>
	    {description}
	  </p>
	</div>
);