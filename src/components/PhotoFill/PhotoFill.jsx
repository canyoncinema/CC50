import React, { Component } from 'react';
import './PhotoFill.css';

const fallbackImgSrc = require('../Carousel/empty-still.png');

export const EMPTY_STILL_PATH = '../images/empty-still.png';
const LOADING_STILL_PATH = '../images/loading-still.png';

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
				backgroundImage: src && src !== EMPTY_STILL_PATH ? `url(${src}), url(${LOADING_STILL_PATH})` : `url(${EMPTY_STILL_PATH})`,
				width: !isNaN(width) ? width + 'px' : width ? width : '100%',
				height: !isNaN(height) ? height + 'px' : height ? height : '100%'
			}}>
				{children}
			</div>
		);
	}
}

export default PhotoFill;