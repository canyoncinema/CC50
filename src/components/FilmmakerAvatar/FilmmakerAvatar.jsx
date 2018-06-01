import React from 'react';
import PhotoFill from '../PhotoFill/PhotoFill';

export default ({ url }) => {
	// TODO: optimize empty still res size
	return (
		<PhotoFill
			width="50px"
			height="50px"
			src={url || require('./empty-filmmaker_115x115.png')} />
	);
}