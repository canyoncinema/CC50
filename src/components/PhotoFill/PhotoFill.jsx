import React from 'react';
import './PhotoFill.css';

const fallbackImgSrc = require('../Carousel/empty-still.png');

const PhotoFill = ({src, className, width, children, height}) => {
	return (
		<div className={[
				className,
				'PhotoFill'
			].join(' ')}
			style={{
			backgroundImage: `url(${src}), url(/images/empty-still.png)`,
			width: width || '100%',
			height: height || '100%'
		}}>
			{children}
		</div>
	)
};

export default PhotoFill;