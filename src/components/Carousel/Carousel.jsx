import React, { Component } from 'react';
import './Carousel.css';

import Caret from '../Caret/Caret';
import PhotoFill from '../PhotoFill/PhotoFill';

class Carousel extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const photos = this.props.photos || [];
		return (
			<div className="Carousel">
			{
				photos && photos.length > 1 ?
				<Caret direction="left" />
				: null
			}
			<PhotoFill width="100%" height="100%"
				src={photos && photos[0] || require('./empty-still.png')} />
			{
				photos && photos.length > 1 ?
				<Caret direction="right" />
				: null
			}
			</div>
		);
	}
}

export default Carousel;