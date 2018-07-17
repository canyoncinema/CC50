import React, { Component } from 'react';
import './ThumbnailCarousel.css';
import PhotoFill from '../PhotoFill/PhotoFill';
import Caret from '../Caret/Caret';
import FullSizedCarousel from '../Carousel/FullSizedCarousel';
import { connect } from 'react-redux';
import CSpacePhotoFill from '../CSpacePhotoFill/CSpacePhotoFill';
import { CSpaceCanvasSize } from '../CSpacePhoto/CSpacePhoto';
import { blobCsidToSrc } from '../../utils/parse-data';
import { hideFullSizedCarousel, setFullSizedCarouselPhoto } from '../../actions/full-sized-carousel-actions';

const MEDIA_HEIGHT = 74; // pixels. Fixed by CSS styles.
const PAGE_NUM_MEDIA = 1; // page by this # of media items on arrow press

// document.body.classList.add('fixed')
const mapStateToProps = state => ({
	showFullSizedCarousel: state.fullSizedCarousel.show
})

const mapDispatchToProps = dispatch => ({
	setFullSizedCarouselPhoto: (i) => dispatch(setFullSizedCarouselPhoto(i)),
	hideFullSizedCarousel: () => dispatch(hideFullSizedCarousel())
});

class ThumbnailCarousel extends Component {
	state = {
		page: 0,
		pagedPage: 0 // from hitting the carets
	}

	onMouseEnterPhoto = (page) => {
		this.setState({
			page
		});
	}

	onMouseLeavePhoto = () => {
		this.setState({
			page: this.state.pagedPage
		});	
	}

	onClickPhoto = (i) => {
		console.log('setFullSizedCarouselPhoto', i)
		this.props.setFullSizedCarouselPhoto(i);
	}

	render() {

		const { className, navDirection,
			isCollapsed,
			showFullSizedCarousel } = this.props;
		let { media } = this.props;
		if (!media.length) return null;

		const { page, pagedPage } = this.state;

		// DEV ONLY
		// media = media.concat(media);

		const hasMore = media.length > 4;
		const hasNav = media.length > 1;
		let firstPage = 0, lastPage;

		return (
			<div className={['ThumbnailCarousel d-flex', className].join(' ')}>
				{
					hasNav ?
					<nav key={2}
						className={[
								'carousel',
								hasMore && !isCollapsed ? 'has-more' : null,
								navDirection === 'right' ? 'order-1' : null
							].join(' ')}>
						<div className="nav-photos"
							style={{
								marginTop: -1 * (pagedPage * MEDIA_HEIGHT) + 'px'
							}}>
						{
							media.map((m, i) =>
								<CSpacePhotoFill key={i}
									canvasSize={CSpaceCanvasSize.thumbnail}
									className={page === i ? 'active' : null}
									blobCsid={m.blobCsid}
									onClick={() => this.onClickPhoto(i)}
									onMouseEnter={() => this.onMouseEnterPhoto(i)}
									onMouseLeave={this.onMouseLeavePhoto}
									onClickPhoto={() => this.onClickPhoto(i)}
								/>
							)
						}
						</div>
						{
							hasMore && (lastPage = Math.ceil(media.length / PAGE_NUM_MEDIA) - 1) ?
							<div class="nav-buttons">
								<Caret
									isDisabled={ pagedPage === 0 }
									key={0} direction="up" height="14px"
									onClick={() => pagedPage !== firstPage && this.setState({
										page: page - 1,
										pagedPage: page - 1
									})}
								/>
								<div className="top-fade" />
								<Caret
									isDisabled={ pagedPage >= lastPage }
									key={1} direction="down" height="14px"
									onClick={() => pagedPage < lastPage && this.setState({
										page: page + 1,
										pagedPage: page + 1
									})}
								/>
								<div className="bottom-fade" />
							</div>
							: null
							
						}
					</nav>
					: null
				}
				<PhotoFill
					src={blobCsidToSrc(media[(page * PAGE_NUM_MEDIA)].blobCsid, '360x270')}
					height="254px"
					onClick={() => this.onClickPhoto(page * PAGE_NUM_MEDIA)}
					width="339px" />
				{
					!isCollapsed && showFullSizedCarousel ?
					<FullSizedCarousel
						media={media}
					/>
					: null
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailCarousel);
