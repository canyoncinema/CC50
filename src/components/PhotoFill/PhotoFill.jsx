import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PhotoFill.css';

const fallbackImgSrc = require('../Carousel/moire-360-270.png');

// export const EMPTY_STILL_PATH = '/images/empty-still.png';
export const EMPTY_STILL_PATH = '/images/moire-360-270.png';
const LOADING_STILL_PATH = '/images/loading-still.png';

class PhotoFill extends Component {
	render() {
		// TODO handle 403s, loading errors
		const {src,
			onClick, onMouseEnter, onMouseLeave,
			className, width, children, height,
			caption, captionLink, fadedCaption,
			backgroundSize} = this.props;
		return (
			<div className={[
					className,
					'PhotoFill'
				].join(' ')}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				style={{
				backgroundImage: src && src !== EMPTY_STILL_PATH ? `url(${src}), url(${LOADING_STILL_PATH})` : `url(${EMPTY_STILL_PATH})`,
				width: !isNaN(width) ? width + 'px' : width ? width : '100%',
				height: !isNaN(height) ? height + 'px' : height ? height : '100%',
				backgroundSize: backgroundSize || 'contain'
			}}>
				{children}
				{
					caption ?
					<div className={fadedCaption ? 'faded caption' : 'caption'}>
						Film: <Link to={captionLink}>
							<em>{caption}</em>
						</Link>
					</div>
					: null
				}
			</div>
		);
	}
}

export default PhotoFill;