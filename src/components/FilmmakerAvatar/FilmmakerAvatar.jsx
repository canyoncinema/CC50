import React from 'react';
import PhotoFill from '../PhotoFill/PhotoFill';

export default ({ url, height, width }) => {
	// TODO: optimize empty still res size
	return (
		<PhotoFill
			width={width || '50px'}
			height={height || '50px'}
			src={url || require('./empty-filmmaker_115x115.png')} />
	);
}