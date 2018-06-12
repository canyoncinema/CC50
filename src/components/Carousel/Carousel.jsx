import React, { Component } from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';

import Caret from '../Caret/Caret';
import PhotoFill from '../PhotoFill/PhotoFill';

const CarouselPhotoFiller = ({id, bgPhotoSrc, title}) => {
	return (
		<PhotoFill
			className="CarouselPhotoFiller"
			src={bgPhotoSrc}
			width="100%"
			height="100%">
			<div className="foreground">
				<p>View</p>
				<h4>{title}</h4>
			</div>
		</PhotoFill>
	);
};

CarouselPhotoFiller.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	bgPhotoSrc: PropTypes.string.isRequired
};

export const MAX_CAROUSEL_IMAGES = 3;

class Carousel extends Component {
	constructor(props) {
		super(props);

		if (props.photos && props.photos.length > MAX_CAROUSEL_IMAGES) {
			throw new Error(`Invalid number of photos. Cannot exceed ${MAX_CAROUSEL_IMAGES} in carousel.
					Got ${props.photos.length}`);
		}

		this.nextPhotoState = this.nextPhotoState.bind(this);
	}

	state = {
		activePhotoIndex: 0,
		showViewMore: false
	}

	onPrevPhoto(e) {
		e.stopPropagation();
		// on clicking left caret when multiple photos exist
		// (loop) go to last photo if on first photo
		if (this.state.activePhotoIndex === 0 &&
				!this.state.showViewMore) {
			this.setState({
				activePhotoIndex: 0,
				showViewMore: true
			});
		} else if (this.state.activePhotoIndex === 0 &&
				this.state.showViewMore) {
			this.setState({
				activePhotoIndex: this.props.photos.length - 1,
				showViewMore: false
			});
		} else {
			const newIndex = this.state.activePhotoIndex - 1;
			this.setState({
				activePhotoIndex: newIndex,
				showViewMore: false
			});
		}
	}

	nextPhotoState(state) {
		// on clicking left caret when multiple photos exist
		// (loop) go to first photo if on last photo
		if (state.showViewMore) {
			return {
				activePhotoIndex: 0,
				showViewMore: false
			};
		} else {
			const newIndex = state.activePhotoIndex + 1;
			if (newIndex >= MAX_CAROUSEL_IMAGES) {
				// spec: loop to first (does not show more than MAX_CAROUSEL_IMAGES)
				// and prompt user to click item to show more
				return {
					activePhotoIndex: MAX_CAROUSEL_IMAGES - 1,
					showViewMore: true
				};
			} else {
				return {
					activePhotoIndex: newIndex,
					showViewMore: false
				};
			}
		}
	}

	onNextPhoto(e) {
		e.stopPropagation();
		this.setState(this.nextPhotoState(this.state));
	}

	render() {
		const { id, photos, title } = this.props;
		const { showViewMore, activePhotoIndex } = this.state;
		const activePhotoSrc = (photos || [])[activePhotoIndex]
			|| require('./empty-still.png');
		return (
			<div className="Carousel">
			{
				photos && photos.length > 1 ?
				<div className="nav">
					<Caret
						onClick={this.onPrevPhoto.bind(this)}
						width="14px" height="28px" direction="left" />
					<Caret
						onClick={this.onNextPhoto.bind(this)}
						width="14px" height="28px" direction="right" />
				</div>
				: null
			}
			{
				showViewMore ?
					<CarouselPhotoFiller
						id={String(id)}
						title={title}
						bgPhotoSrc={activePhotoSrc} />
					: <PhotoFill width="100%" height="100%"
					src={activePhotoSrc} />
			}
			</div>
		);
	}
}

export default Carousel;