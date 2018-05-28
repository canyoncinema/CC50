import React, { Component } from 'react';
import './Carousel.css';

import Caret from '../Caret/Caret';
import PhotoFill from '../PhotoFill/PhotoFill';

class Carousel extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		activePhotoIndex: 0
	}

	onPrevPhoto() {
		// on clicking left caret when multiple photos exist
		// (loop) go to last photo if on first photo
		this.setState({
			activePhotoIndex: this.state.activePhotoIndex == 0 ?
				this.props.photos.length - 1
				: this.state.activePhotoIndex - 1
		});
	}

	onNextPhoto() {
		// on clicking left caret when multiple photos exist
		// (loop) go to first photo if on last photo
		this.setState({
			activePhotoIndex: this.state.activePhotoIndex == this.props.photos.length - 1 ?
				0
				: this.state.activePhotoIndex + 1
		});	
	}

	render() {
		const { photos } = this.props;
		const activePhotoSrc = (photos || [])[this.state.activePhotoIndex]
			|| require('./empty-still.png');
		console.log(this.state.activePhotoIndex)
		return (
			<div className="Carousel">
			{
				photos && photos.length > 1 ?
				<Caret
					onClick={this.onPrevPhoto.bind(this)}
					width="14px" height="28px" direction="left" />
				: null
			}
			<PhotoFill width="100%" height="100%"
				src={activePhotoSrc} />
			{
				photos && photos.length > 1 ?
				<Caret
					onClick={this.onNextPhoto.bind(this)}
					width="14px" height="28px" direction="right" />
				: null
			}
			</div>
		);
	}
}

export default Carousel;