import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Hero.css';

export default ({active, children}) => {
	return (
		<div className={active ? 'Hero' : ''}>
			{children}
		</div>
	);
};