import React, { Component } from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';

import Caret from '../Caret/Caret';
import CSpacePhotoFill from '../CSpacePhotoFill/CSpacePhotoFill';
import PhotoFill from '../PhotoFill/PhotoFill';
import CarouselShowMoreForeground from './CarouselShowMoreForeground';

export const MAX_CAROUSEL_IMAGES = 3;


const CarouselPhotoFiller = ({id, bgPhotoSrc, title}) => {
	return (
		<PhotoFill
			className="CarouselPhotoFiller"
			src={bgPhotoSrc}
			width="100%"
			height="100%">
			<CarouselShowMoreForeground title={title} />
		</PhotoFill>
	);
};

CarouselPhotoFiller.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	bgPhotoSrc: PropTypes.string.isRequired
};

class Carousel extends Component {
	constructor(props) {
		super(props);

		if (this.numPhotos() > MAX_CAROUSEL_IMAGES) {
			throw new Error(`Invalid number of photos. Cannot exceed ${MAX_CAROUSEL_IMAGES} in carousel.
					Got ${this.numPhotos()}`);
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
				activePhotoIndex: this.numPhotos() - 1,
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

	numPhotos = () => (this.props.blobCsids && this.props.blobCsids.length) ||
		(this.props.photoSrces && this.props.photoSrces.length)

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
			if (newIndex >= (MAX_CAROUSEL_IMAGES - 1) ||
					newIndex >= this.numPhotos()) {
				// spec: loop to first (does not show more than MAX_CAROUSEL_IMAGES)
				// and prompt user to click item to show more
				return {
					activePhotoIndex: this.numPhotos() - 1,
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
		const { id, media, canvasSize, photoSrces, title,
			fromCSpace, blobCsids, e } = this.props;
		const { showViewMore, activePhotoIndex } = this.state;
		if (!blobCsids && !photoSrces) {
			throw new Error('Must include blobCsids or photoSrces');
		}
		let activePhotoSrc;
		if (photoSrces) {
			activePhotoSrc = photoSrces.length ? photoSrces[activePhotoIndex]
			: '/images/empty-still.png';
		}
		return (
			<div className="Carousel">
			{
				(photoSrces && photoSrces.length > 1) ||
				(blobCsids && blobCsids.length > 1) ?
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
				showViewMore && blobCsids ?
				<CSpacePhotoFill
					blobCsid={blobCsids[activePhotoIndex]}
					canvasSize={canvasSize}>
					<CarouselShowMoreForeground title={title} />
				</CSpacePhotoFill>
				: showViewMore ?
				<CarouselPhotoFiller
					id={String(id)}
					title={title}
					bgPhotoSrc={activePhotoSrc} />
				:
				fromCSpace ?
				<CSpacePhotoFill
					blobCsid={blobCsids[activePhotoIndex]}
					canvasSize={canvasSize} />
				:
				<PhotoFill
					width={canvasSize.width + 'px'}
					height={canvasSize.height + 'px'}
					src={activePhotoSrc} />
			}
			</div>
		);
	}
}

export default Carousel;