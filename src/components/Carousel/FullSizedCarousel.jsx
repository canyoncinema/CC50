import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideFullSizedCarousel,
	setFullSizedCarouselPhoto,
	offsetFullSizedCarouselPhoto,
	setFullSizedCarouselItemAspect } from '../../actions/full-sized-carousel-actions';
import './FullSizedCarousel.css';
import { fullSizedCarouselCaption, fullSizedCarouselCaptionLink } from '../../utils/parse-data';

import { CSpaceCanvasSize } from '../CSpacePhoto/CSpacePhoto';
import CSpacePhotoImg from '../CSpacePhotoImg/CSpacePhotoImg';

const mapStateToProps = state => ({
	itemAspects: state.fullSizedCarousel.itemAspects,
	activeIndex: state.fullSizedCarousel.activeIndex
});

const aspectRatio = aspect => aspect.width / aspect.height;

const mapDispatchToProps = dispatch => ({
	setFullSizedCarouselPhoto: (i) =>
		dispatch(setFullSizedCarouselPhoto(i)),
	hideFullSizedCarousel: () =>
		dispatch(hideFullSizedCarousel()),
	setFullSizedCarouselItemAspect: (i, w, h) =>
		dispatch(setFullSizedCarouselItemAspect(i, w, h)),
	offsetFullSizedCarouselPhoto: (...args) =>
		dispatch(offsetFullSizedCarouselPhoto(...args))
});

const BETWEEN_IMAGES_MARGIN_RIGHT = 80; // pixels
const SHRUNK_IMAGE_HEIGHT = 315; // pixels
let MAX_IMAGE_HEIGHT = 600; // pixels
const FULL_SIZED_IMG_HEIGHT_RATIO = 0.8; // ratio of window height

class FullSizedCarousel extends Component {

	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
		this.mediaAspects = []; // width over height values
	}

	state = {
		maxImageHeight: 600
	}

	componentDidMount() {
		document.body.classList.add('fixed');
		this.setState({
			maxImageHeight: Math.max(600, Math.round(window.innerHeight * FULL_SIZED_IMG_HEIGHT_RATIO))
		});
    document.addEventListener('keydown', this.onKeydown, false);
	}

	componentWillUnmount() {
		document.body.classList.remove('fixed');
    document.removeEventListener('keydown', this.onKeydown, false);
	}

  onKeydown = event => {
  	switch (event.key) {
  		case 'Escape':
  			this.props.hideFullSizedCarousel();
  			break;
  		case 'ArrowLeft':
  		case 'ArrowUp':
  			this.props.offsetFullSizedCarouselPhoto(-1, this.props.media.length);
  			break;
  		case 'ArrowRight':
  		case 'ArrowDown':
  			this.props.offsetFullSizedCarouselPhoto(+1, this.props.media.length);
  			break;
  		default:
  			return;
  	}
  }

	onClick = (e) => {
		if (e.target.nodeName !== 'IMG') {
			this.props.hideFullSizedCarousel();
		}
	}

	onLoadImg = (event, mediaIdx) => {
		this.props.setFullSizedCarouselItemAspect(mediaIdx, event.target.naturalWidth, event.target.naturalHeight);
	}

	onImgClick = (i) => {
		this.props.setFullSizedCarouselPhoto(i)
	}

	mediaListOffset = () => {
		const { itemAspects, activeIndex } = this.props;
		const { maxImageHeight } = this.state;
		if (itemAspects.slice(0, activeIndex + 1).filter(x => x).length !== activeIndex + 1) return;
		let i = 0, totalOffset = 0;
		while (i < activeIndex) {
			if (itemAspects[i]) {
				totalOffset += SHRUNK_IMAGE_HEIGHT * aspectRatio(itemAspects[i]);
				totalOffset += BETWEEN_IMAGES_MARGIN_RIGHT;
			}
			i++;
		}
		if (itemAspects[activeIndex]) {
			// image will take maxImageHeight if it is smaller than actual image height
			totalOffset += maxImageHeight < itemAspects[activeIndex].height ?
				maxImageHeight * aspectRatio(itemAspects[activeIndex]) / 2 :
				itemAspects[activeIndex].width / 2;
		}

		return Math.round(totalOffset);
	}

	render() {
		const {
			media,
			activeIndex,
			itemAspects
		} = this.props;
		const { maxImageHeight } = this.state;

		return (
			<div className="FullSizedCarousel list-center-wrapper"
				onClick={this.onClick}>
				<div className="media-list"
					style={{
						left: (-1 * this.mediaListOffset()) + 'px'
					}}>
					{
						media.map((m, i) =>
						<div
							key={i}
							className={i === activeIndex ?
								'main-img-wrapper img-wrapper' :
								'img-wrapper'}
							style={{
								marginLeft: (i === 0 ? window.innerWidth * 0.5 : 0) + 'px'
							}}
							onClick={() => this.onImgClick(i)}>
							<CSpacePhotoImg
								fadedCaption={i !== activeIndex}
								caption={fullSizedCarouselCaption(m)}
								captionLink={fullSizedCarouselCaptionLink(m)}
								onLoad={e => this.onLoadImg(e, i)}
								canvasSize={CSpaceCanvasSize.original}
								blobCsid={m.blobCsid}
								style={{
									maxHeight: maxImageHeight
								}}
							/>
						</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FullSizedCarousel);
