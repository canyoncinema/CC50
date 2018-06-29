import React from 'react';
import './PhotoFill.css';

const PhotoFill = ({src, className, width, children, height}) => {
	return (
		<div className={[
				className,
				'PhotoFill'
			].join(' ')}
			style={{
			backgroundImage: `url(${src})`,
			width: width,
			height: height
		}}>
			{children}
		</div>
	)
};

export default PhotoFill;