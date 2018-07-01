import React, { Component } from 'react';
import './PhotoFill.css';

const fallbackImgSrc = require('../Carousel/empty-still.png');

const EMPTY_STILL_PATH = 'images/empty-still.png';

class PhotoFill extends Component {
	render() {
		// TODO handle 403s, loading errors
		const {src, className, width, children, height} = this.props;
		return (
			<div className={[
					className,
					'PhotoFill'
				].join(' ')}
				style={{
				backgroundImage: src === EMPTY_STILL_PATH ? src : `url(${src}), url(/images/loading-still.png)`,
				width: !isNaN(width) ? width + 'px' : width ? width : '100%',
				height: !isNaN(height) ? height + 'px' : height ? height : '100%'
			}}>
				{children}
			</div>
		);
	}
}

export default PhotoFill;