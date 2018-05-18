import React from 'react';

const getTimeString = dateTime => dateTime
																	.toLocaleTimeString()
																	.replace(/\:(\d+)\s+/, '')
																	.toLowerCase();

export default ({dateTime}) => {
	return (getTimeString(dateTime));
};