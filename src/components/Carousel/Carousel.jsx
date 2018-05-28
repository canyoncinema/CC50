import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';
import PropTypes from 'prop-types';

import Caret from '../Caret/Caret';
import PhotoFill from '../PhotoFill/PhotoFill';

const CarouselPhotoFiller = ({id, itemType, bgPhotoSrc, title}) => {
	const itemTypeUrlEncoded = encodeURIComponent(
			itemType.toLowerCase().replace(' ', '-')
		);
	return (
		<PhotoFill
			className="CarouselPhotoFiller"
			src={bgPhotoSrc}
			width="100%"
			height="100%">
			<div className="foreground">
				<Link to={`/collection/${itemTypeUrlEncoded}/${encodeURIComponent(id)}`}>
					<p>View</p>
					<h4>{title}</h4>
				</Link>
			</div>
		</PhotoFill>
	);
};

CarouselPhotoFiller.propTypes = {
	id: PropTypes.string.isRequired,
	itemType: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	bgPhotoSrc: PropTypes.string.isRequired
};

class Carousel extends Component {
	constructor(props) {
		super(props);

		if (props.photos && props.photos.length > 5) {
			throw new Error('Invalid number of photos. Cannot exceed 5 in carousel. Got ' +
					props.photos.length);
		}

		this.nextPhotoState = this.nextPhotoState.bind(this);
	}

	state = {
		activePhotoIndex: 0,
		showViewMore: false
	}

	onPrevPhoto() {
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
			if (newIndex >= 5) {
				// spec: loop to first (does not show more than 5)
				// and prompt user to click item to show more
				return {
					activePhotoIndex: 4,
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

	onNextPhoto() {
		this.setState(this.nextPhotoState(this.state));
	}

	render() {
		const { id, itemType, photos, title } = this.props;
		const { showViewMore, activePhotoIndex } = this.state;
		const activePhotoSrc = (photos || [])[activePhotoIndex]
			|| require('./empty-still.png');
		console.log(this.state.activePhotoIndex, this.state.showViewMore)
		return (
			<div className="Carousel">
			{
				photos && photos.length > 1 ?
				<Caret
					onClick={this.onPrevPhoto.bind(this)}
					width="14px" height="28px" direction="left" />
				: null
			}
			{
				showViewMore ?
					<CarouselPhotoFiller
						id={id}
						itemType={itemType}
						title={title}
						bgPhotoSrc={activePhotoSrc} />
					: <PhotoFill width="100%" height="100%"
					src={activePhotoSrc} />
			}
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