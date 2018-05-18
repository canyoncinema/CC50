import React from 'react';
import './PhotoFill.css';

const PhotoFill = ({src, width, height}) => {
	return (
		<div className="PhotoFill" style={{
			backgroundImage: `url(${src})`,
			width,
			height
		}}></div>
	)
};

export default PhotoFill;