import React, { Component } from 'react';
import PhotoFill from '../PhotoFill/PhotoFill';

export default ({ url }) => {
	return (
		<PhotoFill
			width="50px"
			height="50px"
			src={url || require('./empty-filmmaker_115x115.png')} />
	);
}